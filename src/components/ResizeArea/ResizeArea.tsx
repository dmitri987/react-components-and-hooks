/* Wrapper, which allows to resize inner component
 *
 * Usage:
 * set initial width, height and other styles
 * limit axis of resize with 'resize' prop
 *
      <ResizeArea className="w-[400px] h-[300px] ml-96" resize="vertical">
        <AppBarSection />
      </ResizeArea>
 *
 * References:
 *   https://tailwindui.com/components/marketing/sections/heroes
 */

import { ReactNode, useEffect, useRef } from "react";

export type ResizeAreaProps = {
  children: ReactNode;
  className?: string;
  resize?: "horizontal" | "vertical";
};

export default function ResizeArea({
  children,
  className,
  resize,
}: ResizeAreaProps) {
  const resizeObserverRef = useRef<ResizeObserver | null | undefined>(null);
  const resizerRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const PADDING = 8;
    const resizer = resizerRef.current;
    const content = contentRef.current;
    const wrapper = wrapperRef.current;

    const handler = () => {
      if (content && resizer && wrapper) {
        content.style.width = resizer.offsetWidth - PADDING + "px";
        content.style.left = resizer.offsetLeft + PADDING / 2 + "px";
        content.style.height =
          resizer.offsetHeight - Math.max(PADDING, 16) + "px";
        content.style.top = resizer.offsetTop + PADDING / 2 + "px";
        wrapper.style.height = resizer.offsetHeight + "px";
      }
    };

    if (!resizeObserverRef.current && resizer && content && wrapper) {
      const observer = new ResizeObserver(handler);
      resizeObserverRef.current = observer;
      observer.observe(resizer);
      wrapper.style.height = wrapper.offsetHeight + PADDING + "px";

      return () => {
        observer.unobserve(resizer);
        resizeObserverRef.current = null;
      };
    }
  }, []);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <textarea
        className={
          "block border-2 resize min-w-[200px] min-h-[100px] " + className
        }
        ref={resizerRef}
        rows={1}
        style={{ resize }}
      ></textarea>
      <div className="absolute inset-0 overflow-hidden bottom-4" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
