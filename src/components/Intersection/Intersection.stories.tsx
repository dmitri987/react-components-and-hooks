import { ComponentMeta } from "@storybook/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Describe } from "../../components/Testing/Describe";
import "../../index.css";
import {
  getIntersectionObserver,
  OnIntersectCallback,
  ReactiveIntersectionObserver,
  resolveRootMargin,
} from "../../libs/reactive-intersection-observer";
import { useIntersection, useIntersectionObserver } from "./Intersection";

export default {
  title: "components/Intersection",
  // component: Button,
  parameters: {
    layout: "padded",
  },
} as ComponentMeta<any>;

/*
 * Component for rendering test results.
 *
 * Usage:
 *
 *   <Describe title="Test suite title">{[
 *     [
 *       `should do that and that`, // description
 *       foo === 42                 // result
 *     ],
 *     [
 *       `result can be also number or string`,
 *       42
 *     ],
 *     [
 *       `or can be no result`
 *     ]
 *   ]}
 *  </Describe>
 */

// const shouldThrow = (fn: Function) => {
//   try {
//     fn();
//   } catch (err) {
//     return true;
//   }
//   return false;
// };

export const Tests = () => {
  const [container, setContainer] = useState<Element | null>(null);
  const containerRef = useRef<Element | null>(null);
  const container1Ref = useRef(null);

  // const [root, setRoot] = useState<Element | Document | null>(null);
  // const [rootMargin, setRootMargin] = useState<string>("");
  // const [threshold, setThreshold] = useState<number | number[]>(0);

  // useEffect(() => {
  //   setTimeout(() => setRoot(document), 50);
  //   setTimeout(() => setRootMargin("200px"), 100);
  //   setTimeout(() => setThreshold([0.5, 1]), 150);
  // }, []);

  useEffect(() => {
    containerRef.current = container;
  }, [container]);

  const observer1 = useIntersectionObserver();
  const observer2 = useIntersectionObserver({ rootMargin: "100px" });
  const observer3 = useIntersectionObserver({ rootMargin: "100px 100px" });

  const targetRef4 = useRef(null);
  const observer4 = useIntersectionObserver({ root: targetRef4 });

  const [target5, setTarget5] = useState<HTMLDivElement | null>(null);
  const observer5 = useIntersectionObserver({ root: target5 });

  const observer6 = useIntersectionObserver({ rootMargin: "100px" });

  const result7 = useIntersection();
  const result8 = useIntersection();
  const result9 = useIntersection();

  const targetRef10 = useRef(null);
  const result10 = useIntersection({ target: targetRef10 });

  const [target11, setTarget11] = useState<HTMLDivElement | null>(null);
  const result11 = useIntersection({ target: target11 });

  const [counter12, setCounter12] = useState(0);
  const result12 = useIntersection({
    onIntersect: () => setCounter12((c) => c + 1),
  });

  const [target13, setTarget13] = useState<HTMLDivElement | null>(null);
  const [result13, setResult13] = useState("");
  useIntersection({ target: target13, onIntersect: () => setResult13("A") });
  useIntersection({ target: target13, onIntersect: () => setResult13("B") });

  const [target14, setTarget14] = useState<HTMLDivElement | null>(null);
  const [result14, setResult14] = useState("");
  const [onIntersect, setOnIntersect] =
    useState<OnIntersectCallback | null>(null);
  const onIntersectB = useCallback(() => setResult14("B"), []);
  const onIntersectA = useCallback(() => setResult14("A"), []);

  useIntersection({
    target: target14,
    onIntersect: onIntersect ?? onIntersectA,
  });

  useEffect(() => {
    setTimeout(() => setOnIntersect(() => onIntersectB), 0);
  }, []);

  const [target15, setTarget15] = useState<HTMLDivElement | null>(null);
  const result15 = useIntersection({ target: target15 });

  const [target16, setTarget16] = useState<HTMLDivElement | null>(null);
  const [toObserve16, setToObserve16] = useState(true);
  const result16 = useIntersection({ target: toObserve16 && target16 });

  useEffect(() => {
    setTimeout(() => setToObserve16(false), 30);
  }, []);

  const [target17, setTarget17] = useState<HTMLDivElement | null>(null);
  const [target18, setTarget18] = useState<HTMLDivElement | null>(null);
  const [curTarget17, setCurTarget17] = useState<HTMLDivElement | null>(null);
  const result17 = useIntersection({ target: curTarget17 ?? target17 });

  useEffect(() => {
    setTimeout(() => setCurTarget17(target18), 30);
  }, [target18]);

  // const container2Ref = useRef<HTMLDivElement | null>(null);
  // const [resultObservers2, setResultObservers2] = useState<
  //   ReactiveIntersectionObserver[]
  // >([]);
  // const [options2, setOptions2] = useState<ReactiveIntersectionObserverInit>(
  //   {}
  // );
  // useIntersection({
  //   target: container2Ref,
  //   onIntersect: (_, observer) => setResultObservers2((a) => [...a, observer]),
  // });
  // useEffect(() => {
  //   setTimeout(() => setOptions2({ rootMargin: "200px" }));
  //   setTimeout(() => setOptions2({ rootMargin: "400px" }), 10);
  // }, [40]);

  // const container3Ref = useRef<HTMLDivElement | null>(null);
  // const container4Ref = useRef<HTMLDivElement | null>(null);
  // const [curTarget, setCurTarget] = useState<Element | null>(null);
  // const [curResultTarget, setCurResultTarget] = useState<Element | null>(null);
  // useIntersection({
  //   target: curTarget ?? container3Ref,
  //   onIntersect: (e) => setCurResultTarget(e.target),
  // });
  // useEffect(() => {
  //   setTimeout(() => setCurTarget(container4Ref.current), 50);
  // }, []);

  return (
    <div className="w-full border" ref={setContainer}>
      <div id="container1" ref={container1Ref}></div>
      <div ref={targetRef4}></div>
      <div ref={setTarget5}></div>
      <div ref={result8.ref}></div>
      <div ref={targetRef10}></div>
      <div ref={setTarget11}></div>
      <div ref={result12.ref}></div>
      <div ref={setTarget13}></div>
      <div ref={setTarget14}></div>
      <div ref={setTarget15}></div>
      <div ref={setTarget16}></div>
      <div ref={setTarget17} id="target17"></div>
      <div ref={setTarget18} id="target18"></div>
      <Describe title="getIntersectionObserver(options?: IntersectionObserverInit): void">
        {[
          [
            `getIntersectionObserver() === getIntersectionObserver()`,
            getIntersectionObserver() === getIntersectionObserver(),
          ],
          [
            `getIntersectionObserver({}) === getIntersectionObserver()`,
            getIntersectionObserver({}) === getIntersectionObserver(),
          ],
          [
            `getIntersectionObserver({ rootMargin: " 0px" }) === getIntersectionObserver()`,
            getIntersectionObserver({ rootMargin: " 0px" }) ===
              getIntersectionObserver(),
          ],
          [
            `getIntersectionObserver({ rootMargin: "" }) === getIntersectionObserver()`,
            getIntersectionObserver({ rootMargin: "" }) ===
              getIntersectionObserver(),
          ],
          [
            `getIntersectionObserver({ rootMargin: " .0px" }) === getIntersectionObserver()`,
            getIntersectionObserver({ rootMargin: " .0px" }) ===
              getIntersectionObserver(),
          ],
          [
            `getIntersectionObserver({ rootMargin: "0.0px" }) === getIntersectionObserver()`,
            getIntersectionObserver({ rootMargin: "0.0px" }) ===
              getIntersectionObserver(),
          ],
          [
            `getIntersectionObserver({ rootMargin: "any malformed rootMargin" }) === getIntersectionObserver()`,
            getIntersectionObserver({
              rootMargin: "any malformed rootMargin",
            }) === getIntersectionObserver(),
          ],
          [
            `getIntersectionObserver({ rootMargin: "0.9px" }) === getIntersectionObserver()`,
            getIntersectionObserver({ rootMargin: "0.9px" }) ===
              getIntersectionObserver(),
          ],
          [
            `getIntersectionObserver({ rootMargin: "-1.9px" }) === getIntersectionObserver({ rootMargin: "-1px" })`,
            getIntersectionObserver({ rootMargin: "-1.9px" }) ===
              getIntersectionObserver({ rootMargin: "-1px" }),
          ],
          [
            `getIntersectionObserver({ rootMargin: "0px 0px " }) === getIntersectionObserver()`,
            getIntersectionObserver({ rootMargin: "0px 0px " }) ===
              getIntersectionObserver(),
          ],
          [
            `getIntersectionObserver({ rootMargin: "0px 0px  0px" }) === getIntersectionObserver()`,
            getIntersectionObserver({ rootMargin: "0px 0px  0px" }) ===
              getIntersectionObserver(),
          ],
          [
            `getIntersectionObserver({ rootMargin: "0px 0px 0px 0px" }) === getIntersectionObserver()`,
            getIntersectionObserver({ rootMargin: "0px 0px  0px 0px" }) ===
              getIntersectionObserver(),
          ],
          [
            `getIntersectionObserver({ rootMargin: "0% 0px 0px 0%" }) === getIntersectionObserver()`,
            getIntersectionObserver({ rootMargin: "0% 0px 0px 0%" }) ===
              getIntersectionObserver(),
          ],
          [
            `getIntersectionObserver({ rootMargin: "200px" }) !== getIntersectionObserver()`,
            getIntersectionObserver({ rootMargin: "200px" }) !==
              getIntersectionObserver(),
          ],
          [
            `getIntersectionObserver({ rootMargin: "200px" }) === getIntersectionObserver({ rootMargin: "200px" })`,
            getIntersectionObserver({ rootMargin: "200px" }) ===
              getIntersectionObserver({ rootMargin: "200px" }),
          ],
          [
            `getIntersectionObserver({ root: document }) === getIntersectionObserver()`,
            getIntersectionObserver({ root: document }) ===
              getIntersectionObserver(),
          ],
          [
            `getIntersectionObserver({ root: container }) !== getIntersectionObserver()`,
            getIntersectionObserver({ root: container }) !==
              getIntersectionObserver(),
          ],
          [
            `getIntersectionObserver({ root: fooElement }) === getIntersectionObserver({ root: fooRef })`,
            getIntersectionObserver({ root: container }) ===
              getIntersectionObserver({ root: containerRef }),
          ],
          [
            `getIntersectionObserver({ root: container }) === getIntersectionObserver({ root: container })`,
            getIntersectionObserver({ root: container }) ===
              getIntersectionObserver({ root: container }),
          ],
          [
            `getIntersectionObserver({ threshold: 0 }) === getIntersectionObserver()`,
            getIntersectionObserver({ threshold: 0 }) ===
              getIntersectionObserver(),
          ],
          [
            `getIntersectionObserver({ threshold: [0] }) === getIntersectionObserver()`,
            getIntersectionObserver({ threshold: [0] }) ===
              getIntersectionObserver(),
          ],
          [
            `getIntersectionObserver({ threshold: [] }) === getIntersectionObserver()`,
            getIntersectionObserver({ threshold: [] }) ===
              getIntersectionObserver(),
          ],
        ]}
      </Describe>
      <Describe title="useIntersectionObserver(options?): ReactiveResizeObserver">
        {[
          [
            `useIntersectionObserver() === getIntersectionObserver()`,
            observer1 === getIntersectionObserver(),
          ],
          [
            `useIntersectionObserver({ rootMargin: '100px' }) === useIntersectionObserver({ rootMargin: '100px 100px' })`,
            observer2 === observer3,
          ],
          [
            `useIntersectionObserver({ root: rootRef }).root === rootRef.current`,
            observer4?.root === targetRef4.current,
          ],
          [
            `useIntersectionObserver({ root: rootElem }).root === rootElem`,
            observer5?.root === target5,
          ],
          [
            `useIntersectionObserver({ rootMargin: '100px' }).rootMargin === '100px 100px 100px 100px'`,
            observer6?.rootMargin === "100px 100px 100px 100px",
          ],
        ]}
      </Describe>

      <Describe title="useIntersection(options): { ref?, entry, observer }">
        {[
          [
            `useIntersection() should return { ref: (instance: Element) => void }`,
            result7?.ref instanceof Function && result7?.ref.length == 1,
          ],
          [
            `const { ref, entry } = useIntersection() should return null 'entry' if 'ref' isn't bound to a target element`,
            result7?.entry === null,
          ],
          [
            `const { ref, entry } = useIntersection() should return non-null 'entry' if 'ref' is bound to a target element`,
            result8?.entry !== null && result8?.entry.target instanceof Element,
          ],
          [
            `const { observer } = useIntersection(); observer === getIntersectionObserver()`,
            result9?.observer === getIntersectionObserver(),
          ],
          [
            `useIntersection({ target: elem }) should not return { ref }`,
            result10?.ref === undefined,
          ],
          [
            `const { entry } = useIntersection({ target: elem }); entry.target === elem`,
            !!result11?.entry && result11?.entry.target === target11,
          ],
          [
            `useIntersection({ onIntersect: () => ... }) should call onIntersect on every intersection`,
            counter12 > 0,
          ],
          [
            `useIntersection({ onIntersect: onIntersectA }); useIntersection({ onIntersect: onIntersectB }); should change onIntersect to onIntersectB`,
            result13 === "B",
          ],
          [
            `useIntersection({ onIntersect }) should remember 'onIntersect' on first call and it should not be dynamically changed`,
            result14 === "A",
          ],
          [
            `const { observer } = useIntersection({ target: elem }); observer.targets should contain 'elem'`,
            !!target15 && result15?.observer?.targets.includes(target15),
          ],
          [
            `useIntersection({ target: false && element }) should unobserve target`,
            !!target16 && !result16.observer?.targets.includes(target16),
          ],
          [
            `useIntersection({ target }) 'target' should be dynamically changed`,
            !!target17 &&
              !!target18 &&
              !!result17.observer &&
              result17.observer?.targets.includes(target18) &&
              !result17.observer.targets.includes(target17) &&
              result17.entry?.target === target18,
          ],
        ]}
      </Describe>

      <Describe title="resolveRootMargin(rootMargin, options?)">
        {[
          [`resolveRootMargin() === '0px'`, resolveRootMargin() === "0px"],
          [
            `resolveRootMargin('100vh') === '100vh'`,
            resolveRootMargin("100vh") === "100vh",
          ],
          [
            `resolveRootMargin('100vh', { viewportUnitsToPixels: true }) === '{viewport_height_in_px}px'`,
            resolveRootMargin("100vh", { viewportUnitsToPixels: true }) ===
              window.innerHeight + "px",
          ],
          [
            `resolveRootMargin('-10vh', { viewportUnitsToPixels: true }) === '-{viewport_height_in_px/10}px'`,
            resolveRootMargin("-10vh", { viewportUnitsToPixels: true }) ===
              "-" + window.innerHeight / 10 + "px",
          ],
          [
            `resolveRootMargin('0vh', { viewportUnitsToPixels: true }) === '0px'`,
            resolveRootMargin("0vh", { viewportUnitsToPixels: true }) === "0px",
          ],
          [
            `resolveRootMargin('50.5vh', { viewportUnitsToPixels: true }) === '{0.505*viewport_height}px'`,
            resolveRootMargin("50.5vh", { viewportUnitsToPixels: true }) ===
              (50.5 * window.innerHeight) / 100 + "px",
          ],
          [
            `resolveRootMargin('100vw', { viewportUnitsToPixels: true }) === '{viewport_width_in_px}px'`,
            resolveRootMargin("100vw", { viewportUnitsToPixels: true }) ===
              window.innerWidth + "px",
          ],
          [
            `resolveRootMargin('-10vw', { viewportUnitsToPixels: true }) === '-{viewport_width_in_px/10}px'`,
            resolveRootMargin("-10vw", { viewportUnitsToPixels: true }) ===
              "-" + window.innerWidth / 10 + "px",
          ],
          [
            `resolveRootMargin('0vw', { viewportUnitsToPixels: true }) === '0px'`,
            resolveRootMargin("0vw", { viewportUnitsToPixels: true }) === "0px",
          ],
          [
            `resolveRootMargin('50.5vw', { viewportUnitsToPixels: true }) === '{0.505*viewport_width}px'`,
            resolveRootMargin("50.5vw", { viewportUnitsToPixels: true }) ===
              (50.5 * window.innerWidth) / 100 + "px",
          ],
          [
            `resolveRootMargin('100vh 100vw', { viewportUnitsToPixels: true }) === '{viewport_height}px {viewport_width}px'`,
            resolveRootMargin("100vh 100vw", {
              viewportUnitsToPixels: true,
            }) ===
              window.innerHeight + "px " + window.innerWidth + "px",
          ],
          [
            `resolveRootMargin('10px 10px   10px 10px') === '10px 10px 10px 10px'`,
            resolveRootMargin("10px 10px   10px 10px") ===
              "10px 10px 10px 10px",
          ],
          [
            `resolveRootMargin('10px 10px   10px 10px', { simplify: true }) === '10px'`,
            resolveRootMargin("10px 10px   10px 10px", { simplify: true }) ===
              "10px",
          ],
          [
            `resolveRootMargin('10px 10% 10px 10%', { simplify: true }) === '10px 10%'`,
            resolveRootMargin("10px 10% 10px 10%", { simplify: true }) ===
              "10px 10%",
          ],
          [
            `resolveRootMargin('10px 10% 10px', { simplify: true }) === '10px 10%'`,
            resolveRootMargin("10px 10% 10px", { simplify: true }) ===
              "10px 10%",
          ],
          [
            `resolveRootMargin('10px 10%', { simplify: true }) === '10px 10%'`,
            resolveRootMargin("10px 10%", { simplify: true }) === "10px 10%",
          ],
          [
            `resolveRootMargin('10px 10px', { simplify: true }) === '10px'`,
            resolveRootMargin("10px 10px", { simplify: true }) === "10px",
          ],
          [
            `resolveRootMargin('10.9px', { simplify: true }) === '10px'`,
            resolveRootMargin("10.9px", { simplify: true }) === "10px",
          ],
          [
            `resolveRootMargin('-0.9px', { simplify: true }) === '0px'`,
            resolveRootMargin("-0.9px", { simplify: true }) === "0px",
          ],
          [
            `resolveRootMargin('-0.9%', { simplify: true }) === '0px'`,
            resolveRootMargin("-0.9%", { simplify: true }) === "0px",
          ],
          [
            `resolveRootMargin('50.5vh', { viewportUnitsToPixels: true, simplify: true }) === '{0.505*viewport_height_in_px_without_decimal_part}px'`,
            resolveRootMargin("50.5vh", {
              viewportUnitsToPixels: true,
              simplify: true,
            }) ===
              (0.505 * window.innerHeight).toString().replace(/\..*$/, "") +
                "px",
          ],
        ]}
      </Describe>
    </div>
  );
};

