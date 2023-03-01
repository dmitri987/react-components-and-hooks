import { RefObject, useRef, useState } from "react";
import  useResizeObserver  from "../useResizeObserver/useResizeObserver";

export type Sizes = {
  width: number;
  height: number;
};

/* setting 'target' to falsy value will stop resize tracking */
export default function useResize(
  target: Element | RefObject<Element> | false | null | undefined,
  options?: ResizeObserverOptions
): Sizes | null {
  const [sizes, setSizes] = useState<Sizes | null>(null);
  const optionsRef = useRef(options);

  useResizeObserver(
    target,
    (entry) => {
      const box = optionsRef.current?.box;
      const sizesArray =
        !box || box === "border-box"
          ? entry.borderBoxSize
          : box === "content-box"
          ? entry.contentBoxSize
          : entry.devicePixelContentBoxSize;

      const newSizes = sizesArray.reduce(
        (total, segment) => {
          total.width += segment.inlineSize;
          total.height += segment.blockSize;
          return total;
        },
        { width: 0, height: 0 }
      );
      setSizes(newSizes);
    },
    optionsRef.current
  );

  return sizes;
}
