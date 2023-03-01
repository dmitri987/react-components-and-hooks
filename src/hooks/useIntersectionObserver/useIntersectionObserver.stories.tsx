import { ComponentMeta } from "@storybook/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Describe } from "../../components/Testing/Describe";
import "../../index.css";
import getIntersectionObserver, {OnIntersectCallback, ReactiveIntersectionObserver, ReactiveIntersectionObserverInit} from "../../libs/reactive-intersection-observer";
import useIntersectionObserver from "./useIntersectionObserver";

export default {
  title: "hooks/useIntersectionObserver",
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


export const Tests = () => {
  const [container, setContainer] = useState<Element | null>(null);
  const containerRef = useRef<Element | null>(null);
  const container1Ref = useRef(null);

  const [root, setRoot] = useState<Element | Document | null>(null);
  const [rootMargin, setRootMargin] = useState<string>("");
  const [threshold, setThreshold] = useState<number | number[]>(0);

  useEffect(() => {
    setTimeout(() => setRoot(document), 50);
    setTimeout(() => setRootMargin("200px"), 100);
    setTimeout(() => setThreshold([0.5, 1]), 150);
  }, []);

  useEffect(() => {
    containerRef.current = container;
  }, [container]);

  const empty = useIntersectionObserver(container, () => {});

  const [onIntersect, setOnIntersect] =
    useState<OnIntersectCallback | null>(null);
  const [onIntersectResult, setOnIntersectResult] = useState("");
  const onIntersectB = useCallback(() => setOnIntersectResult("B"), []);
  const onIntersectA = useCallback(() => setOnIntersectResult("A"), []);

  useIntersectionObserver(container, onIntersect ?? onIntersectA);
  useEffect(() => {
    setTimeout(() => setOnIntersect(() => onIntersectB), 0);
  }, []);

  const [result1, setResult1] = useState("");
  useIntersectionObserver(container1Ref, () => setResult1("A"));
  useIntersectionObserver(container1Ref, () => setResult1("B"));

  const container2Ref = useRef<HTMLDivElement | null>(null);
  const [resultObservers2, setResultObservers2] = useState<
    ReactiveIntersectionObserver[]
  >([]);
  const [options2, setOptions2] = useState<ReactiveIntersectionObserverInit>(
    {}
  );
  useIntersectionObserver(
    container2Ref,
    (_, observer) => setResultObservers2((a) => [...a, observer]),
    options2
  );
  useEffect(() => {
    setTimeout(() => setOptions2({ rootMargin: "200px" }));
    setTimeout(() => setOptions2({ rootMargin: "400px" }), 10);
  }, [40]);

  const container3Ref = useRef<HTMLDivElement | null>(null);
  const container4Ref = useRef<HTMLDivElement | null>(null);
  const [curTarget, setCurTarget] = useState<Element | null>(null);
  const [curResultTarget, setCurResultTarget] = useState<Element | null>(null);
  useIntersectionObserver(curTarget ?? container3Ref, (e) =>
    setCurResultTarget(e.target)
  );
  useEffect(() => {
    setTimeout(() => setCurTarget(container4Ref.current), 50);
  }, []);

  return (
    <div className="w-full border" ref={setContainer}>
      <div id="container1" ref={container1Ref}></div>
      <div id="container2" ref={container2Ref}></div>
      <div id="container3" ref={container3Ref}></div>
      <div id="container4" ref={container4Ref}></div>
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
      <Describe title="useIntersectionObserver(target, onIntersect, options?): void">
        {[
          [`should return void`, empty === undefined],
          [
            `should ignore further changes of 'onIntersect' once it's set`,
            onIntersectResult === "A",
          ],
          [
            `useIntersectionObserver(target, onIntersect1); useIntersectionObserver(target, onIntersect2); should subscribe 'target' with 'onIntersect2'`,
            result1 === "B",
          ],
          [
            `should not recreate observer if 'options' is changed`,
            resultObservers2.length === 1 ||
              resultObservers2.length === 2 && resultObservers2[0] === resultObservers2[1],
          ],
          [
            `should dynamically switch targets`,
            curResultTarget === container4Ref.current
            && curResultTarget !== container3Ref.current
          ],
        ]}
      </Describe>
    </div>
  );
};

export const UseIntersectionObserver = () => {
  const [targetA, setTargetA] = useState<Element | null>(null);
  const [targetB, setTargetB] = useState<Element | null>(null);
  const [intersectionRatioA, setIntersectionRatioA] = useState<number>(0);
  const [intersectionRatioB, setIntersectionRatioB] = useState<number>(0);
  const [target, setTarget] = useState<Element | null>(null);
  const [container, setContainer] = useState<Element | null>(null);
  const [rootMargin, setRootMargin] = useState("0px");
  const [observer, setObserver] =
    useState<ReactiveIntersectionObserver | null>(null);

  useEffect(() => {
    if (targetA) setTarget(targetA);
  }, [targetA]);

  const onIntersectA = useCallback(
    (
      entry: IntersectionObserverEntry,
      observer: ReactiveIntersectionObserver
    ) => {
      if (!entry) return;

      entry.target.textContent =
        "onIntersectA: " + entry.intersectionRatio.toString();
      setObserver(observer);
    },
    []
  );

  const [onIntersect, setOnIntersect] =
    useState<OnIntersectCallback | null>(null);

  useIntersectionObserver(target, onIntersect ?? onIntersectA, {
    rootMargin,
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
  });

  return (
    <div className="w-full border" ref={setContainer}>
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
          A: {intersectionRatioA}
        </div>
        <div ref={setTargetB} className="w-full h-[50%] border rounded">
          B: {intersectionRatioB}
        </div>
      </div>
    </div>
  );
};
