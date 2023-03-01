import {
  useState,
} from "react";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import "../../../index.css";
import Transition from "./Transition";
import { Describe } from "../../Testing/Describe";

export default {
  title: "Components/Transitions/Transition",
  component: Transition,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Transition>;


const Template: ComponentStory<typeof Transition> = (args) => {
  const [show, setShow] = useState(false);
  const [transitionElement, setTransitionElement] =
    useState<HTMLElement | null>(null);

  return (
    <div className="h-screen">
      <pre className="bg-gray-700 text-gray-100 italic p-4 rounded">
        <code>{args.description}</code>
      </pre>
      <button
        className="border rounded px-2 py-0.5"
        onClick={() => setShow((show) => !show)}
      >
        Show
      </button>
      <Transition ref={setTransitionElement} show={show} {...args}>
        <div className="w-80 h-60 p-4 rounded bg-white text-gray-800 border">
          <code>
            Dolor sequi eligendi consequuntur non non eveniet! Pariatur ut
            tenetur nisi similique reiciendis? A dolor eum repellat animi nemo.
            Ad cupiditate ducimus velit accusantium nostrum tempora Laborum
            accusamus cum nemo?
          </code>
        </div>
      </Transition>
      <hr className="border-red-500" />
      {args.tests && <Describe title="Transition tests">
        {args.tests.map(
          ([description, test]: [
            string,
            Function | string | number | boolean
          ]) => [
            description,
            test instanceof Function ? test(transitionElement) : test,
          ]
        )}
      </Describe> }
    </div>
  );
};

export const EnterSetLeave = Template.bind({});
EnterSetLeave.args = {
  description: `'enter' should be duplicated on 'leave' if it's not provided`,
  className: 'duration-[5s]',
  enter: 'duration-500',
  enterFrom: 'opacity-0',
  enterTo: 'opacity-1',
};

export const EnterToSetLeaveFrom = Template.bind({});
EnterToSetLeaveFrom.args = {
  description: `'enterTo' should be duplicated on 'leaveFrom' if it's not provided
'enterFrom' should be duplicated to 'leaveTo' if it's not provided`,
  enter: 'duration-1000',
  enterFrom: 'opacity-0',
  enterTo: 'opacity-1',
};

