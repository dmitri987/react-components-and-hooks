import {
  createContext,
  ReactNode,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  getIntersectionObserver,
  OnIntersectCallback,
  ReactiveIntersectionObserver,
  ReactiveIntersectionObserverInit,
} from "../../libs/reactive-intersection-observer";

const IntersectionObserverContext =
  createContext<ReactiveIntersectionObserver | null | undefined>(undefined);

export type IntersectionProviderProps = {
  options?: ReactiveIntersectionObserverInit;
  children?: ReactNode;
};

export const IntersectionProvider = ({
  options,
  children,
}: IntersectionProviderProps) => {
  const observer = useIntersectionObserver(options);
  return (
    <IntersectionObserverContext.Provider value={observer}>
      {children}
    </IntersectionObserverContext.Provider>
  );
};

/*
 * Return null for observer, which 'root' is waiting
 * to be resolved from null to Element
 *
 * Priority:
 *   observer based on 'options' argument ->
 *   observer provided by parent <IntersectionProvider> ->
 *   default observer
 */
export function useIntersectionObserver(
  options?: ReactiveIntersectionObserverInit
): ReactiveIntersectionObserver | null {
  const observerContext = useContext(IntersectionObserverContext);
  return useMemo(
    () =>
      !options && observerContext !== undefined
        ? observerContext
        : getIntersectionObserver(options),
    [options]
  );
}

/*
 * const { ref, entry, observer } = useIntersection();
 * const { ref, entry, observer } = useIntersection({
 *   root: rootRef,
 *   rootMargin: '20vh 20vw 100px 50%',
 *   threshold: [0, 0.5, 1],
 *   onIntersect: (entry => console.log(entry)),
 * });
 *    ...
 *  <div ref={ref}>...</div>
 *
 *
 * const targetRef = useRef(null);
 * const { entry, observer } = useIntersection({ target: toObserve && targetRef });
 *    ...
 *  <div ref={targetRef}
 *
 */

export type IntersectionOptions = {
  onIntersect?: OnIntersectCallback;
  target?: Element | RefObject<Element> | false | null;
} & ReactiveIntersectionObserverInit;

export type IntersectionReturnType = {
  ref?: (instance: Element | null) => void;
  entry: IntersectionObserverEntry | null;
  observer: ReactiveIntersectionObserver | null;
};

const observerOptions = (options?: IntersectionOptions) => {
  const { root, rootMargin, threshold } = options ?? {};
  if (root !== undefined || rootMargin !== undefined || threshold !== undefined)
    return {
      root,
      rootMargin,
      threshold,
    };

  return undefined;
};
export function useIntersection(
  options?: IntersectionOptions
): IntersectionReturnType {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [target, setTarget] =
    useState<Element | RefObject<Element> | null>(null);
  const { target: _target, onIntersect } = options ?? {};
  const onIntersectRef = useRef(onIntersect);

  const observer = useIntersectionObserver(observerOptions(options));
  const setRef = useCallback((instance: Element | null) => {
    setTarget(instance);
  }, []);

  useEffect(() => {
    if (_target === undefined) return;

    setTarget(_target || null);
  }, [_target]);

  useEffect(() => {
    if (!observer || !target) return;

    observer.observe(target, (entry) => {
      if (onIntersectRef.current) onIntersectRef.current(entry, observer);
      setEntry(entry);
    });
    return () => observer.unobserve(target);
  }, [target, observer]);

  const result: IntersectionReturnType = { entry, observer };
  if (_target === undefined) result.ref = setRef;

  return result;
}

export type IntersectionProps = {
  options?: IntersectionOptions;
  className?: string;
  children?:
    | ReactNode
    | ((
        entry: IntersectionObserverEntry | null,
        observer: ReactiveIntersectionObserver | null
      ) => ReactNode);
};

export const Intersection = ({
  options,
  className,
  children,
}: IntersectionProps) => {
  const { ref, entry, observer } = useIntersection(options);

  return (
    <div ref={ref} className={className}>
      {children instanceof Function ? children(entry, observer) : children}
    </div>
  );
};
