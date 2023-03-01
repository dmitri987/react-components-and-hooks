/* Change 'sizes' attribute of 'target' on resize.
 * 'sizes' has following form: '{actual_size}px'
 *
 * # Props
 * 'target'    element or ref to an image, which resize to be observed
 *             if null, stop observing
 *
 * 'srcSet'    'srcset' attribute of 'target' with multiple 'w' sources
 *             if null, undefined or less than 2 valid sources, don't observe
 *
 * 'options'
 *   'breakpointsAttrName'  if provided, duplicate breakpoints to 'target'
 *                          data attribute: 'data-{breakpointsAttrName}'
 *
 *   'onResizeToggle'       called on start/stop of observing
 *
 *   'onResize'             called on each resize (even if 'sizes' attribute
 *                          is not changed)
 *
 *
 * # Rules
 * Once started observing size can only grow, not shrink.
 * Size is changed only when crossing next upper breakpoint.
 * When highest breakpoint is reached, stop observing.
 *
 * Observing is restarted when 'target' or 'srcSet' is changed.
 * Observing isn't started if there are less than 2 breakpoints.
 *
 * # Breakpoints
 * Parse 'srcSet' with 'w' sources to array of sorted breakpoints:
 *
 *   '{url1} 640w, {url2} 480w, {url3} 1024w' => [480, 640, 1024]
 *
 * 'x' or invalid sources are ignored:
 *
 *   '{url1} 1.5x, {url2} 2x 640w, {url3} 800w' => [800]
 *
 * see https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/srcset
 */

import { RefObject, useEffect, useRef } from "react";
import globalResizeObserver, {
  OnResizeCallback,
} from "../../libs/reactive-resize-observer";

export type ImageResizeObserverOptions = {
  /* duplicate srcSet breakpoints to 'data-{breakpointsAttrName}': '[240, 360, 480]' */
  breakpointsAttrName?: string;
  /* callback, which triggers when resize tracking starts/stops */
  onResizeToggle?(isObserving: boolean): void;
  /* callback on each resize */
  onResize?: OnResizeCallback;
};

export default function useImageResizeObserver(
  target: HTMLImageElement | RefObject<HTMLImageElement> | null,
  srcSet?: string,
  options?: ImageResizeObserverOptions
) {
  const prevTargetRef = useRef<HTMLImageElement | null>(null);
  const optionsRef = useRef<ImageResizeObserverOptions | undefined>(options);

  useEffect(
    function observeResize() {
      const imgElement = resolveTarget(target);
      if (imgElement !== prevTargetRef.current) {
        globalResizeObserver.unobserve(prevTargetRef.current);
        prevTargetRef.current = imgElement;
      }

      if (!imgElement || !srcSet) return;

      const newWidth = getCurrentWidth(imgElement);
      if (newWidth > 0) imgElement.sizes = newWidth + "px";

      const {
        breakpointsAttrName,
        onResizeToggle,
        onResize: onResizeCallback,
      } = optionsRef.current ?? {};

      const breakpoints = parseBreakpoints(srcSet);
      if (breakpointsAttrName) {
        imgElement.setAttribute(
          "data-" + breakpointsAttrName,
          "[" + breakpoints.join(", ") + "]"
        );
      }

      if (breakpoints.length < 2) return;

      const onResize = (entry: ResizeObserverEntry) => {
        onResizeCallback?.(entry);
        updateSizes(imgElement, breakpoints, onResizeToggle);
      };

      updateSizes(imgElement, breakpoints, onResizeToggle);
      globalResizeObserver.observe(imgElement, onResize);
      onResizeToggle?.(true);
    },
    [target, srcSet]
  );
}

function resolveTarget(
  ref: HTMLImageElement | RefObject<HTMLImageElement> | null
): HTMLImageElement | null {
  return !ref
    ? null
    : ref instanceof Element
    ? ref
    : ref.current instanceof Element
    ? ref.current
    : null;
}

function getCurrentWidth(el: HTMLImageElement): number {
  return el.getBoundingClientRect().width;
}
function parseBreakpoints(srcSet: string) {
  const breakpoints = srcSet
    .split(",")
    .map((src) => src.trim())
    .map((src) => src.match(/(?<=^\S+\s+)\d+(?=w$)/)?.[0])
    .filter(Boolean)
    .map(Number);

  breakpoints.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
  return breakpoints;
}

function updateSizes(
  imgElement: HTMLImageElement,
  breakpoints: number[],
  onResizeToggle?: (isObserving: boolean) => void
) {
  const prevWidth = imgElement.sizes ? +imgElement.sizes.slice(0, -2) : 0;
  const newWidth = getCurrentWidth(imgElement);
  if (prevWidth && newWidth <= prevWidth) return;

  for (const breakpoint of breakpoints) {
    if (!prevWidth || (newWidth > breakpoint && prevWidth <= breakpoint)) {
      imgElement.sizes = newWidth + "px";
      break;
    }
  }

  if (newWidth > breakpoints[breakpoints.length - 2]) {
    globalResizeObserver.unobserve(imgElement);
    onResizeToggle?.(false);
    return;
  }
}
