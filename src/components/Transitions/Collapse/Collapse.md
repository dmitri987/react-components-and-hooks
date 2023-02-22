#react #component #framework #headlessui #tailwind #snippet #collapse #transition 

```tsx
import { CSSProperties, useEffect, useRef, useState } from "react";
import useResizeObserver from "use-resize-observer";

/*
 * Collapse component
 *
 * --- Usage
 *  const [open, setOpen] = useState(false);
 *
 *  <Collapse open={open} className="duration-300">
 *    <div> // content
 *
 * --- Features
 *
 * In block direction change respective size (height/width),
 * which will change page layout.
 *
 * - 'inline' prop
 * In inline direction just hide the content, but keep
 * alotted space for it.
 *
 *
 * - RTL and vertical
 * Automatically recognize RTL/LTR direction and
 * 'writing-mode: vertical-lr/rl'.
 * Collapse always in 'start' of current direction.
 *
 * - Style with Tailwind classes
 * Additional style transitions can be added with 'ui-open:' modifier:
 *
 *   <Collapse open={open} className="opacity-0 ui-open:opacity-100">
 *
 * See https://github.com/tailwindlabs/headlessui/tree/main/packages/%40headlessui-tailwindcss
 *
 */

type Props = {
  open: boolean;
  className?: string;
  /* collapse in inline direction */
  inline?: boolean;
  children: React.ReactNode;
};

const computedStyle = (element: HTMLElement | null, field: string) =>
  element ? (getComputedStyle(element) as Record<string, any>)[field] : "";

const getStyle = (
  element: HTMLElement | null,
  open: boolean,
  collapseDirection: string,
  size?: number
) => {
  if (!element) return {};

  const ltr = computedStyle(element, "direction") !== "rtl";
  const writingMode = computedStyle(element, "writing-mode");
  const isHorizontalWritingMode = !writingMode.startsWith("vertical");

  const style: CSSProperties = {
    overflow: "hidden",
    transitionProperty: "all",
    transitionTimingFunction: "linear",
  } as CSSProperties;

  if (collapseDirection === "block") {
    if (isHorizontalWritingMode) {
      style.height = open ? size + "px" : "0px";
    } else {
      style.width = open ? size + "px" : "0px";
    }
  } else {
    if (isHorizontalWritingMode) {
      style.clipPath = open
        ? "inset(0)"
        : ltr
        ? "inset(0 100% 0 0)"
        : "inset(0 0 0 100%)";
    } else {
      style.clipPath = open ? "inset(0)" : "inset(0 0 100% 0)";
    }
  }
  return style;
};

export default function Collapse({ open, className, inline, children }: Props) {
  const initialRef = useRef(true);
  const [wrapperElement, setWrapperElement] =
    useState<HTMLDivElement | null>(null);

  const { ref: contentRef, height } = useResizeObserver<HTMLDivElement>();

  useEffect(() => {
    if (!wrapperElement) return;

    wrapperElement.style.display = "";
    wrapperElement.toggleAttribute("hidden", false);
  }, [open]);

  useEffect(function hideAfterCollapse() {
    if (!wrapperElement) return;

    // hide on initial appearance
    if (initialRef.current && !open) {
      wrapperElement.style.display = "none";
      wrapperElement.toggleAttribute("hidden", true);
      initialRef.current = false;
    }

    const hide = () => {
      const isOpen = wrapperElement.matches("[data-headlessui-state~=open]");
      if (!isOpen) {
        wrapperElement.style.display = "none";
        wrapperElement.toggleAttribute("hidden", true);
      }
    };
    wrapperElement.addEventListener("transitionend", hide);
    return () => {
      wrapperElement.removeEventListener("transitionend", hide);
    };
  }, [wrapperElement]);

  if (!children) return null;

  const style = getStyle(
    wrapperElement,
    open,
    inline ? "inline" : "block",
    height
  );

  return (
    <div
      className={className}
      style={style}
      ref={setWrapperElement}
      data-headlessui-state={open ? "open" : ""}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
```