#react #hook #usePrevious

```ts
import { useRef } from "react";

export default function usePrevious(value: any) {
  const prevRef = useRef(value);
  const prev = prevRef.current;
  if (value !== prev) prevRef.current = value;
  return prev ?? value;
}
```