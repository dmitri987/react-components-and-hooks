import { CSSProperties, useEffect, useRef, useState } from "react";
import Progress from "./Progress";
import "highlight.js/styles/stackoverflow-dark.css";
import hljs from "highlight.js";
import useScroll from "../../hooks/useScroll";

export default function ProgressStories() {
  const [value, setValue] = useState(50);
  const [dir, setDir] = useState("ltr");

  const [downloadProgress, setDownloadProgress] = useState(0);
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);

  const refContainer = useRef(null);
  const { yProgress } = useScroll({ container: refContainer });

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div className="mt-20 w-[800px] grid gap-8 mx-auto" dir={dir}>
      <aside
        className="fixed z-30 p-4 border rounded shadow-xl grid grid-cols-[5rem_auto] gap-2 bg-slate-50 top-20 right-20"
        dir="ltr"
      >
        <label htmlFor="value">Value:</label>
        <input
          id="value"
          className="border rounded"
          type="number"
          defaultValue={value}
          min={0}
          max={100}
          onChange={({ target }) => setValue(+target.value)}
        />
        <label htmlFor="direction">Direction:</label>
        <select
          id="direction"
          className="border rounded"
          value={dir}
          onChange={({ target }) => setDir(target.value)}
        >
          <option value="ltr">LTR</option>
          <option value="rtl">RTL</option>
        </select>
      </aside>

      <section className="grid gap-2">
        <h3 className="text-lg text-red-600">Indeterminate Progress</h3>
        <Progress className="w-full h-2 bg-sky-100" barSlot="bg-blue-300" />
        <pre className="border rounded bg-gray-50" dir="ltr">
          <code className="language-html">{`
        <Progress
          className="w-full h-2 bg-sky-100"
          barSlot="bg-blue-300"
        />
          `}</code>
        </pre>
      </section>

      <section className="grid gap-2 [writing-mode:vertical-rl]">
        <h3 className="text-lg text-red-600">
          Vertical Indeterminate Progress
        </h3>
        <h4 className="">LTR</h4>
        <Progress className="w-2 bg-sky-100 vertical" barSlot="bg-blue-300" />
        <h4 className="">RTL</h4>
        <Progress
          className="w-2 bg-sky-100 vertical"
          dir="rtl"
          barSlot="bg-blue-300"
        />
        <pre
          className="border rounded bg-gray-50 [writing-mode:horizontal-tb]"
          dir="ltr"
        >
          <code className="language-html">{`
      <section className="grid gap-2 [writing-mode:vertical-rl]">
            ...
        <Progress className="w-2 bg-sky-100 vertical" barSlot="bg-blue-300" />
        <Progress className="w-2 bg-sky-100 vertical" dir="rtl" barSlot="bg-blue-300" />
          `}</code>
        </pre>
      </section>

      <section className="grid gap-2">
        <h3 className="text-lg text-red-600">Default Progress</h3>
        <Progress value={value} />
        <pre className="border rounded bg-gray-50" dir="ltr">
          <code className="language-html">{`
        <Progress
          value={value}
        />
          `}</code>
        </pre>
      </section>

      <section className="grid gap-2">
        <h3 className="text-lg text-red-600">
          Vertical Progress with vertical writing-mode
        </h3>
        <div className="[writing-mode:vertical-lr]">
          <Progress className="w-4 text-sm text-white" value={value} dir="rtl">
            {value}
          </Progress>
          <pre
            className="border ml-4 rounded bg-gray-50 [writing-mode:horizontal-tb]"
            dir="ltr"
          >
            <code className="language-html">{`
        <section className="grid gap-2 [writing-mode:vertical-lr]">
              ...
          <Progress className="w-4 text-sm text-white" value={value} dir="rtl">
            {value}
          </Progress>
            `}</code>
          </pre>
        </div>
      </section>

      <section className="grid gap-2">
        <h3 className="text-lg text-red-600">
          Vertical Progress with .vertical
        </h3>
        <div className="flex gap-4">
          <Progress
            className="w-4 text-sm text-white vertical [text-orientation:upright]"
            value={value}
          >
            {value}
          </Progress>
          <pre
            className="border rounded bg-gray-50 [writing-mode:horizontal-tb]"
            dir="ltr"
          >
            <code className="language-html">{`
          <Progress
            className="w-4 text-sm text-white vertical [text-orientation:upright]"
            value={value}
          >
            {value}
          </Progress>
            `}</code>
          </pre>
        </div>
      </section>

      <section className="grid gap-2">
        <h3 className="text-lg text-red-600">Configure bar with slot</h3>
        <Progress className="h-4" barSlot="bg-green-600 h-1" value={value} />
        <pre className="border rounded bg-gray-50" dir="ltr">
          <code className="language-html">{`
        <Progress className="h-4" barSlot="bg-green-600 h-1" value={value} />
          `}</code>
        </pre>
      </section>

      <section className="grid gap-2">
        <h3 className="text-lg text-red-600">Custom Progress Bar</h3>
        <Progress className="content-center h-4 bg-red-200 grid" value={value}>
          <div className="w-full h-1 bg-red-600"></div>
        </Progress>
        <pre className="border rounded bg-gray-50" dir="ltr">
          <code className="language-html">{`
        <Progress className="content-center h-4 bg-red-200 grid" value={value}>
          <div className="w-full h-1 bg-red-600"></div>
        </Progress>
          `}</code>
        </pre>
      </section>

      <section className="grid gap-2">
        <h3 className="text-lg text-red-600">Dynamic Color Progress</h3>
        <Progress
          className="w-full h-4 bg-sky-100 duration-150"
          barSlot={
            {
              backgroundColor: `hsl(${-1 * value * 2.4 + 360}, 40%, 50%)`,
            } as CSSProperties
          }
          value={value}
        />
        <pre className="border rounded bg-gray-50" dir="ltr">
          <code className="language-html">{`
        <Progress
          className="w-full h-4 bg-sky-100 duration-150"

          barSlot={
            {
              backgroundColor: \`hsl(\${-1*value * 2.4 + 360}, 40%, 50%)\`,
            } as CSSProperties
          }
          value={value}
        />
          `}</code>
        </pre>
      </section>

      <section className="grid gap-2">
        <h3 className="text-lg text-red-600">Progress with styled label</h3>
        <Progress
          className="w-full h-4 text-sm text-white bg-sky-100 duration-1000"
          barSlot="bg-sky-600"
          value={value}
        >
          {value}
        </Progress>
        <pre className="border rounded bg-gray-50" dir="ltr">
          <code className="language-html">{`
        <Progress
          className="w-full h-4 text-sm text-white bg-sky-100 duration-1000"
          barSlot="bg-sky-600"
          value={value}
        >
          {value}
        </Progress>
          `}</code>
        </pre>
      </section>

      <section className="grid gap-2">
        <h3 className="text-lg text-red-600">
          Different colors for value ranges
        </h3>
        <Progress
          className="w-full h-4 bg-white"
          barSlot={
            value > 70
              ? "bg-green-700"
              : value > 30
              ? "bg-yellow-400"
              : "bg-red-700"
          }
          value={value}
        ></Progress>
        <pre className="border rounded bg-gray-50" dir="ltr">
          <code className="language-html">{`
        <Progress
          className="w-full h-4 bg-white"
          barSlot={
            value > 70
              ? "bg-green-700"
              : value > 30
              ? "bg-yellow-400"
              : "bg-red-700"
          }
          value={value}
        >
        </Progress>
          `}</code>
        </pre>
      </section>

      <section className="grid gap-2">
        <h3 className="text-lg text-red-600">Embed Progress to a button</h3>
        <button
          className="relative px-2 border rounded"
          onClick={(e) => {
            let id: NodeJS.Timer;
            let btn = e.target as HTMLButtonElement;
            let progress = 0;

            setDownloadProgress(0);
            setShow(true);
            btn.disabled = true;

            id = setInterval(() => {
              if (progress >= 100) {
                setShow(false);
                setSuccess(true);
                clearInterval(id);
                setTimeout(() => {
                  setSuccess(false);
                  btn.disabled = false;
                }, 3000);
                return;
              }

              progress += 1;
              setDownloadProgress(progress);
            }, 20);
          }}
        >
          {success && <span className="mr-2 text-green-500">&#x2713;</span>}
          Download
          {show && (
            <Progress
              className="absolute inset-0 h-full opacity-10 duration-[0s]"
              barSlot="bg-blue-500"
              value={downloadProgress}
            />
          )}
        </button>
        <pre className="border rounded bg-gray-50" dir="ltr">
          <code className="language-html">{`
        <button
          className="relative px-2 border rounded"
          onClick={(e) => {
            let id: NodeJS.Timer;
            let btn = e.target as HTMLButtonElement;
            let progress = 0;

            setDownloadProgress(0);
            setShow(true);
            btn.disabled = true;

            id = setInterval(() => {
              if (progress >= 100) {
                setShow(false);
                setSuccess(true);
                clearInterval(id);
                setTimeout(() => {
                  setSuccess(false);
                  btn.disabled = false;
                }, 3000);
                return;
              }

              progress += 1;
              setDownloadProgress(progress);
            }, 20);
          }}
        >
          {success && <span className="mr-2 text-green-500">&#x2713;</span>}
          Download
          {show && (
            <Progress
              className="absolute inset-0 h-full opacity-10 duration-[0s]"
              barSlot="bg-blue-500"
              value={downloadProgress}
            />
          )}
        </button>
          `}</code>
        </pre>
      </section>

      <section className="grid gap-2">
        <h3 className="text-lg text-red-600">Page Scroll Progress</h3>
        <Progress
          className="w-full h-2 bg-red-50 duration-700 ease-linear"
          barSlot="bg-red-600"
          value={yProgress ? yProgress * 100 : 0}
        />
        <div
          className="border w-full h-[200px] overflow-auto"
          ref={refContainer}
        >
          <div className="h-[800px]"></div>
        </div>
        <pre className="border rounded bg-gray-50" dir="ltr">
          <code className="language-html">{`
  const refContainer = useRef(null);
  const { yProgress } = useScroll({ container: refContainer });
          ...
        <Progress
          className="w-full h-2 bg-red-50 duration-700 ease-linear"
          barSlot="bg-red-600"
          value={yProgress ? yProgress * 100 : 0}
        />
        <div className="border w-full h-[200px] overflow-auto" ref={refContainer}>
          <div className="h-[800px]"></div></div>
          `}</code>
        </pre>
      </section>
    </div>
  );
}
