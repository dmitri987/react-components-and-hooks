import type { ComponentStory, ComponentMeta } from "@storybook/react";

import Code from "./Code";
import "../../index.css";
import "../../../libs/syntax-highlight/themes/prism/default.css";
import "highlight.js/styles/default.css";
import { clss } from "../../utils/utils";

export default {
  title: "Components/Code",
  component: Code,
  parameters: {
    layout: "padded",
  },
} as ComponentMeta<typeof Code>;

export const Default = ({ theme }: any) => {
  return (
    <div
      className={clss(
        "grid gap-4",
        theme === "hljs" ? "hljs-theme" : theme && "prism-theme"
      )}
    >
      <Code
        language="js"
        className={`
      bg-gray-700 text-gray-50 border border-default rounded-default
      
    `}
      >
        {`
// <Code language="js">

var x = 42;

// What will be printed on finish?
animation.finished.then(() => console.log('#1'))
animation.finished.then(() => console.log('#2'))

      `}
      </Code>

      <Code
        language="js"
        hljs
        className={`
      bg-gray-700 text-gray-50 border border-default rounded-default
      
    `}
      >
        {`
// <Code language="js" hljs>

var x = 42;

// What will be printed on finish?
animation.finished.then(() => console.log('#1'))
animation.finished.then(() => console.log('#2'))

      `}
      </Code>

      <Code
        language="non-existing"
        hljs
        className={`
      bg-gray-700 text-gray-50 border border-default rounded-default
      
    `}
      >
        {`
// <Code language="non-existing">

var x = 42;

// What will be printed on finish?
animation.finished.then(() => console.log('#1'))
animation.finished.then(() => console.log('#2'))

      `}
      </Code>

      <Code
        language="js"
        autolink="text-red-500"
        className="border rounded p-4"
      >
        <pre className="font-mono text-gray-700 bg-gray-100 rounded p-4">{`<h1>...</h1>`}</pre>
        <h1>Everything except text will be rendered as is, without highlighting</h1>
      </Code>

      <Code
        language="js"
        wrapLines="even:uppercase [&:nth-child(n+2)]:odd:underline"
        className={`
      bg-gray-700 text-gray-50 border border-default rounded-default
      
    `}
      >
        {` // <Code language="js" wrapLines="even:uppercase [&:nth-child(n+2)]:odd:underline">

var x = 42;

// What will be printed on finish?
animation.finished.then(() => console.log('#1'))
animation.finished.then(() => console.log('#2'))

      `}
      </Code>

      <Code
        language="js"
        autolink="text-red-500"
        className={`
      bg-gray-700 text-gray-50 border border-default rounded-default
      
    `}
      >
        {` // <Code language="js" autolink="text-red-500">

// https://google.com
// foo@gmail.com
var x = 42;
      `}
      </Code>
    </div>
  );
};

Default.argTypes = {
  theme: {
    control: "select",
    options: ["default", "prism", "hljs"],
  },
};
