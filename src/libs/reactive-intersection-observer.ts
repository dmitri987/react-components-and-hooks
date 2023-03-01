/*
 * Implement 'one IntersectObserver - multiple targets' scheme.
 * Create pool of observers, one observer per one set of init options.
 *
 *   // get observer from the pool
 *   const observer = getIntersectionObserver(options)
 *
 *   // subscribe 'target' to observer with 'options'
 *   // call 'onIntersect' on each intersection
 *   useIntersectionObserver(target, onIntersect, options?)
 *
 * 'options' are minified to the shortest form, so for example:
 *
 *   getIntersectionObserver({ rootMargin: '0px 0%', threshold: [0] })
 *     === getIntersectionObserver({ root: document })
 *     === getIntersectionObserver()
 */

import { RefObject } from "react";

const onIntersectKey = Symbol("__onIntersect");
type WithKey = Element & {
  [onIntersectKey]?: OnIntersectCallback;
};

export type OnIntersectCallback = (
  entry: IntersectionObserverEntry,
  observer: ReactiveIntersectionObserver
) => void;

export interface ReactiveIntersectionObserver {
  readonly root: Element | Document | null;
  readonly rootMargin: string;
  readonly thresholds: ReadonlyArray<number>;

  /* if `target` or `onIntersect` is null, do nothing */
  observe(
    target: Element | RefObject<Element> | null,
    onIntersect: OnIntersectCallback   
  ): void;

  /* if `target` is null, do nothing */
  unobserve(target: Element | RefObject<Element> | null): void;

  disconnect(): void;
}

export type ReactiveIntersectionObserverInit = {
  root?: Element | RefObject<Element> | Document | null;
} & Omit<IntersectionObserverInit, "root">;

function createReactiveIntersectionObserver(
  options?: IntersectionObserverInit
): ReactiveIntersectionObserver {
  let reactiveIntersectionObserver: ReactiveIntersectionObserver;

  const nativeIntersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const _target = entry.target as WithKey;
      _target[onIntersectKey]?.(entry, reactiveIntersectionObserver);
    });
  }, options);

  reactiveIntersectionObserver = {
    root: nativeIntersectionObserver.root,
    rootMargin: nativeIntersectionObserver.rootMargin,
    thresholds: nativeIntersectionObserver.thresholds,

    observe(target, onIntersect) {
      const _target = resolveRef(target);
      if (!_target || !onIntersect) return;

      (_target as WithKey)[onIntersectKey] = onIntersect;
      nativeIntersectionObserver.observe(_target as Element);
    },

    unobserve(target) {
      const _target = resolveRef(target);
      if (!_target) return;

      delete (_target as WithKey)[onIntersectKey];
      nativeIntersectionObserver.unobserve(_target as Element);
    },

    disconnect: nativeIntersectionObserver.disconnect.bind(
      nativeIntersectionObserver
    ),
  };
  return reactiveIntersectionObserver;
}

const defaultIntersectionObserver = createReactiveIntersectionObserver();

/* keep observers in global pool and query them with getIntersectionObserver */
const observers = new Map<string, ReactiveIntersectionObserver>();

/* because of this default observer will be returned for
 * both 'options === undefined' and 'options', which can be
 * simplified to { root: document, rootMargin: '0px', threshold: 0 }
 */
observers.set(hash({}), defaultIntersectionObserver);

/* return existing observer with given options or create new */
export default function getIntersectionObserver(
  options?: ReactiveIntersectionObserverInit
): ReactiveIntersectionObserver {
  if (!options) return defaultIntersectionObserver;

  const _hash = hash(options);
  let reactiveObserver = observers.get(_hash);

  if (!reactiveObserver) {
    reactiveObserver = createReactiveIntersectionObserver({
      ...options,
      root: resolveRef(options.root),
    });
    observers.set(_hash, reactiveObserver);
  }

  return reactiveObserver;
};


function resolveRef(
  ref: Element | RefObject<Element> | Document | null | undefined
) {
  return !ref
    ? null
    : ref instanceof Element || ref instanceof Document
    ? ref
    : ref.current;
}

let idCounter = 1;
const observables = new WeakMap<Element, number>();

function hash(options: ReactiveIntersectionObserverInit): string {
  const root = resolveRef(options.root);
  let id = !root || root instanceof Document ? 1 : observables.get(root);
  if (!id) {
    id = ++idCounter;
    observables.set(root as Element, id);
  }

  const rootMargin = options.rootMargin
    ? sanitizeAndSimplifyRootMargin(options.rootMargin)
    : "0px";

  const threshold = JSON.stringify(simplifyThreshold(options.threshold) ?? 0);

  return id + "::" + rootMargin + "::" + threshold;
}

/* fix syntax errors and bring rootMargin to the shortest form */
function sanitizeAndSimplifyRootMargin(rootMargin?: string) {
  if (!rootMargin) return "0px";

  let m = rootMargin
    .split(/\s+/)
    .map((s) => s.replace(/\.\d+(?=\D+)/, "")) // remove decimal part
    .filter((s) => /^-?\d+(px|%)$/.test(s)) // remove invalid margins
    .map((s) => (/^0+/.test(s) ? "0px" : s)); // '0%' or '00' => '0px'

  if (m.length === 0) return "0px";

  if (
    (m.length === 4 && m[0] === m[2] && m[1] === m[3]) ||
    (m.length === 3 && m[0] === m[2])
  )
    m = [m[0], m[1]];

  if (m.length === 2 && m[0] === m[1]) m = [m[0]];

  return m.join(" ");
}

/* unwrap 'threshold' with single element */
function simplifyThreshold(
  t?: number | number[]
): number | number[] | undefined {
  return !t ? undefined : typeof t === "number" ? t : t.length <= 1 ? t[0] : t;
}
