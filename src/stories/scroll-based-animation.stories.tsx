import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import Code from "../components/Code/Code";
import { useIntersection } from "../components/Intersection/Intersection";
import usePrevious from "../hooks/usePrevious/usePrevious";
import useScroll from "../hooks/useScroll/useScroll";
import useSum from "../hooks/useSum/useSum";

export default {
  title: "Features/scroll-based animation",
};

/* TODO
 * <Scene className="h-[300vh]" snaps={3} snaps={[1500, '120vh']} root margins?
 *   // each snap >= 100vh 
 *   // Scene height > 100vh 
 *   'root' defines scroll container (window by default)
 *   when Scene hits upper margin it make all Items 'fixed'
 *
 *
 *   <Scene.Item from? to? style? once 
 *   // from, to are for not scroll-based transition 
 *   // once  is one time reveal 
 *   // run transition on fourth snap (it's like 'to' for a snap)
 *   snaps={{ 3: 'scale-150' }} 
 *   // 
 *   snaps={{ 0: (p) => style }}
 *
 *   useScrollProgress({ root, target, margins  })
 *   root is scrollable container
 *   target height > 100vh 
 *   when target hits top margin start tracking scroll 
 *   when target leave bottom margin stop tracking scroll 
 */

export const ScrollProgress = () => {
  const { yProgress } = useScroll();

  return (
    <div className="w-[clamp(360px,_95%,_800px)] mx-auto min-h-[200vh] border bg-gray-50">
      <div
        className="fixed top-0 left-0 w-full h-1 bg-red-600 origin-left z-10"
        style={{ scale: `${yProgress ?? 0} 1` }}
      ></div>
      <Code className="p-4 my-20">{`

const { yProgress } = useScroll();

      <div
        className="fixed top-0 left-0 w-full h-1 bg-red-600 origin-left"
        style={{ scale: \`\${yProgress ?? 0} 1\` }}
      ></div>

      `}</Code>
    </div>
  );
};

type Height = number | `${number}vh`;
const resolveHeight = (h: Height) =>
  typeof h === "number" ? h : (+h.slice(0, -2) * window.innerHeight) / 100;

type UseScrollRegressOptions = {
  target?: Element | null;
  margins?: Height | [top: Height, bottom?: Height];
  range?: Height | Element | null;
  progress?: boolean;
};

type UseScrollRegressReturnType = {
  ref?: (instance: Element | null) => void;
  value: number | null;
};

function resolveRanges(options?: { target?: Element | null, range?: Height | Element | null, margins?: Height | [top: Height, bottom?: Height] }): [mt: number, range: number, mb: number] {
  
  const mt = !options?.margins
    ? 0
    : options?.margins instanceof Array
    ? resolveHeight(options.margins[0])
    : resolveHeight(options.margins);

  const mb = !options?.margins
    ? 0
    : options?.margins instanceof Array
    ? resolveHeight(options.margins[1] ?? mt)
    : resolveHeight(options.margins);

  const r = !options?.range
    ? (options?.target?.parentElement?.getBoundingClientRect().height ?? 0) - mt - mb
    : options?.range instanceof Element
    ? options?.range.getBoundingClientRect().height - mt - mb
    : resolveHeight(options.range);
  return [mt, r, mb];
}

const useScrollRegress = (
  options?: UseScrollRegressOptions
): UseScrollRegressReturnType => {
  const firstCallRef = useRef(true);
  const [target, setTarget] = useState<Element | null>(null);
  useScroll();

  useEffect(() => {
    if (options?.target) setTarget(options?.target);
  }, [options?.target]);

  let result: UseScrollRegressReturnType = { value: null };
  if (options?.target === undefined) {
    result.ref = setTarget;
  }

  if (!target) return result;

  const [mt, r, mb] = resolveRanges(options);

  const { top = 0 } = target.getBoundingClientRect();
  if (!options?.progress) {
    if (!firstCallRef.current && (top >= r + mb || top <= mt)) return result;

    firstCallRef.current = false;
    result.value = Math.min(Math.max((top - mb) / r, 0), 1);
  } else {
    if (!firstCallRef.current && (top >= mt || top <= -1 * (r + mb)))
      return result;

    firstCallRef.current = false;
    result.value = Math.min(Math.max((-1 * (top - mt)) / r, 0), 1);
  }

  // console.log(top, r, mt, mb, result.value);
  // if (options?.progress) result.value = 1 - result.value;

  return result;
};

type ScrollRevealProps = {
  margins?: Height | [top: Height, bottom?: Height];
  range?: Height | Element | null;
  progress?: boolean;
  styleFn: (value: number) => CSSProperties;
  className?: string;
  children?: ReactNode;
};

const ScrollReveal = ({
  styleFn,
  className,
  progress,
  children,
  ...options
}: ScrollRevealProps) => {
  const styleFnRef = useRef(styleFn);
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [style, setStyle] = useState<CSSProperties | undefined>();
  const lastValueRef = useRef<number | null>(null);
  const yOffsetRef = useRef(0);

  const rootStyleRef = useRef<CSSProperties>({});
  useEffect(() => {
    if (!target) return;
    const { width, height } = target.getBoundingClientRect();
    rootStyleRef.current = { width, height };
  }, [target]);

  const { value } = useScrollRegress({ target: root, ...options, progress });
  useEffect(() => {
    if (root === null) return;

    const _style =
      lastValueRef.current !== null
        ? styleFnRef.current(lastValueRef.current)
        : {};

    if (value !== null) {
      console.log(value);
      const { left } = root.getBoundingClientRect();
      _style.position = "fixed";
      _style.left = left;
      _style.top =
        options.margins instanceof Array
          ? options.margins[0]
          : options.margins ?? 0;
    }

    if (value === null && progress && lastValueRef.current === 1) {
      const [mt, r, mb] = resolveRanges({ ...options, target: root });
      _style.translate = `0 ${r + mt + mb}px`;
      _style.position = "relative";
    }
    console.log(
      _style,
      value,
      root.getBoundingClientRect().bottom,
      target?.getBoundingClientRect().bottom
    );
    setStyle(_style);

    if (value !== null) lastValueRef.current = value;
  }, [value, root]);

  return (
    <div ref={setRoot} style={rootStyleRef.current}>
      <div ref={setTarget} className={className} style={style}>
        {children}
      </div>
    </div>
  );
};

export const VerticallyAdjustedTransition = () => {
  return (
    <div>
      <div className="h-[100vh] border"></div>
      <pre className="fixed inset-x-0 top-16 m-8 p-4 border rounded"></pre>
      <section className="grid grid-rows-[1fr_auto] justify-items-center h-[200vh] w-full border">
        <div></div>
        <ScrollReveal
          margins={["20vh", 400]}
          styleFn={(p) => ({
            translate: `${-700 * p}px`,
            // rotate: `${-360 * p}deg`,
          })}
        >
          <div className="w-80 h-80 mx-auto border rounded bg-orange-200"></div>
        </ScrollReveal>
      </section>
      <section className="grid justify-items-center h-[200vh] w-full border">
        <ScrollReveal
          className="transition duration-75"
          margins={["30vh"]}
          range={500}
          progress
          styleFn={(p) => ({
            scale: `${1 + 0.5 * p}`,
            rotate: `${p > 0.5 ? 10 * (p - 0.5) : 0}deg`,
            // translate: `${-700 * p}px`,
            // rotate: `${-360 * p}deg`,
          })}
        >
          <div className="w-80 h-80 mx-auto border rounded bg-orange-200"></div>
        </ScrollReveal>
      </section>
      <div className="h-[100vh] border"></div>
    </div>
  );
};
