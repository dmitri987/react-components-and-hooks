#react #hook #useSum #snippet 

```ts
import { useCallback, useRef, useState } from "react";

export type UseSumReturnType = [number, (v: number) => void];

export default function useSum(
  value: number,
  clamp?: [min: number, max: number]
): UseSumReturnType {
  const [, triggerRender] = useState(false);

  const sumRef = useRef(0);
  sumRef.current = !clamp
    ? sumRef.current + value
    : Math.min(
        Math.max(sumRef.current + value, clamp[0] ?? -Infinity),
        clamp[1] ?? +Infinity
      );

  const setSum = useCallback((newValue: number) => {
    sumRef.current = newValue;
    triggerRender((t) => !t);
  }, []);

  return [sumRef.current, setSum];
}
```