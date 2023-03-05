import { useCallback, useRef, useState } from "react";

export type UseSumReturnType = [number, (v: number) => void];

export default function useSum(
  value: number,
  options?: {
    clamp?: [min: number, max?: number];
    enable?: boolean;
  }
): UseSumReturnType {
  const [, triggerRender] = useState(false);
  const sumRef = useRef(0);
  const setSum = useCallback((newValue: number) => {
    sumRef.current = newValue;
    triggerRender((t) => !t);
  }, []);

  const { enable, clamp } = options ?? {};

  if (enable !== false) {
    sumRef.current = !clamp
      ? sumRef.current + value
      : Math.min(
          Math.max(sumRef.current + value, clamp[0] ?? -Infinity),
          clamp[1] ?? +Infinity
        );
  }

  return [sumRef.current, setSum];
}
