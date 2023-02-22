#react #hook #useMask #snippet #input #mask

```ts
import { useEffect } from "react";

export type Mask = (value: string) => string;

/* message == '' means no errors */
export type OnInvalidMask = (
  message: string | "",
  key: string,
  input?: HTMLInputElement
) => void;

const addCharacterToMaskedInput = (
  input: HTMLInputElement,
  key: string,
  mask: Mask,
  onInvalid?: OnInvalidMask
) => {
  const left = input.value.slice(0, input.selectionStart ?? 0) + key;
  const right = input.value.slice(input.selectionEnd ?? 0);
  const masked = mask(left + right);
  if (masked.length === input.value.length) {
    return onInvalid?.(
      `'${key}' doesn't match the mask or the mask is fully formed`,
      key,
      input
    );
  }

  input.value = masked;
  input.selectionStart = mask(left).length;
  input.selectionEnd = input.selectionStart;
  onInvalid?.("", key, input);
};

const deleteCharactersFromMaskedInput = (
  input: HTMLInputElement,
  key: string,
  mask: Mask,
  onInvalid?: OnInvalidMask
) => {
  // position BEFORE deletion
  let start = input.selectionStart ?? 0;
  let end = input.selectionEnd ?? 0;
  if (start === end) {
    if (key === "Backspace") start--;
    else end++;
  }
  const left = () => input.value.slice(0, start);
  const right = () => input.value.slice(end);
  let masked = mask(left() + right());
  while (
    masked.length >= input.value.length &&
    start > 0 &&
    end <= input.value.length
  ) {
    if (key === "Backspace") start--;
    else end++;
    masked = mask(left() + right());
  }
  input.value = masked;
  input.selectionStart = mask(left()).length;
  input.selectionEnd = input.selectionStart;
  onInvalid?.("", key, input);
};

export default function useMask(
  mask?: Mask,
  input?: HTMLInputElement | null,
  onInvalid?: OnInvalidMask
) {
  useEffect(() => {
    if (!input || !mask) return;

    // do custom management of insert/delete in 'keydown' (not 'change')
    // because of the cursor jumps when inserting text programmatically
    const onKeyDownHandle = (e: KeyboardEvent) => {
      if (!input) return;

      if (mask && !e.altKey && !e.ctrlKey) {
        if (e.key.length === 1) {
          e.preventDefault();
          addCharacterToMaskedInput(input, e.key, mask, onInvalid);
        } else if (e.key === "Backspace" || e.key === "Delete") {
          e.preventDefault();
          deleteCharactersFromMaskedInput(input, e.key, mask, onInvalid);
        }
        return;
      }
    };

    // this is for paste and autofill
    const onInputHandle = () => {
      if (input) {
        input.value = mask(input.value);
      }
    };

    input.addEventListener("keydown", onKeyDownHandle);
    input.addEventListener("input", onInputHandle);
    return () => {
      input.removeEventListener("keydown", onKeyDownHandle);
      input.removeEventListener("input", onInputHandle);
    };
  }, [mask, input, onInvalid]);
}
```