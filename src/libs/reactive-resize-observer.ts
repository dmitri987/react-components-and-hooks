/* Use single modified ResizeObserver to observe multiple targets.
 *
 *
 *     import { globalResizeObserver } from './useResizeObserver';
 *          ...
 *     globalResizeObserver.observe(target, (entry, observer) => {...})
 *     globalResizeObserver.unobserve(target);
 *     globalResizeObserver.disconnect();
 *
 */

import { RefObject } from "react";

const onResizeKey = Symbol("onResize");
type TargetWithResizeKey = Element & { [onResizeKey]?: OnResizeCallback };

export type OnResizeCallback = (
  entry: ResizeObserverEntry,
  observer?: ReactiveResizeObserver
) => void;

export interface ReactiveResizeObserver {
  observe(
    target: Element | RefObject<Element> | null,
    onResize: OnResizeCallback,
    options?: ResizeObserverOptions
  ): void;

  unobserve(target: Element | RefObject<Element> | null): void;

  disconnect(): void;
}

/* single global observer for all targets */
let reactiveResizeObserver: ReactiveResizeObserver;

const nativeResizeObserver = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const _target = entry.target as TargetWithResizeKey;
    _target[onResizeKey]?.(entry, reactiveResizeObserver);
  });
});

reactiveResizeObserver = {
  observe(target, onResize, options) {
    const _target = resolveTarget(target);
    if (!_target || !onResize) return;

    _target[onResizeKey] = onResize;
    nativeResizeObserver.observe(_target, options);
  },

  unobserve(target) {
    const _target = resolveTarget(target);
    if (!_target) return;

    delete _target[onResizeKey];
    nativeResizeObserver.unobserve(_target);
  },

  disconnect: nativeResizeObserver.disconnect.bind(nativeResizeObserver),
};
Object.freeze(reactiveResizeObserver);

export default reactiveResizeObserver;


function resolveTarget(
  ref: Element | RefObject<Element> | null
): TargetWithResizeKey | null {
  return !ref
    ? null
    : ref instanceof Element
    ? ref
    : ref.current instanceof Element
    ? ref.current
    : null;
}

