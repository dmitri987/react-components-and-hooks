#react #hook #useRipple #snippet 



```tsx
import { MouseEventHandler, MutableRefObject, useEffect, useRef } from "react";

/* Usage
 *
 *   useRipple(targetElement)
 *   useRipple(targetElement, { color: 'white', duraton: 500 })
 *
 * When 'targetElement' is falsy, just quit,
 * when not, bind onClick handler to 'targetElement'.
 *
 * Important:
 * 'targetElement' must be positioned (for example, 'position: relative')
 *
 *
 * See original idea: https://codepen.io/BretCameron/pen/mdPMVaW
 *
 */

export type RippleOptions = {
  color?: string;
  duration?: number;
  /* ratio of how much ripple circle should grow */
  maxScale?: number;
  /* 
   * 'cursor'   start ripple expansion from cursor position
   * 'center'   always start from the center of 'targetElement'
   */
  from?: "cursor" | "center";
};

const getCoordinate = (coord: number, min: number, max: number) => {
  return coord < min || coord > max ? (max + min) / 2 : coord;
};

const createRipple = (
  event: MouseEvent,
  targetElement: HTMLElement,
  animationRef: MutableRefObject<Animation | null>,
  options: Required<RippleOptions>
) => {
  if (animationRef.current !== null) {
    animationRef.current.finish();
  }

  const { left, top, width, height } = targetElement.getBoundingClientRect();
  const x =
    options.from === "center"
      ? left + width / 2
      : getCoordinate(event.clientX, left, left + width);
  const y =
    options.from === "center"
      ? top + height / 2
      : getCoordinate(event.clientY, top, top + height);

  const circle = document.createElement("span");
  const diameter = Math.max(
    targetElement.clientWidth,
    targetElement.clientHeight
  );
  const radius = diameter / 2;

  const style = circle.style;
  style.width = circle.style.height = `${diameter}px`;
  style.left = `${x - targetElement.offsetLeft - radius}px`;
  style.top = `${y - targetElement.offsetTop - radius}px`;
  style.position = "absolute";
  style.borderRadius = "50%";
  style.backgroundColor = options.color;

  targetElement.append(circle);
  animationRef.current = circle.animate(
    [
      { transform: "scale(0)" },
      { transform: `scale(${options.maxScale})`, opacity: 0 },
    ],
    options.duration
  );

  animationRef.current.finished.then(() => {
    circle.remove();
    animationRef.current = null;
  });
};

export default function useRipple(
  targetElement?: HTMLElement | false | null,
  options?: RippleOptions | boolean | null
): void {
  const animationRef = useRef<Animation | null>(null);

  useEffect(() => {
    if (!targetElement) return;

    const _options = {
      color: "rgba(255, 255, 255, 0.4)",
      duration: 500,
      maxScale: 4,
      from: "cursor" as const,
      ...(typeof options === "object" ? options : {}),
    };

    const onClick = (event: MouseEvent) => {
      createRipple(event, targetElement, animationRef, _options);
    };
    targetElement.addEventListener("click", onClick);
    return () => targetElement.removeEventListener("click", onClick);
  }, [targetElement, options]);
}
```