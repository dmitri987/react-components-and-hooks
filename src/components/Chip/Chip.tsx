import { Switch } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { ReactElement, ReactNode } from "react";
import {clss} from "../../utils/utils";

type CommonProps<T extends any = string> = {
  // as?: string; if 'selected' or 'defaultSelected' default is 'button', else 'span' #todo
  selected?: boolean;
  defaultSelected?: boolean;
  onClick?: (value: T, checked?: boolean) => void;
  onClose?: (value: T, checked?: boolean) => void;
  CloseIcon?: boolean | string | React.Component;
} & Omit<React.HTMLAttributes<HTMLSpanElement>, "onChange">;

type DefaultProps = {
  value: string;
} & CommonProps<string>;

type PropsWithLabel<T extends any = string> = {
  value: T;
  label: string | ((value: T) => string);
} & CommonProps<T>;

type PropsWithChildren<T extends any = string> = {
  value: T;
  children: ReactNode;
} & CommonProps<T>;

function Chip<T extends any = string>(props: DefaultProps): ReactElement;

function Chip<T extends any = string>(props: PropsWithLabel<T>): ReactElement;

function Chip<T extends any = string>(
  props: PropsWithChildren<T>
): ReactElement;

function Chip<T extends any = string>(
  props: DefaultProps | PropsWithLabel<T> | PropsWithChildren<T>
) {
  const {
    value,
    label,
    children,
    className,
    selected,
    defaultSelected,
    onClick,
    onClose,
    CloseIcon,
    ...rest
  } = props as PropsWithLabel<T>;

  const _label =
    typeof label === "string"
      ? label
      : label instanceof Function
      ? label(value)
      : typeof value === "string"
      ? value
      : null;

  return (
    <Switch
      as="span"
      checked={selected}
      defaultChecked={defaultSelected}
      onChange={(selected) => onClick?.(value, selected)}
      className={clss(
        "inline-block select-none rounded-full flex gap-4 px-2",
        className
      )}
      {...rest}
    >
      {children ?? <span>{_label}</span>}
      {onClose && (
        <span
          className="self-center block text-sm cursor-pointer hover:bg-gray-50/50"
          onClick={(e) => {
            e.stopPropagation();
            onClose(value);
          }}
        >
          <XMarkIcon className="w-5 h-5 text-gray-500/50 hover:text-gray-500" />
        </span>
      )}
    </Switch>
  );
}

export default Chip;
