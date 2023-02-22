import React from "react";
import type { ComponentStory, ComponentMeta } from "@storybook/react";

import Switch from "./Switch";
import "../../index.css";


export default {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />;

export const Default = Template.bind({});
Default.args = {
  vertical: false,
};

export const RTL = Template.bind({});
RTL.args = {
  vertical: false,
};
RTL.decorators = [
  (Story) => (
    <div dir="rtl">
      <Story />
    </div>
  ),
];

export const Vertical = Template.bind({});
Vertical.args = {
  vertical: true,
};

export const CustomizedWithTheme = Template.bind({});
CustomizedWithTheme.args = {
  vertical: false,
};
CustomizedWithTheme.decorators = [
  (Story) => (
    <div
      style={
        {
          "--switch-width": "5rem",
          "--switch-height": "3rem",
          "--switch-transition-duration": `1.5s`,
          "--switch-track-color": `LightSteelBlue`,
          "--switch-track-color-checked": `SteelBlue`,
          "--switch-thumb-color": `LightCyan`,
          "--switch-thumb-color-checked": `White`,
        } as React.CSSProperties
      }
    >
      <Story />
      <pre>
        <code>{`
      Variables applied:
          "--switch-width": "5rem",
          "--switch-height": "3rem",
          "--switch-transition-duration": '1.5s',
          "--switch-track-color": 'LightSteelBlue',
          "--switch-track-color-checked": 'SteelBlue',
          "--switch-thumb-color": 'LightCyan',
          "--switch-thumb-color-checked": 'White',
      `}</code>
      </pre>
    </div>
  ),
];

export const UtilitiesOverrideTheme = Template.bind({});
UtilitiesOverrideTheme.args = {
  vertical: false,
  className:
    "[--w:10rem] [--h:5rem] duration-500 bg-gray-500 ui-checked:bg-green-600",
  thumbClass: "bg-yellow-300 ui-checked:bg-yellow-500",
};
UtilitiesOverrideTheme.decorators = [
  (Story) => (
    <div
      style={
        {
          "--switch-width": "5rem",
          "--switch-height": "3rem",
          "--switch-transition-duration": `1.5s`,
          "--switch-track-color": `LightSteelBlue`,
          "--switch-track-color-checked": `SteelBlue`,
          "--switch-thumb-color": `LightCyan`,
          "--switch-thumb-color-checked": `White`,
        } as React.CSSProperties
      }
    >
      <Story />
      <pre>
        <code>{`
      Variables applied:
          "--switch-width": "5rem",
          "--switch-height": "3rem",
          "--switch-transition-duration": '1.5s',
          "--switch-track-color": 'LightSteelBlue',
          "--switch-track-color-checked": 'SteelBlue',
          "--switch-thumb-color": 'LightCyan',
          "--switch-thumb-color-checked": 'White',
      `}</code>
      </pre>
    </div>
  ),
];

export const WidthAndHightShortcutsShouldNotWork = Template.bind({});
WidthAndHightShortcutsShouldNotWork.args = {
  vertical: false,
  className: "w-40 h-20",
};

export const WithRipple = Template.bind({});
WithRipple.args = {
  vertical: false,
  ripple: true,
};

const onChange = (value: boolean) => { console.log('switch clicked:', value) };

export const WithRippleOptions = Template.bind({});
WithRippleOptions.args = {
  vertical: false,
  ripple: {
    color: "red",
    duration: 300,
    maxScale: 2,
    from: 'center',
  },
  onChange 
};

export const WithBoundRipple = Template.bind({});
WithBoundRipple.args = {
  className: 'overflow-hidden',
  vertical: false,
  ripple: true,
};
