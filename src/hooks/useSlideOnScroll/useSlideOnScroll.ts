
import {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import usePrevious from "../usePrevious/usePrevious";
import useScroll, {  } from "../useScroll/useScroll";
import useSum from "../useSum/useSum";

type HideOnScrollReturnType = {
  style: {
    translate: string;
  };
  ref: (element: HTMLElement | null) => void;
  actions: {
    // true   reveal,
    // false  hide
    // 0..1   reveal this much; in percents
    // 1..    reveal this much; in px
    show(visibility?: boolean | number): void;
  };
};

export type Position =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "block-start"
  | "block-end"
  | "inline-start"
  | "inline-end";

type Direction = { axis: "x" | "y"; step: 1 | -1 };

const getDirection = (
  position: Position,
  element?: HTMLElement | null
): Direction => {
  if (!element) return { axis: "y", step: 1 };
  if (position === "top") return { axis: "y", step: -1 };
  if (position === "bottom") return { axis: "y", step: 1 };
  if (position === "left") return { axis: "x", step: -1 };
  if (position === "right") return { axis: "x", step: 1 };

  const styles = getComputedStyle(element);
  const horizontal = styles.writingMode.startsWith("horizontal");
  const lr = styles.writingMode.endsWith("lr");
  const ltr = styles.direction === "ltr";
  const block = position.startsWith("block");
  const start = position.endsWith("start");
  if (horizontal && block) return { axis: "y", step: start ? -1 : 1 };
  if (horizontal && !block) return { axis: "x", step: ltr ? -1 : 1 };
  if (!horizontal && block)
    return { axis: "x", step: (start && lr) || (!start && !lr) ? -1 : 1 };
  if (!horizontal && !block) return { axis: "y", step: ltr ? -1 : 1 };

  return { axis: "y", step: -1 };
};

const getElementIntrinsicSize = (
  direction: Direction,
  element?: HTMLElement | null
) => {
  if (!element) return 0;

  const styles = getComputedStyle(element) as { [k: string]: any };
  const prop = direction.axis === "x" ? "width" : "height";

  return +styles[prop].slice(0, -2);
};

const getSizeRange = (
  size: number | null,
  dir: Direction
): [number, number] => {
  if (!size) return [0, 0];
  return [Math.min(dir.step * size, 0), Math.max(dir.step * size, 0)];
};

type Options = {
  minOffset?: number;
  // see useScroll
  container?: RefObject<HTMLElement> | HTMLElement;
  throttle?: number;
};

function useSlideOnScroll(
  position: Position,
  options: Options = {}
): HideOnScrollReturnType {
  const { minOffset = 0, container, throttle = 0 } = options;

  const [element, setElement] = useState<HTMLElement | null>(null);
  const sizeRef = useRef<number>(minOffset);

  const dir = useMemo(
    () => getDirection(position, element),
    [position, element]
  );

  const coords = useScroll({
    container,
    axis: dir.axis,
    throttle,
  });

  const cur = coords[dir.axis];
  const prev = usePrevious(cur);

  const [offset, setOffset] = useSum(
    dir.step * ((cur ?? 0) - (prev ?? 0)),
    { clamp: getSizeRange(sizeRef.current, dir) }
  );

  useEffect(() => {
    sizeRef.current = Math.max(
      getElementIntrinsicSize(getDirection(position, element), element),
      sizeRef.current
    );
  }, [element, position]);

  const style = {
    translate: (dir.axis === "x") ? `${offset}px 0` : `0 ${offset}px`,
  };

  const show = useCallback((v: boolean | number = true) => {
    if (v === true) return setOffset(0);
    if (v === false) return setOffset(dir.step * sizeRef.current);

    const _v = Math.max(v, 0);
    if (_v <= 1) return setOffset(dir.step * sizeRef.current * (1 - _v));
    setOffset(dir.step * Math.max(sizeRef.current - _v, 0));
  }, [dir, setOffset]);

  return { style, ref: setElement, actions: { show } };
}

export default useSlideOnScroll;
