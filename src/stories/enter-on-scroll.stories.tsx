import { ComponentStory } from "@storybook/react";
import {
  ReactNode,
  RefObject,
  useCallback,
} from "react";
import {
  Intersection,
  IntersectionProvider,
} from "../components/Intersection/Intersection";
import {
  ReactiveIntersectionObserver,
} from "../libs/reactive-intersection-observer";
import { clss } from "../libs/utils";

export default {
  title: "Features/Scroll-based trigger",
  // argTypes: {
  //   enabled: {
  //     control: { type: "boolean" },
  //   },
  //   duration: {
  //     control: { type: "range", min: 200, max: 3000, step: 50 },
  //   },
  // },
};


type TransitionProps = {
  /* if true, unobserve intersection after first reveal */
  once?: boolean;
  from?: string;
  to?: string;
  root?: Element | RefObject<Element> | null;
  rootMargin?: string;
  className?: string;
  children: ReactNode;
};

const Reveal = ({
  once = true,
  from = "opacity-0",
  to = "opacity-1",
  root,
  rootMargin,
  className,
  children,
}: TransitionProps) => {
  const onIntersect = useCallback(
    (
      { target, isIntersecting }: IntersectionObserverEntry,
      observer: ReactiveIntersectionObserver
    ) => {
      target.className = clss(
        "transition",
        className,
        isIntersecting ? to : from
      );
      if (once && isIntersecting) observer.unobserve(target);
    },
    []
  );

  return (
    <Intersection
      className={clss("transition", className, from)}
      options={{ onIntersect, root, rootMargin }}
    >
      {children}
    </Intersection>
  );
};

export const AppearOnScroll: ComponentStory<any> = () => {
  return (
    <div className="relative grid justify-items-center gap-20 min-h-[200vh]">
      <hr className="fixed inset-x-0 top-[30vh] border-red-500 opacity-50 -z-[1]" />
      <hr className="fixed inset-x-0 bottom-[30vh] border-red-500 opacity-50 -z-[1]" />
      <h1>Scroll down to see how elements are revealed</h1>
      <div className="h-[50vh]"></div>
      <IntersectionProvider options={{ rootMargin: "-30vh 9999px" }}>
        <Reveal className="duration-1000">
          <div className="w-[400px] h-80 border rounded bg-red-200">
            <pre className="p-4 whitespace-pre-wrap">
              {`<Reveal className="duration-1000">
  ...
</Reveal>`}
            </pre>
          </div>
        </Reveal>
        <Reveal className="duration-1000" from="-translate-x-[100vw] opacity-0">
          <div className="w-[400px] h-80 border rounded bg-red-200">
            <pre className="p-4 whitespace-pre-wrap">
              {`<Reveal className="duration-1000" from="-translate-x-[100vw] opacity-0">
  ...
</Reveal>`}
            </pre>
          </div>
        </Reveal>

        <Reveal className="duration-1000" once={false}>
          <div className="w-[400px] h-80 border rounded bg-red-200">
            <pre className="p-4 whitespace-pre-wrap">
              {`
<Reveal className="duration-1000" once={false}>
  ...
</Reveal>`}
            </pre>
          </div>
        </Reveal>

        <Reveal className="duration-1000" once={false} rootMargin="-100px">
          <div className="w-[400px] h-80 border rounded bg-red-200">
            <pre className="p-4 whitespace-pre-wrap">
              {`
<Reveal className="duration-1000" once={false} rootMargin="-100px">
  ...
</Reveal>`}
            </pre>
          </div>
        </Reveal>

        <Reveal
          className="duration-1000"
          from="scale-0 opacity-0 -translate-y-[300px]"
        >
          <div className="w-[400px] h-80 border rounded bg-red-200">
            <pre className="p-4 whitespace-pre-wrap">
              {`<Reveal className="duration-1000 origin-top" from="scale-0 opacity-0">
  ...
</Reveal>`}
            </pre>
          </div>
        </Reveal>

        <Reveal className="duration-1000" from="rotate-180 scale-50 opacity-0">
          <div className="w-[400px] h-80 border rounded bg-red-200">
            <pre className="p-4 whitespace-pre-wrap">
              {`
<Reveal className="duration-1000" from="rotate-180 scale-50 opacity-0">
  ...
</Reveal>`}
            </pre>
          </div>
        </Reveal>

        <Reveal
          className="duration-1000"
          from="-translate-x-[50vw] opacity-0"
          to="translate-x-[20vw]"
        >
          <div className="w-[400px] h-80 border rounded bg-red-200">
            <pre className="p-4 whitespace-pre-wrap">
              {`
<Reveal className="duration-1000" from="-translate-x-[50vw] opacity-0" to="translate-x-[20vw]">
  ...
</Reveal>`}
            </pre>
          </div>
        </Reveal>
        <div className="h-[50vh]"></div>
      </IntersectionProvider>
    </div>
  );
};

AppearOnScroll.args = {
  duration: 1000,
};

AppearOnScroll.argTypes = {
  duration: {
    control: { type: "range", min: 200, max: 3000, step: 50 },
  },
};
