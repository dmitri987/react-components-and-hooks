import { Switch } from "@headlessui/react";
import { useState } from "react";
import type { RippleOptions } from "../../hooks/useRipple/useRipple";
import useRipple from "../../hooks/useRipple/useRipple";
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
