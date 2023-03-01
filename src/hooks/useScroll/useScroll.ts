import { RefObject, useEffect, useRef, useState } from "react";
import throttle from "lodash/throttle";

export type ScrollCoordinates = {
  x?: number; // scrollLeft
  y?: number; // scrollTop
  xProgress?: number; // 0..1
  yProgress?: number; // 0..1
};

export type UseScrollProps = {
  /* if undefined, track window scroll (default) */
  container?: RefObject<Element> | Element | null;
  /* limit scroll direction to track; default both */
  axis?: "x" | "y";
  /* track scroll not more often than
   * 'throttle' im miliseconds; default 0 */
  throttle?: number;
};

const resolveElement = (ref?: RefObject<Element> | Element): Element =>
  ref instanceof Element
    ? ref
    : ref && "current" in ref && ref.current instanceof Element
    ? ref.current
    : document.documentElement;

// return empty object initially
function useScroll({
  container,
  axis,
  throttle: throttleInterval = 0,
}: UseScrollProps = {}): ScrollCoordinates {
  const [, trigger] = useState(false);
  const coordsRef = useRef<ScrollCoordinates>();

  useEffect(() => {
    if (!container) return;

    const _container = resolveElement(container);

    // use 'window' for global scroll because 'html' doesn't seem to trigger scroll ??
    const target =
      _container === document.documentElement ? window : _container;

    const listener = () => {
      const x = Math.abs(_container.scrollLeft);
      const y = Math.abs(_container.scrollTop);
      const xTotal = _container.scrollWidth - _container.clientWidth;
      const yTotal = _container.scrollHeight - _container.clientHeight;

      let newCoords;
      if (
        !axis ||
        (axis === "x" && x !== coordsRef.current?.x) ||
        (axis === "y" && y !== coordsRef.current?.y)
      ) {
        newCoords = {
          x,
          y,
          xProgress: xTotal ? x / xTotal : 0,
          yProgress: yTotal ? y / yTotal : 0,
        };

        if (newCoords) {
          trigger((t) => !t);
          coordsRef.current = newCoords;
        }
      }
    };

    const throttledListener = throttle(listener, throttleInterval);
    target.addEventListener("scroll", throttledListener);
    return () => target.removeEventListener("scroll", throttledListener);
  }, [container, axis, throttleInterval]);

  return coordsRef.current ?? {};
}

export default useScroll;

