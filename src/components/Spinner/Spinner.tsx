import { CSSProperties, HTMLAttributes } from "react";
import { clss } from "../../utils/utils";

/*
 * Based on MaterialUI CircularProgress (see https://mui.com/material-ui/react-progress/)
 *
 * - Indefinite 
 * When 'value' isn't provided Spinner will indefinitely spin 
 * and shrink stroke at the same time.
 *
 * 'duration' set duration of single animation 
 * 'delay'    set delay before first animation 
 * 'shrink'   if 'false', don't shrink stroke while spinning 
 *
 * - Definite
 * When 'value' is provided don't animate. 
 * 'value' will be clamped to the range from 0 to 100.
 *  
 * - Label 
 * There are several ways to provide label:
 * label: true       show 'value' inside spinner
 *
 * label: string     same, but also apply class names
 *                   from 'label' to the label
 *
 * children          children goes inside spinner 
 *                   Spinner has 'position: relative', so
 *                   children can be layed out with
 *                   'position: absolute'
 *
 * If no 'value', 'label' will be ignored.
 *
 * - Styling: 
 * Style component with 'className' or 'style'. 
 * Things, which can be styled:
 *
 *    style              Tailwind
 *
 *    width              w-8
 *    height             h-8
 *    color              text-red-500
 *    strokeWidth        stroke-2
 *
 *
 * See usage in Spinner.stories.tsx
 *
 */


type SpinnerProps = {
  /* if not provided, will spin indefinitely */
  value?: number;     /* 0..100 */
  /* duration of one spin */
  duration?: number;  /* in seconds */
  /* delay before start of first iteration of animation */
  delay?: number;     /* in seconds */
  /* whether to shrink stroke while spinning */
  shrink?: boolean;
  /* true     show 'value' inside spinner with default styling
   * string   list of classes to apply on the label */
  label?: boolean | string;
} & HTMLAttributes<HTMLSpanElement>;

export default function Spinner({
  value,
  className,
  duration,
  delay,
  shrink = true,
  label,
  children,
  ...props
}: SpinnerProps) {
  const _value = Math.min(Math.max(value ?? 0, 0), 100);

  return (
    <span
      className={clss("spinner-root-z01bqi", className)}
      role="progressbar"
      style={
        {
          "--animation-duration": duration && `${duration}s`,
          "--animation-delay": delay && `${delay}s`,
          animation: value !== undefined && "none",
        } as CSSProperties
      }
      {...props}
    >
      <svg
        viewBox="22 22 44 44"
        style={{
          transform: value !== undefined ? "rotate(-90deg)" : "",
        }}
      >
        <circle
          className="spinner-inner-14891ef"
          cx="44"
          cy="44"
          r="20.2"
          fill="none"
          style={{
            animation: value !== undefined || !shrink ? "none" : "",
            strokeDasharray: value !== undefined ? 126.92 : "",
            strokeDashoffset:
              value !== undefined ? `${1.2692 * (100 - _value)}px` : "",
          }}
        ></circle>
      </svg>
      {typeof value !== undefined && label && (
        <span
          className={typeof label === 'string' ? label : ''}
          style={{
            position: "absolute",
            inset: "0px",
            display: "grid",
            placeContent: "center",
            transform: _value === 100 ? 'translateX(-0.18ch)' : 'translateX(-0.07ch)',
          }}
        >
          {_value}
        </span>
      )}
      {children}
    </span>
  );
}
