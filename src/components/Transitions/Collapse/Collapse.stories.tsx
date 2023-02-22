import React, { MutableRefObject, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../../../index.css";
import Collapse from "./Collapse";
import { Transition } from "@headlessui/react";


export default {
  title: "Components/Transitions/Collapse",
  component: Collapse,
  parameters: {
    layout: "padded",
  },
} as ComponentMeta<typeof Collapse>;

const Template: ComponentStory<typeof Collapse> = (args) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="w-full">
      <button
        className="border rounded px-2 bg-white mb-4"
        onClick={() => setOpen((open) => !open)}
      >
        Open
      </button>
      <Collapse
        {...args}
        open={open}
        className={"duration-300 border-0 bg-transparent " + args.className}
      >
        <div className="bg-white rounded box-content border p-4">
          <p>
            Adipisicing veritatis neque animi nam distinctio iste, porro Nemo
            culpa minima aliquam facilis magnam eligendi quo alias. Cumque
            ducimus consequatur vitae ducimus mollitia. Vero aut hic nulla porro
            libero. Ducimus
          </p>
        </div>
      </Collapse>
      <hr className="border-red-500 bg-red-500 m-1 [inline-size:100%] [block-size:1px]" />
    </div>
  );
};

export const Default = Template.bind({});

export const InlineCollapse = Template.bind({});
InlineCollapse.args = {
  inline: true,
};

export const RTL = (args: any) => (
  <div dir="rtl">
    <Template {...args} />
  </div>
);
RTL.args = {
  inline: true,
};

export const Vertical = (args: any) => (
  <div style={{ writingMode: args.writingMode, width: args.width, height: args.height }}>
    <Template {...args} />
  </div>
);
Vertical.args = {
  inline: false,
  writingMode: 'vertical-lr',
  // width: '300px',
  // height: '300px',
};

Vertical.argTypes = {
  writingMode: {
    control: "select",
    options: ["vertical-lr", "horizontal-tb", "vertical-rl"],
  },
};

export const StyleWithModifiers = Template.bind({});
StyleWithModifiers.args = {
  inline: false,
  className: 'opacity-0 ui-open:opacity-50 !duration-1000'
};