export const UseIntersection = () => {
  const [targetA, setTargetA] = useState<Element | null>(null);
  const [targetB, setTargetB] = useState<Element | null>(null);
  const [target, setTarget] = useState<Element | null>(null);
  const [observer, setObserver] =
    useState<ReactiveIntersectionObserver | null>(null);

  useEffect(() => {
    if (targetA) setTarget(targetA);
  }, [targetA]);

  const onIntersect = useCallback(
    (
      entry: IntersectionObserverEntry,
      observer: ReactiveIntersectionObserver
    ) => {
      if (!entry) return;

      entry.target.textContent = entry.intersectionRatio.toString();
      setObserver(observer);
    },
    []
  );

  useIntersection({
    target,
    onIntersect,
    rootMargin: '0px',
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
  });

  return (
    <div className="w-full border">
      <button
        className="border rounded p-2"
        onClick={() => {
          setTarget((target) => (target === targetA ? targetB : targetA));
        }}
      >
        Toggle targets
      </button>
      {observer ? (
        <pre className="font-mono p-4 min-h-[90vh] text-blue-600">
          {JSON.stringify(
            {
              rootMargin: observer.rootMargin,
              thresholds: observer.thresholds,
            },
            null,
            2
          )}
        </pre>
      ) : (
        <div className="h-[80vh]"></div>
      )}
      <div className="flex h-[80vh] w-full gap-4">
        <div ref={setTargetA} className="w-full h-full border rounded">
        </div>
        <div ref={setTargetB} className="w-full h-[50%] border rounded">
        </div>
      </div>
    </div>
  );
};
