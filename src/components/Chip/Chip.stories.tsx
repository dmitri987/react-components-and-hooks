import type { ComponentStory, ComponentMeta } from "@storybook/react";

import Chip from "./Chip";
import "../../index.css";

export default {
  title: "Components/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Chip>;

const Template = (args: any) => {
  const { description, ...props } = args;

  return (
    <div className="grid justify-items-center gap-4">
      {description && (
        <pre className="font-mono bg-gray-700 text-gray-100 p-4 rounded">
          {description}
        </pre>
      )}
      <Chip
        {...props}
        className="border border-cyan-600 text-cyan-700 rounded-lg px-3 py-0.5 w-fit"
      />
    </div>
  );
};

export const Default: any = Template.bind({});
Default.args = {
  label: "John",
  description: `Chip should have 'value' prop. 
If it's 'string' it will be used as a label. 

  <Chip value="John" />`,
};

export const WithLabelOrChildren = () => {
  const value = {
    name: "John",
  };

  return (
    <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
      <Chip
        value="string"
        className="border border-cyan-600 h-fit text-cyan-700 rounded-lg px-3 py-0.5 w-fit"
      />
      <pre className="font-mono bg-gray-700 text-gray-100 px-4 py-2 rounded italic">{`if 'value' is 'string' it can be used on its own

  <Chip value="string" />

If 'value' is not 'string' you should provide 
'label' or 'children' props, but not both

  `}</pre>

      <Chip
        value={value}
        label="John"
        className="border border-cyan-600 h-fit text-cyan-700 rounded-lg px-3 py-0.5 w-fit"
      />
      <pre className="font-mono bg-gray-700 text-gray-100 px-4 py-2 rounded italic">{`<Chip value={{ name: 'John' }} label="John" />`}</pre>

      <Chip
        value={value}
        label={(v) => v.name}
        className="border border-cyan-600 h-fit text-cyan-700 rounded-lg px-3 py-0.5 w-fit"
      />
      <pre className="font-mono bg-gray-700 text-gray-100 px-4 py-2 rounded italic">{`<Chip value={{ name: 'John' }} label={(v) => v.name} />`}</pre>

      <Chip
        value={value}
        className="border border-cyan-600 h-fit text-cyan-700 rounded-lg px-3 py-0.5 w-fit"
      >
        <a href="">child</a>
      </Chip>
      <pre className="font-mono bg-gray-700 text-gray-100 px-4 py-2 rounded italic">{`<Chip>
  <a href="">child</a>
</Chip>`}</pre>

      <Chip
        value={value}
        label="label"
        className="border border-cyan-600 h-fit text-cyan-700 rounded-lg px-3 py-0.5 w-fit"
      >
        <a href="">child</a>
      </Chip>
      <pre className="font-mono bg-gray-700 text-gray-100 px-4 py-2 rounded italic">{`Usage of both 'children' and 'label' simultaneously 
should be a Typescript error.
'children' should take precedence over 'label'

<Chip label="label">
  <a href="">child</a>
</Chip>`}</pre>
    </div>
  );
};

// Default.argTypes = {       // #storybook #argTypes
//   writingMode: {
//     control: "select",
//     options: ["vertical-lr", "horizontal-tb", "vertical-rl"],
//   },
// };
