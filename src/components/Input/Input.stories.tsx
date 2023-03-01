import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import type { InputProps } from "./Input";
import Input from "./Input";
import "../../index.css";


export default {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => (
  <Input className="p-2 bg-white border rounded" {...args} />
);

// defaultValue?: string;
// value?: string;
// onChange?: (value: string) => void;
// debounce?: number;

export const Uncontrolled = Template.bind({});
Uncontrolled.args = {
  defaultValue: "default value",
};

export const SemicontrolledWithOnChange = (props: InputProps) => {
  const [value, setValue] = useState("");

  return (
    <div>
      <Template {...props} onChange={setValue} />
      <p className="bg-white mt-4 p-4 rounded">Value: {value}</p>
    </div>
  );
};
SemicontrolledWithOnChange.args = {
  defaultValue: "default value",
};

export const Controlled = (props: InputProps) => {
  const [value, setValue] = useState("");

  return (
    <div className="">
      <button
        className="border rounded py-2 px-4 bg-white mr-4"
        onClick={() => setValue("reset value")}
      >
        Reset
      </button>
      <Template {...props} value={value} onChange={setValue} />
      <p className="bg-white mt-4 p-4 rounded">Value: {value}</p>
      <pre className="bg-gray-700 text-white mt-4 p-4 rounded">
        <code>{`'defaultValue' should be ignored`}</code>
      </pre>
    </div>
  );
};
Controlled.args = {
  defaultValue: "default value",
};

const assert = (condition: boolean) =>
  condition
    ? <span className="text-green-500">✓</span>
    : <span className="text-red-500">🗙</span>;

export const Debounced = (props: InputProps) => {
  const [value, setValue] = useState("");
  const [inputElement, setInputElement] =
    useState<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const [blurCounter, setBlurCounter] = useState(0);

  return (
    <div className="">
      <Input
        {...props}
        ref={setInputElement}
        className="bg-white border rounded p-2"
        name="foo"
        value={value}
        onChange={setValue}
        onBlur={(e) => setBlurCounter(c => c + 1)}
      />
      <p className="bg-white mt-4 p-4 rounded">Value: {value}</p>
      <ul className="grid gap-3 list-none bg-gray-700 text-white mt-4 p-4 rounded font-mono">
        <li>
          Update of external state should be debounced by 'debounce' ms
        </li>
        <li>
          Update should be immediate after loose of focus ('blur' event)
        </li>
        <li>
          Should call 'onBlur' listener passed externally: {assert(blurCounter > 0)}<br />
          <span className="italic">Focus and unfocus input at least one time</span>
        </li>
        <li>
          Should forward ref to underlying <code>&lt;input&gt;</code>:{" "}
          {assert(inputElement instanceof Element)}
        </li>
        <li>
          Should pass attributes to underlying <code>&lt;input&gt;</code>:{" "}
          {assert(inputElement?.name === "foo")}
        </li>
      </ul>
    </div>
  );
};
Debounced.args = {
  debounce: 1000,
};
