#react #component #transition #fade #headlessui #tailwind #snippet 

Possible implementation with HeadlessUI Transition
```tsx
import { Transition } from "@headlessui/react";
import { ReactNode } from "react";

type FadeProps = {
  show: boolean;
  enter?: string;
  leave?: string;
  children: ReactNode;
  className?: string;
};
export default function Fade({
  show,
  enter,
  leave,
  children,
  className,
}: FadeProps) {
  return (
    <Transition
      as="div"
      show={show}
      className={className}
      enter={enter ?? "transition duration-200"}
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave={leave ?? "transition duration-200"}
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  );
}
```