import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useEffect, useRef, useState } from "react";
import useExternalResizeObserver from "use-resize-observer";
import { Describe } from "../../components/Testing/Describe";
import "../../index.css";
import globalResizeObserver, {OnResizeCallback} from "../../libs/reactive-resize-observer";
import { clss } from "../../libs/utils";
import useResizeObserver from "./useResizeObserver";

export default {
  title: "hooks/useResizeObserver",
  // component: Button,
  parameters: {
    layout: "padded",
  },
} as ComponentMeta<any>;

const menu = ["item1", "item2", "item3", "item4"];


export const ResponsiveNavBar = () => {
  const [show, setShow] = useState(false);
  const { width = 0 } = useExternalResizeObserver({ ref: document.body });
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
          !tablet && !show && "translate-x-full"
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

export const Tests = () => {
  const [, setUpdate] = useState(false);
  const [target1, setTarget1] = useState<HTMLElement | null>(null);
  const [target2, setTarget2] = useState<HTMLElement | null>(null);
  const [target3, setTarget3] = useState<HTMLElement | null>(null);
  const [target4, setTarget4] = useState<HTMLElement | null>(null);
  const [target5, setTarget5] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setTimeout(() => setUpdate((u) => !u), 300);
  }, []);

  const [observedWidth1, setObservedWidth1] = useState(0);
  useEffect(() => {
    if (!target1) return;
    globalResizeObserver.observe(target1, (entry) => {
      setObservedWidth1(entry.borderBoxSize[0].inlineSize);
    });
    setTimeout(() => (target1.style.width = "300px"), 50);
  }, [target1]);

  const [observedWidth2, setObservedWidth2] = useState(0);
  useEffect(() => {
    if (!target2) return;
    globalResizeObserver.observe(target2, (entry) => {
      if (entry.borderBoxSize[0].inlineSize === 300)
        setObservedWidth2(entry.borderBoxSize[0].inlineSize);
    });
    setTimeout(() => {
      target2.style.width = "300px";
    }, 50);
  }, [target2]);
  useEffect(() => {
    globalResizeObserver.unobserve(target2);
    setTimeout(() => {
      target2!.style.width = "200px";
      setUpdate((u) => !u);
    }, 70);
  }, [observedWidth2]);

  const [observedWidth3A, setObservedWidth3A] = useState(0);
  const [observedWidth3B, setObservedWidth3B] = useState(0);
  useEffect(() => {
    if (!target3) return;
    globalResizeObserver.observe(target3, (entry) => {
      if (entry.borderBoxSize[0].inlineSize > 16)
        setObservedWidth3A(entry.borderBoxSize[0].inlineSize);
    });
    setTimeout(() => {
      target3.style.width = "300px";
    }, 20);
  }, [target3]);

  useEffect(() => {
    globalResizeObserver.observe(target3, (entry) => {
      setObservedWidth3B(entry.borderBoxSize[0].inlineSize);
    });
    setTimeout(() => {
      target3!.style.width = "200px";
      setUpdate((u) => !u);
    }, 40);
  }, [observedWidth3A]);

  const [observedWidth4, setObservedWidth4] = useState(0);
  const [observedWidth5, setObservedWidth5] = useState(0);
  useEffect(() => {
    if (target4) {
      globalResizeObserver.observe(target4, (entry) => {
        setObservedWidth4(entry.borderBoxSize[0].inlineSize);
      });
      setTimeout(() => {
        target4.style.width = "300px";
      }, 30);
      setTimeout(() => {
        target4.style.width = "500px";
        setUpdate((u) => !u);
      }, 270);
    }
  }, [target4]);

  useEffect(() => {
    if (target5) {
      globalResizeObserver.observe(target5, (entry) => {
        setObservedWidth5(entry.borderBoxSize[0].inlineSize);
      });
      setTimeout(() => {
        target5.style.width = "300px";
      }, 30);
      setTimeout(() => {
        target5.style.width = "500px";
        setUpdate((u) => !u);
      }, 270);
    }
    setTimeout(() => {
      globalResizeObserver.disconnect();
    }, 250);
  }, [target5]);

  const [observedWidth6, setObservedWidth6] = useState(0);
  const [target6, setTarget6] = useState<HTMLElement | null>(null);
  const [target7, setTarget7] = useState<HTMLElement | null>(null);
  const [curTarget, setCurTarget] = useState<HTMLElement | null>(null);
  useResizeObserver(curTarget ?? target6, (entry) => {
    setObservedWidth6(entry.borderBoxSize[0].inlineSize);
  });
  useEffect(() => {
    if (target6) {
      setTimeout(() => {
        target6.style.width = "300px";
      }, 30);
    }
  }, [target6]);
  useEffect(() => {
    if (!target7) return;
    setTimeout(() => {
      setCurTarget(target7);
    }, 50);
  }, [target7]);
  useEffect(() => {
    if (!curTarget) return;
    setTimeout(() => {
      curTarget.style.width = "500px";
      setUpdate((u) => !u);
    }, 30);
  }, [curTarget]);

  const [observedResult, setObservedResult] = useState("");
  const [target8, setTarget8] = useState<HTMLElement | null>(null);
  const [onResize, setOnResize] = useState<OnResizeCallback | null>(null);
  useResizeObserver(target8, onResize ?? (() => setObservedResult("A")));
  useEffect(() => {
    if (!target8) return;
    target8.style.width = "300px";
    setTimeout(() => {
      setOnResize(() => setObservedResult("B"));
    }, 30);
    setTimeout(() => {
      target8.style.width = "200px";
    }, 50);
  }, [target8]);

  const [target9, setTarget9] = useState<HTMLElement | null>(null);
  const [result9, setResult9] = useState('')
  useResizeObserver(target9, () => setResult9('A'))
  useResizeObserver(target9, () => setResult9('B'))

  // const [target10, setTarget10] = useState<HTMLElement | null>(null);
  // const [observers10, setObservers10] = useState<ReactiveResizeObserver[]>([]);


  return (
    <div className="w-full border">
      <div id="container1"></div>
      <Describe title="ReactiveResizeObserver">
        {[
          [
            `observe(target, onResize) should start observing target resize`,
            observedWidth1 === 300,
          ],
          [
            `unobserve(target) should stop observing target resize`,
            // observedWidth2
            observedWidth2 === 300 &&
              target2?.getBoundingClientRect().width === 200,
          ],
          [
            `observe(target, onResize1); observe(target, onResize2) should unsubscribe onResize1`,
            observedWidth3A === 300 && observedWidth3B === 200,
          ],
          [
            `disconnect() should unobserve all targets`,
            observedWidth4 === 300 && observedWidth5 === 300,
          ],
        ]}
      </Describe>
      <Describe title="useResizeObserver(target, onResize, options?): void">
        {[
          [
            `should be able to change 'target' dynamically`,
            observedWidth6 === 500 &&
              target6?.getBoundingClientRect().width === 300 &&
              target7?.getBoundingClientRect().width === 500,
          ],
          [`should ignore changes of 'onResize'`, observedResult === "A"],
          [
           `useResizeObserver(target, onResize1); useResizeObserver(target, onResize2); should bind 'onResize2'`,
           result9 === 'B'
          ]
        ]}
      </Describe>
      <div ref={setTarget1} className="w-4"></div>
      <div ref={setTarget2} className="w-4"></div>
      <div ref={setTarget3} className="w-4"></div>
      <div ref={setTarget4} className="w-4"></div>
      <div ref={setTarget5} className="w-4"></div>
      <div ref={setTarget6} className="w-4"></div>
      <div ref={setTarget7} className="w-4"></div>
      <div ref={setTarget8} className="w-4"></div>
      <div ref={setTarget9} className="w-4"></div>
    </div>
  );
};
