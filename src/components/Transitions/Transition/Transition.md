#react #component #transition #framework #snippet #headlessui 

HeadlessUI Transition with some defaults.  Not sure if it's usefull

```tsx
import { Transition } from "@headlessui/react";
import { forwardRef } from "react";

type Props = Parameters<typeof Transition>[0];
type Ref = Props["ref"];

export default forwardRef<Ref, Props>((props, ref) => {
  const {
    enter,
    enterFrom,
    enterTo,
    leave,
    leaveFrom,
    leaveTo,
    ...huiProps
  } = props as Record<string, any>;

  return (
    <Transition
      ref={ref}
      enter={enter}
      enterFrom={enterFrom}
      enterTo={enterTo}
      leave={leave ?? enter}
      leaveFrom={leaveFrom ?? enterTo}
      leaveTo={leaveTo ?? enterFrom}
      {...(huiProps as object)}
    />
  );
});
```