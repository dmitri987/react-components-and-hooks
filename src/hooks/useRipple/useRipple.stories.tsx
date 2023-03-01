import { ComponentStory, ComponentMeta } from "@storybook/react";
import useRipple, { RippleOptions } from "./useRipple";
import "../../index.css";
import { ButtonHTMLAttributes, HTMLAttributes, useState } from "react";
import Switch from "../../components/Switch/Switch";


const Button = (props: RippleOptions & HTMLAttributes<HTMLButtonElement>) => {
  const [element, setElement] = useState<HTMLButtonElement | null>(null);
  useRipple(element, props);

  return (
    <button
      ref={setElement}
      className="relative overflow-hidden bg-blue-300 border rounded p-2"
      onClick={props.onClick}
    >
      With Ripple
    </button>
  );
};

export default {
  title: "hooks/useRipple",
  component: Button,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button />;

const assert = (condition: boolean) =>
  condition ? (
    <span className="text-green-500">✓</span>
  ) : (
    <span className="text-red-500">🗙</span>
  );

export const Default = (args: RippleOptions) => {
  const [clickCount, setClickCount] = useState(0);

  return <div className="">
    <Button {...args} onClick={() => setClickCount(c => c + 1)} />
    <Switch className="bg-gray-500 ui-checked:bg-cyan-600" ripple />
    <ul className="grid gap-3 list-none bg-gray-700 text-white mt-4 p-4 rounded font-mono">
      <li>Should cancel previous ripple, when new ripple is created</li>
      <li>Should ripple when clicked with keyboard</li>
      <li>Clicking on target before ripple animation is finished,
   should trigger 'click' event on the target: {clickCount}
      </li>
    </ul>
  </div>
 };

Default.args = {
  color: "rgba(255, 255, 255, 0.4)",
  duration: 500,
  maxScale: 1,
  from: "cursor",
};
Default.argTypes = {};
