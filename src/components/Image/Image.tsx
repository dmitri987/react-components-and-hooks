/*
 * <Image
 *   lazy                            // native lazy loading
 *   loading="lazy"                  // native lazy loading
 *   lazy && loading="eager"         // native lazy loading
 *   lazy={false} && loading="lazy"  // native lazy loading
 *
 *   lazy={{                         // lazy loading based
 *     root: containerRef,           // on IntersectionObserver
 *     rootMargin: '200px 0px',
 *     threshold: [0, 0.5, 1]
 *   }}
 *
 *   // when 'srcSet' is present, automatically track
 *   // resize with ResizeObserver
 *   srcSet="{url1} 640w, {url2} 1024w"
 *
 *   // debug resize with 'resizeOptions'
 *   // see 'useImageResizeObserver.ts'
 *   resizeOptions={{ ... }}
 */

import {
  ForwardedRef,
  forwardRef,
  ImgHTMLAttributes,
  useEffect,
  useMemo,
  useState,
} from "react";
import useImageResizeObserver, {
  ImageResizeObserverOptions,
} from "../../hooks/useImageResizeObserver/useImageResizeObserver";
import useImageIntersectionObserver, {
  ImageIntersectionObserverOptions,
} from "../../hooks/useImageIntersectionObserver/useImageIntersectionObserver";

type ImageProps = {
  lazy?: boolean | ImageIntersectionObserverOptions;

  resizeOptions?: ImageResizeObserverOptions;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "sizes">;

function Image(
  { lazy, loading, src, srcSet, resizeOptions, ...props }: ImageProps,
  ref: ForwardedRef<HTMLImageElement>
) {
  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);

  useEffect(
    function forwardRef() {
      if (!imgElement || !ref) return;

      if (ref instanceof Function) ref(imgElement);
      else ref.current = imgElement;
    },
    [imgElement]
  );

  const isIntersectionOptions = useMemo(() => {
    return isIntersectionObserverOptions(lazy);
  }, [lazy]);

  useImageIntersectionObserver(
    isIntersectionOptions && imgElement,
    lazy as ImageIntersectionObserverOptions
  );

  useImageResizeObserver(imgElement, srcSet, resizeOptions);

  return (
    <img
      ref={setImgElement}
      src={src}
      srcSet={srcSet}
      loading={lazy === true ? "lazy" : loading}
      {...props}
    />
  );
}

export default forwardRef(Image);

function isIntersectionObserverOptions(
  obj: any
): obj is IntersectionObserverInit {
  return typeof obj === "object";
}
