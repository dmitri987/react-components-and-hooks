import { RefObject, useState } from "react";
import { ReactiveIntersectionObserverInit } from "../../libs/reactive-intersection-observer";
import useIntersectionObserver from "../useIntersectionObserver/useIntersectionObserver";

export default function useIntersection(
  target: Element | RefObject<Element> | false | null | undefined,
  options?: ReactiveIntersectionObserverInit
): IntersectionObserverEntry | null {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  useIntersectionObserver(target, setEntry, options);
  return entry;
}
