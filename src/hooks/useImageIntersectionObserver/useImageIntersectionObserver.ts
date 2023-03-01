import {RefObject, useCallback, useEffect, useRef, useState} from "react";
import {OnIntersectCallback, ReactiveIntersectionObserver} from "../../libs/reactive-intersection-observer";
import useIntersectionObserver from "../useIntersectionObserver/useIntersectionObserver";


export type ImageIntersectionObserverOptions = {
  onIntersect?: OnIntersectCallback;
} & IntersectionObserverInit;

function resolveTarget(
  ref: HTMLImageElement | RefObject<HTMLImageElement> | false | null | undefined
): HTMLImageElement | null {
  return !ref
    ? null
    : ref instanceof Element
    ? ref
    : ref.current instanceof Element
    ? ref.current
    : null;
}

export default function useImageIntersectionObserver(
  target: HTMLImageElement | RefObject<HTMLImageElement> | false | null,
  options?: ImageIntersectionObserverOptions
): void {
  const optionsRef = useRef(options);
  const srcRef = useRef<string|null>(null);
  const srcSetRef = useRef<string|null>(null);

  useEffect(() => {
    const _target = resolveTarget(target);
    if (!_target) return;

    srcRef.current = _target.getAttribute('src');
    srcSetRef.current = _target.getAttribute('srcset');
    _target.setAttribute('src', '');
    _target.setAttribute('srcset', '');
  }, [target])

  const defaultOnIntersect = useCallback(
    (
      entry: IntersectionObserverEntry,
      observer: ReactiveIntersectionObserver
    ) => {
      if (entry.isIntersecting) {
        const imgElement = entry.target as HTMLImageElement;
        imgElement.setAttribute('src', srcRef.current ?? '');
        imgElement.setAttribute('srcset', srcSetRef.current ?? '');
        observer.unobserve(imgElement);
      }
      optionsRef.current?.onIntersect?.(entry, observer);
    },
    []
  );

  useIntersectionObserver(target, defaultOnIntersect, options)
}
