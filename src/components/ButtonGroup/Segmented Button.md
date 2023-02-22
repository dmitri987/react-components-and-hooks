#segmented #button #react #headlessui #tailwind #snippet 

Some ideas on how to make segmented buttons
```tsx
type SegmentedButtonProps<T extends string | { label: string }> = {
  values: T[];
  defaultValue?: T;
  value?: T;
  onChange(v: T): void;
} & Parameters<typeof RadioGroup>[0];

function SegmentedButtons<T extends string | { label: string } = string>({
  values,
  ...props
}: SegmentedButtonProps<T>) {
  return (
      <RadioGroup {...props} className={clss(
        "flex justify-content-center gap-[2px]"
          )}>
      {values.map((value, index) => (
        <RadioGroup.Option
          key={index}
          as="button"
          value={value}
          className={clss(
            // overlap selected item over unselected ones
            "relative ui-checked:z-10 transition",
            // round corner items
            "first:rounded-l-lg last:rounded-r-lg px-2 py-1 outline-2 border-0",
            // use outline rather than borders
            "outline outline-2 outline-default",
            // #Important: use colors without transparency
            "ui-checked:bg-dark ui-checked:outline-checked",
            "ui-active:outline-active"
          )}
        >
          {typeof value === "string" ? value : value.label}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}
```