#input #react #component #headlessui 

```tsx
import {
  ChangeEvent,
  createElement,
  FocusEvent,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
// import useMask, { Mask, OnInvalidMask } from "../hooks/useMask";

export type InputProps = {
  as?: "input" | "textarea";
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  debounce?: number;
  // mask?: Mask;
  // onInvalidMask?: OnInvalidMask;
} & Omit<
  InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
  "onChange"
>;

/*
 * Usage:
 *
 * - `debounce`
 * Debounce update of external state by 'debounce' ms
 * Update immediately on 'blur' event (when input looses focus)
 *
 * - Ref
 * Can forward ref to <input> element underneath
 * Pass all attributes to <input> element
 *
 * - onChange
 * onChange has HeadlessUI signature:
 * 'onChange(value: any) => void', not 'onChange(e: Event) => void'
 *
 *
 *
 *
 */

// TODO: rethink onInvalidMask arguments
function Input(
  {
    as,
    defaultValue,
    value,
    onChange,
    onBlur,
    debounce,
    className,
    // mask,
    // onInvalidMask,
    ...attributes
  }: InputProps,
  externalRef: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>
) {
  const [element, setElement] =
    useState<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const debounceId = useRef<NodeJS.Timeout>();

  const onChangeHandle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!onChange) return;

      clearTimeout(debounceId.current);
      debounceId.current = setTimeout(() => {
        onChange(e.target.value);
      }, debounce ?? 0);
    },
    [debounce, onChange]
  );

  const onBlurHandle = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      clearTimeout(debounceId.current);
      if (onChange) onChange(e.target.value);
      if (onBlur) onBlur(e);
    },
    [onBlur]
  );

  const bindRef = useCallback(
    (instance: HTMLInputElement) => {
      setElement(instance);
      if (!externalRef) return;

      if (externalRef instanceof Function) externalRef(element);
      else externalRef.current = element;
    },
    [externalRef, element]
  );

  useEffect(() => {
    if (value !== undefined && element) element.value = value;
  }, [value, element]);

  // useMask(mask, inputElement, onInvalidMask);

  return createElement(as ?? "input", {
    ref: bindRef,
    defaultValue,
    onChange: onChangeHandle,
    onBlur: onBlurHandle,
    className,
    ...attributes,
  });
}

export default forwardRef(Input);
```