#react #component #progress #snippet 

```tsx
import { CSSProperties, HTMLAttributes } from "react";

type ClassNames = string;
type SlotStyles = ClassNames | (CSSProperties & { className?: ClassNames });

type Props = {
  value?: number;
  barSlot?: SlotStyles;
} & HTMLAttributes<HTMLDivElement>;

const resolveSlotStyles = (slot?: SlotStyles): [ClassNames, CSSProperties] => {
  if (!slot) return ["", {}];
  if (typeof slot === "string") return [slot, {}];
  if ("className" in slot) return [slot.className ?? "", slot];
  return ["", slot];
};

export default function Progress({
  value, // 0..100; if undefined, progress is indeterminate
  className, // goes to root (track) element
  style, // goes to root element
  barSlot, // classnames or styles; goes to 'bar' slot
  children, // label
  ...props
}: Props) {
  const [barClass, barStyle] = resolveSlotStyles(barSlot);

  if (value === undefined)
    return (
      <div
        className={[className, "default-progress-track-indeterminate"].join(
          " "
        )}
        style={style}
        {...props}
      >
        <div
          className={[barClass, "default-progress-bar-indeterminate"].join(" ")}
          style={barStyle}
        ></div>
      </div>
    );

  const _value = Math.min(Math.max(value, 0), 100);
  const hasExternalBar =
    children && !["number", "string"].includes(typeof children);

  return (
    <div
      className={[className, "default-progress-track"].join(" ")}
      style={style}
      {...props}
    >
      <div
        className={[
          barClass,
          hasExternalBar
            ? "default-progress-with-external-bar"
            : "default-progress-bar",
        ].join(" ")}
        style={
          {
            ...barStyle,
            inlineSize: `${_value}%`,
          } as CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
}
```