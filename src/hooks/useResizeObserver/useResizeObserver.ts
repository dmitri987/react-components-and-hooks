/* Use single modified ResizeObserver to observe multiple targets.
 *
 *     import useResizeObserver from './useResizeObserver';
 *
 *     useResizeObserver(target, onResize, options?)
 *
 *     // onResize and options don't change after initialization
 *     useResizeObserver(
 *       elementOrRef, 
 *       (entry, observer) => {}, 
 *       { box: 'border-box' }
 *     )
 *
 *     // any 'falsy' target will unobserve previous target
 *     useResizeObserver(false && target, () => {})
 */

import { RefObject, useEffect, useRef } from "react";

import reactiveResizeObserver, {OnResizeCallback} from "../../libs/reactive-resize-observer";

export default function useResizeObserver(
  target: Element | RefObject<Element> | false | null | undefined,
  onResize: OnResizeCallback,
  options?: ResizeObserverOptions
): void {
  const onResizeRef = useRef(onResize);
  const optionsRef = useRef(options);

  useEffect(() => {
    reactiveResizeObserver.observe(
      target || null,
      onResizeRef.current,
      optionsRef.current
    );
    return () => reactiveResizeObserver.unobserve(target || null);
  }, [target]);
}
