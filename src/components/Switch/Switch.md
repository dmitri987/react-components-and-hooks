#switch #react #component #headlessui #tailwind #snippet #ts #js

```css
// ./Switch.css

/* defaults overridable with Tailwind utility classes */
.track-ctwgsjd {
  border-radius: 100vmax;
  border-width: 2px;
  border-color: transparent;
  transition-duration: var(--switch-transition-duration, 200ms);
  background-color: var(--switch-track-color, #888);
}

.track-ctwgsjd[data-headlessui-state="checked"] {
  background-color: var(--switch-track-color-checked, #2b8a91);
}

/* not overridable (extra class in selector for elevated specificity) */
.switch.track-ctwgsjd {
  --inline-size: var(--w, var(--switch-width, 3rem));
  --block-size: var(--h, var(--switch-height, 1.7rem));

  display: flex;
  position: relative;
  justify-items: start;
  align-items: center;
  flex-shrink: 0;
  width: var(--inline-size);
  height: var(--block-size);
  padding: 0;
  /* overflow: hidden; */
  cursor: pointer;
}

.vertical.switch.track-ctwgsjd {
  flex-direction: column-reverse;
  height: var(--inline-size);
  width: var(--block-size);
}

/* defaults overridable with Tailwind utility classes */
.thumb-lsujhhbw {
  border-radius: 100%;
  pointer-events: none;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  transition-duration: inherit;
  background-color: var(--thumb, var(--switch-thumb-color, white));
}

:where([data-headlessui-state~="checked"]) .thumb-lsujhhbw {
  background-color: var(
    --switch-thumb-color-checked,
    var(--switch-thumb-color, white)
  );
  transform: translateX(calc(var(--inline-size) - var(--block-size)));
}

:where([dir="rtl"] [data-headlessui-state~="checked"]) .thumb-lsujhhbw {
  transform: translateX(calc(-1 * (var(--inline-size) - var(--block-size))));
}

/* not overridable (extra class in selector for elevated specificity) */
.switch.thumb-lsujhhbw {
  display: inline-block;
  height: 100%;
  width: auto;
  aspect-ratio: 1;
  /* justify-self: start; */
  /* align-self: center; */
}

.vertical.track-ctwgsjd .thumb-lsujhhbw {
  width: 100%;
  height: auto;
}

:where([data-headlessui-state~="checked"]).vertical.track-ctwgsjd
  .thumb-lsujhhbw {
  transform: translateY(calc(-1 * (var(--inline-size) - var(--block-size))));
}
```

[[../../hooks/useRipple/useRipple]]

```tsx
import { Switch } from "@headlessui/react";
import { useState } from "react";
import type { RippleOptions } from "../../hooks/useRipple";
import useRipple from "../../hooks/useRipple";
import "./Switch.css";

const clss = (...classes: (string | string[] | false | undefined)[]) =>
  classes.flat().filter(Boolean).join(" ").trim();

type Props = {
  /* pass this to the root element */
  className?: string;

  /* Pass this to 'className' of the thumb */
  thumbClass?: string;

  /* In vertical mode switch 'height' and 'width'.
   * Also in inactive state thumb is always down
   * no matter RTL direction
   */
  vertical?: boolean;

  /* RippleOptions: {
   *   color?: string;
   *   duration?: number;
   *   maxScale?: number;
   *   from?: 'cursor' | 'center';
   * }
   * If true, use default settings.
   * If false, no ripple effect.
   *
   * Tip: set 'overflow-hidden' on Switch to limit
   * ripple circle by the switch bounds
   */
  ripple?: boolean | RippleOptions;
} & Parameters<typeof Switch>[0];

/* Usage:
 *
 * --- Styling
 * There are two ways to style it:
 * - CSS variables (theme)
 * - utility classes (Tailwind)
 *
 * Important:
 * To style 'checked' state you need to use @headlesui/tailwindcss plugin.
 * It adds modifiers like 'ui-checked' or 'ui-not-open'.
 * See https://github.com/tailwindlabs/headlessui/tree/main/packages/%40headlessui-tailwindcss
 *
 * Also you can not use 'w' and 'h' Tailwind shortcuts (like 'w-4', 'h-1/2').
 * Use special CSS variables '--w' and '--h', instead (see table below).
 * Use them in 'className' prop.
 *
 * | CSS variable (use in theme)    | Tailwind shortcut (use in `className`)    | Default Value |
 * |--------------------------------|-------------------------------------------|---------------|
 * | `--switch-width`               | `[--w:3rem]`                              | `3rem`        |
 * | `--switch-height`              | `[--h:2rem]`                              | `1.7rem`      |
 * | `--switch-transition-duration` | `duration-300`                            | `200ms`       |
 * | `--switch-track-color`         | `bg-gray-200` (in `className`)            | `#aaa`        |
 * | `--switch-track-color-checked` | `ui-checked:bg-red-600` (in `className`)  | `#2b8a91`     |
 * | `--switch-thumb-color`         | `bg-gray-200` (in `thumbClass`)           | `white`       |
 * | `--switch-thumb-color-checked` | `ui-checked:bg-red-600` (in `thumbClass`) | `white`       |
 *
 * --- Vertical prop
 *
 * 'vertical' prop will swap 'height' and 'width', transition direction will become vertical.
 * Active state is always on top.
 *
 * --- RTL
 * When `dir="rtl"`, active state is on the left (by default on the right).
 *
 * --- State
 * See HeadlessUI Switch component API here: https://headlessui.com/react/switch#switch
 */

export default function MySwitch(
  { vertical, className, thumbClass, ripple, ...huiProps }: Props = {} as Props
) {
  const [rippleTarget, setRippleTarget] =
    useState<HTMLSpanElement | null>(null);

  const rippleOptions = {
    from: 'center' as const,
    ...(typeof ripple === 'object' ? ripple : {})
  }

  useRipple(!!ripple && rippleTarget, rippleOptions);

  return (
    <Switch
      ref={setRippleTarget}
      className={clss(
        "switch track-ctwgsjd",
        vertical && "vertical",
        className
      )}
      {...huiProps}
    >
      <span className={clss("switch thumb-lsujhhbw", thumbClass)} />
    </Switch>
  );
}
```