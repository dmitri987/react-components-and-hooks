import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useRef, useState } from "react";
import useResizeObserver from "use-resize-observer";
import "../../index.css";
import { clss } from "../../utils/utils";

export default {
  title: "hooks/useResizeObserver",
  // component: Button,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<any>;

const menu = ["item1", "item2", "item3", "item4"];

const Group = (prop: any) => {
  
}

export const ResponsiveNavBar = () => {
  const [show, setShow] = useState(false);
  const { width = 0 } = useResizeObserver({ ref: document.body });
  const tablet = width > 768;

  return (
    <div
      className={clss(
        "fixed inset-x-0 top-0 h-12 px-4",
        "grid grid-cols-[auto_1fr] items-center",
        "border rounded "
      )}
    >
      <span>Brand</span>
      <menu
        className={clss(
          "flex gap-4 justify-self-end px-4 transition",
          !tablet && "fixed flex-col border rounded top-12 right-0",
          !tablet && !show && "translate-x-full",
        )}
      >
        {menu.map((label) => (
          <button className="">{label}</button>
        ))}
      </menu>
      {!tablet && (
        <button
          className="justify-self-end transition"
          onClick={() => setShow((show) => !show)}
        >
          show
        </button>
      )}
    </div>
  );
};
