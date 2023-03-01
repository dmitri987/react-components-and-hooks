/* Example:
 *
 *   useIntersectionObserver(
 *     toObserve && target,
 *     (entry) => {...},
 *     { root: containerRef }
 *   )
 */
import { RefObject, useEffect, useRef, useState } from "react";
import getIntersectionObserver, {
  OnIntersectCallback,
  ReactiveIntersectionObserver,
  ReactiveIntersectionObserverInit,
} from "../../libs/reactive-intersection-observer";

export default function useIntersectionObserver(
  target: Element | RefObject<Element> | false | null | undefined,
  onIntersect?: OnIntersectCallback,
  options?: ReactiveIntersectionObserverInit
): void {
  const optionsRef =
    useRef<ReactiveIntersectionObserverInit | null | undefined>(null);
  const onIntersectRef = useRef(onIntersect);
  const [observer, setObserver] =
    useState<ReactiveIntersectionObserver | null>(null);

  useEffect(() => {
    if (optionsRef.current !== null) return;

    if (
      !options ||
      !Object.keys(options).includes("root") ||
      options.root instanceof Element ||
      options.root instanceof Document ||
      (options.root as RefObject<Element>)?.current instanceof Element
    )
      optionsRef.current = options;
    setObserver(getIntersectionObserver(options));
  }, [options]);

  useEffect(() => {
    if (!target || !onIntersectRef.current || !observer) return;

    observer.observe(target || null, onIntersectRef.current);
    return () => observer.unobserve(target || null);
  }, [target, observer]);
}
