#react #component #spinner #snippet 


```css
.spinner-root-z01bqi {
  position: relative;
  display: inline-block;
  width: 2rem;
  height: 2rem;
  color: rgb(25, 118, 210);
  animation: var(--animation-duration, 1.4s) linear var(--animation-delay, 0s)
    infinite normal none running spin;

  /* to be passed down to svg */
  stroke-width: 3.6;
}

.spinner-inner-14891ef {
  stroke: currentcolor;
  stroke-dasharray: 80px, 200px;
  stroke-dashoffset: 0;
  animation: var(--animation-duration, 1.4s) ease-in-out
    var(--animation-delay, 0s) infinite normal none running shrink-stroke;
  transition: stroke-dashoffset 0.2s;
}

@keyframes shrink-stroke {
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
}
```

```tsx
import { CSSProperties, HTMLAttributes } from "react";
import { clss } from "../../utils/utils";

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
      {value !== undefined && label && (
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

```

