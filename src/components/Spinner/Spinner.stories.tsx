import { CircularProgress } from "@mui/material";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useState } from "react";
import "../../index.css";
import { clss } from "../../utils/utils";
import Spinner from "./Spinner";

export default {
  title: "components/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Spinner>;

const Description = (props: any) => (
  <pre className="border rounded p-4 whitespace-pre-wrap justify-self-start">
    {props.children}
  </pre>
);

export const ShowCase = () => {
  const [value, setValue] = useState(25);

  return (
    <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-2 ml-1/4 items-center justify-items-center">
      <div className="flex gap-4 justify-self-end">
        <span className="animate-[grow_1.2s_linear_infinite] bg-green-600/30 rounded-full w-6 h-6"></span>
        <span className="animate-[grow_1.2s_linear_infinite_200ms] bg-green-600/30 rounded-full w-6 h-6"></span>
        <span className="animate-[grow_1.2s_linear_infinite_400ms] bg-green-600/30 rounded-full w-6 h-6"></span>
      </div>
      <Description>
        {`<div className="flex gap-4">
  <span className="animate-[grow_1.2s_linear_infinite] bg-green-600/30 rounded-full w-6 h-6"></span>
  <span className="animate-[grow_1.2s_linear_infinite_200ms] bg-green-600/30 rounded-full w-6 h-6"></span>
  <span className="animate-[grow_1.2s_linear_infinite_400ms] bg-green-600/30 rounded-full w-6 h-6"></span>
</div>
// see tailwind.config.cjs`}
      </Description>

      <span className="inline-block w-6 h-6 rounded-full border-2 border-r-0 border-b-0 border-red-600 animate-spin"></span>
      <Description>
        {`<span className="inline-block w-6 h-6 rounded-full border-2 border-r-0 border-b-0 border-red-600 animate-spin"></span>`}
      </Description>

      <CircularProgress />
      <Description>{`Material UI <CircularProgress />`}</Description>

      <Spinner />
      <Description>{`<Spinner />`}</Description>

      <Spinner className="w-12 h-12 text-orange-600" duration={3} />
      <Description>
        {`<Spinner className="w-12 h-12 text-orange-600" duration={3}/>`}
      </Description>

      <Spinner style={{ width: '3rem', height: '3rem', color: 'darkorange' }}/>
      <Description>
      {`<Spinner style={{ width: '3rem', height: '3rem', color: 'darkorange' }}/>`}
      </Description>

      <Spinner className="w-12 h-12 stroke-1" />
      <Description>{`<Spinner className="w-12 h-12 stroke-1" />`}</Description>

      <div className="flex gap-4">
        <Spinner className="w-6 h-6" />
        <Spinner className="w-6 h-6" delay={0.2} />
      </div>
      <Description>
        {`<div className="flex gap-4">
  <Spinner className="w-6 h-6" />
  <Spinner className="w-6 h-6" delay={0.2}/>
</div>
`}
      </Description>

      <Spinner shrink={false} />
      <Description>{`<Spinner shrink={false} />`}</Description>

      <Spinner className="" value={value} />
      <div className="justify-self-start">
        <Description>{`<Spinner value={value} />`}</Description>
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(+e.target.value)}
        />
      </div>

      <Spinner className="w-12 h-12" label />
      <Description>
{`<Spinner className="w-8 h-8" label />
// 'label' without 'value' should be ignored`}</Description>

      <Spinner className="w-12 h-12" value={value} label />
      <Description>
{`<Spinner className="w-8 h-8" value={value} label />`}</Description>

      <Spinner className="w-12 h-12" value={value} label="text-red-600" />
      <Description>
{`<Spinner className="w-12 h-12" value={value} label="text-red-600" />`}</Description>

      <Spinner className="w-12 h-12" value={value}>
        <span className="absolute inset-0 grid place-content-center text-sm text-black">{value}%</span>
      </Spinner>
      <Description>
{`<Spinner className="w-12 h-12" value={value}>
  <span className="absolute inset-0 grid place-content-center text-sm text-black">{value}%</span>
</Spinner>`}
</Description>

      <div className="flex gap-4">
        <Spinner className="w-12 h-12" value={-100} label />
        <Spinner className="w-12 h-12" value={200} label />
      </div>
      <Description>
{`// should clamp 'value' to [0, 100]
<div className="flex gap-4">
  <Spinner className="w-12 h-12" value={-100} label />
  <Spinner className="w-12 h-12" value={200} label />
</div>`}
</Description>
    </div>

  );
};
