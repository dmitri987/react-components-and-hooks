import { ComponentMeta } from "@storybook/react";
import { useEffect, useRef, useState } from "react";
import "../../index.css";
import Image from "./Image";
import { isEqual } from "lodash-es";
import { Describe, Result } from "../Testing/Describe";

export default {
  title: "components/Image",
  component: Image,
  parameters: {
    layout: "padded",
  },
} as ComponentMeta<typeof Image>;

const srcSets = [
  `../../../public/images/zunnoon-ahmed-n_Cx3Rhp4I8-unsplash_640.jpg 640w,
../../../public/images/zunnoon-ahmed-n_Cx3Rhp4I8-unsplash_1024.jpg 1024w,
../../../public/images/zunnoon-ahmed-n_Cx3Rhp4I8-unsplash_1280.jpg 2x 1280w,
../../../public/images/zunnoon-ahmed-n_Cx3Rhp4I8-unsplash_2400.webp 2400w`,

  `../../../public/images/maeva-vigier-90a6S2LEEEc-unsplash_640.webp 640w,
../../../public/images/maeva-vigier-90a6S2LEEEc-unsplash_2400.webp 2400w`,

  `../../../public/images/big-entrance-little-alley-1255615_1456.jpg 800w `,
];

const SrcSet = (props: {
  index: number;
  imageElement: HTMLImageElement | null;
}) => {
  if (props.index === 0)
    return (
      <>
        {`"/images/zunnoon-ahmed-n_Cx3Rhp4I8-unsplash_640.jpg 640w,
/images/zunnoon-ahmed-n_Cx3Rhp4I8-unsplash_1024.jpg 1024w,
/images/zunnoon-ahmed-n_Cx3Rhp4I8-unsplash_1280.jpg 2x 1280w,
                     `}
        <span className="text-red-600">should ignore malformed sources ^</span>
        <Result
          result={isEqual(
            JSON.parse(props.imageElement?.dataset.srcsetBreakpoints ?? "[]"),
            [640, 1024, 2400]
          )}
        />
        {`
/images/zunnoon-ahmed-n_Cx3Rhp4I8-unsplash_2400.webp 2400w" `}
      </>
    );

  return <>{srcSets[props.index]}</>;
};

export const SrcSetWithResizeTracking = () => {
  const [imageElement, setImageElement] =
    useState<HTMLImageElement | null>(null);
  const [width, setWidth] = useState(500);
  const [sizes, setSizes] = useState("");
  const [currentSrc, setCurrentSrc] = useState("");
  const [isObservingResize, setIsObservingResize] = useState(false);
  const [srcSetIndex, setSrcSetIndex] = useState(0);

  return (
    <div className="border p-2 rounded h-auto w-full">
      <input
        type="range"
        min="0"
        max="1700"
        value={width}
        onChange={(e) => {
          setWidth(+e.target.value);
        }}
      />
      <pre className="font-mono italic">
        For this to work disable caching in `Developer Tools`
      </pre>
      <pre className="font-mono">
        <span className="text-blue-600">Width:</span> {width};
      </pre>
      <pre className="font-mono">
        <span className="text-blue-600 italic">sizes:</span> {sizes}
      </pre>
      <pre className="font-mono">
        <span className="text-blue-600 italic">currentSrc:</span> {currentSrc}
      </pre>
      <pre className="font-mono my-2">
        {`                                      `}
        <span className="text-red-600">
          should not scale down resolution on shrinking ^
        </span>
      </pre>
      <pre className="font-mono mt-2">
        <span className="text-blue-600 italic">srcSet:</span>
        {`
`}
        <SrcSet index={srcSetIndex} imageElement={imageElement} />
      </pre>

      <pre className="font-mono my-4">
        <span className="text-red-600">
          should stop observing resize when loaded the highest resolution:{" "}
        </span>
      </pre>

      <pre className="font-mono my-4">
        <span className="text-blue-600">ResizeOberver state: </span>
        {isObservingResize ? "observing" : "stopped"}
      </pre>

      <pre className="font-mono my-4 text-red-600">
        <span className="text-red-600">
          When `srcSet` is externally changed should restart observing with new
          srcSet sizes
        </span>
        <button
          className="border rounded border-red-600  p-2 mx-4"
          onClick={() => setSrcSetIndex((i) => (i !== 1 ? 1 : 0))}
        >
          Toggle `srcSet`
        </button>
      </pre>

      <pre className="font-mono my-4 text-red-600">
        <span className="text-red-600">
          If `srcSet` has only one valid source, should not observe
        </span>
        <button
          className="border rounded border-red-600  p-2 mx-4"
          onClick={() => setSrcSetIndex((i) => (i !== 2 ? 2 : 0))}
        >
          Toggle `srcSet`
        </button>
      </pre>

      <div style={{ width: width + "px" }}>
        <Image
          ref={setImageElement}
          className="w-full"
          srcSet={srcSets[srcSetIndex]}
          onLoad={(e) => {
            const img = e.target as HTMLImageElement;
            setSizes(img.sizes);
            setCurrentSrc(img.currentSrc);
          }}
          resizeOptions={{
            onResizeToggle: setIsObservingResize,
            onResize: (entry) => console.log("onResize", entry),
          }}
        />
      </div>
    </div>
  );
};

export const NativeLazyLoading = () => {
  const [loadedImageUrls, setLoadedImageUrls] = useState<string[]>([]);

  return (
    <div className="grid gap-4 w-[800px] border my-8 mx-auto">
      <div className="fixed top-8 left-8 border rounded shadow min-w-[50%] bg-white py-2 px-4">
        <h3 className="text-lg text-blue-600">Loaded Images:</h3>
        <ul>
          {loadedImageUrls.map((url) => (
            <li key={url} className="font-mono">
              {url}
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen w-full bg-yellow-100">1</div>
      <Image
        className="w-full"
        loading="lazy"
        height={1097}
        width={798}
        src="../../../public/images/big-entrance-little-alley-1255615_1456.jpg"
        onLoad={(e) =>
          setLoadedImageUrls((urls) => [
            ...urls,
            (e.target as HTMLImageElement).currentSrc,
          ])
        }
      />
      <Image
        className="w-full aspect-[0.667]"
        loading="lazy"
        src="../../../public/images/eberhard-grossgasteiger-NHdBgmlGGBQ-unsplash_2400.webp"
        onLoad={(e) =>
          setLoadedImageUrls((urls) => [
            ...urls,
            (e.target as HTMLImageElement).currentSrc,
          ])
        }
      />
      <Image
        className="w-full"
        loading="lazy"
        src="../../../public/images/farmers-are-walking-at-sunset-1639677_5089.jpg"
        onLoad={(e) =>
          setLoadedImageUrls((urls) => [
            ...urls,
            (e.target as HTMLImageElement).currentSrc,
          ])
        }
      />
    </div>
  );
};

export const LazyTrue = () => {
  const [loadedImageUrls, setLoadedImageUrls] = useState<string[]>([]);

  return (
    <div className="grid gap-4 w-[800px] border mx-auto">
      <pre className="font-mono my-4 text-red-600 px-4">
        <span className="text-blue-600">`lazy` or `lazy={`{true}`}`</span>{" "}
        should use native lazy loading (be equivalent to{" "}
        <span className="text-blue-600">loading="lazy"</span>)
      </pre>
      <div className="fixed top-20 left-8 border rounded shadow min-w-[50%] bg-white py-2 px-4">
        <h3 className="text-lg text-blue-600">Loaded Images:</h3>
        <ul>
          {loadedImageUrls.map((url) => (
            <li key={url} className="font-mono">
              {url}
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen w-full bg-yellow-100">1</div>
      <Image
        className="w-full"
        lazy
        height={1097}
        width={798}
        src="../../../public/images/big-entrance-little-alley-1255615_1456.jpg"
        onLoad={(e) =>
          setLoadedImageUrls((urls) => [
            ...urls,
            (e.target as HTMLImageElement).currentSrc,
          ])
        }
      />
      <Image
        className="w-full aspect-[0.667]"
        lazy
        src="../../../public/images/eberhard-grossgasteiger-NHdBgmlGGBQ-unsplash_2400.webp"
        onLoad={(e) =>
          setLoadedImageUrls((urls) => [
            ...urls,
            (e.target as HTMLImageElement).currentSrc,
          ])
        }
      />
      <Image
        className="w-full"
        lazy={true}
        src="../../../public/images/farmers-are-walking-at-sunset-1639677_5089.jpg"
        onLoad={(e) =>
          setLoadedImageUrls((urls) => [
            ...urls,
            (e.target as HTMLImageElement).currentSrc,
          ])
        }
      />
    </div>
  );
};

export const NativeLazyLoadingInContainer = () => {
  const [loadedImageUrls, setLoadedImageUrls] = useState<string[]>([]);

  return (
    <div className="grid gap-4 w-[800px] h-[66vh] overflow-auto border my-8 mx-auto">
      <span className="px-4 my-2 italic">
        <code className="font-mono text-blue-600">loading="lazy"</code> also
        works for <code className="font-mono text-blue-600">Element</code>{" "}
        container, but an image must have{" "}
        <code className="font-mono text-blue-600">height</code> defined
      </span>
      <div className="fixed top-40 left-8 border rounded shadow min-w-[50%] bg-white py-2 px-4">
        <h3 className="text-lg text-blue-600">Loaded Images:</h3>
        <ul>
          {loadedImageUrls.map((url) => (
            <li key={url} className="font-mono">
              {url}
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen w-full bg-yellow-100">1</div>
      <Image
        className="w-full"
        loading="lazy"
        height={1097}
        width={798}
        src="../../../public/images/big-entrance-little-alley-1255615_1456.jpg"
        onLoad={(e) =>
          setLoadedImageUrls((urls) => [
            ...urls,
            (e.target as HTMLImageElement).currentSrc,
          ])
        }
      />
      <Image
        className="w-full aspect-[0.667]"
        loading="lazy"
        src="../../../public/images/eberhard-grossgasteiger-NHdBgmlGGBQ-unsplash_2400.webp"
        onLoad={(e) =>
          setLoadedImageUrls((urls) => [
            ...urls,
            (e.target as HTMLImageElement).currentSrc,
          ])
        }
      />
      <Image
        className="w-full aspect-[1.2]"
        loading="lazy"
        src="../../../public/images/farmers-are-walking-at-sunset-1639677_5089.jpg"
        onLoad={(e) =>
          setLoadedImageUrls((urls) => [
            ...urls,
            (e.target as HTMLImageElement).currentSrc,
          ])
        }
      />
    </div>
  );
};

export const LazyIntersectionObserver = () => {
  const [loadedImageUrls, setLoadedImageUrls] = useState<string[]>([]);

  // useEffect(() => {
  //   const obs = new IntersectionObserver(() => {}, { rootMargin: "0px 200px" });
  //   console.log(obs);
  // }, []);

  return (
    <div className="grid gap-4 w-[800px] border mx-auto">
      <pre className="font-mono mt-4 px-4">
        {`<Image lazy={{}} />  
<Image lazy={{ rootMargin="200px 0px" }} />  
<Image lazy={{ rootMargin="100%" }} />  
        `}
      </pre>
      <div className="fixed top-40 left-8 border rounded shadow min-w-[50%] bg-white py-2 px-4">
        <h3 className="text-lg text-blue-600">Loaded Images:</h3>
        <ul>
          {loadedImageUrls.map((url) => (
            <li key={url} className="font-mono">
              {url}
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen w-full bg-yellow-100">1</div>
      <Image
        className="w-full"
        lazy={{}}
        height={1097}
        width={798}
        src="../../../public/images/big-entrance-little-alley-1255615_1456.jpg"
        onLoad={(e) =>
          setLoadedImageUrls((urls) => [
            ...urls,
            (e.target as HTMLImageElement).currentSrc,
          ])
        }
      />
      <Image
        className="w-full aspect-[0.667]"
        lazy={{ rootMargin: "200px 0px" }}
        src="../../../public/images/eberhard-grossgasteiger-NHdBgmlGGBQ-unsplash_2400.webp"
        onLoad={(e) =>
          setLoadedImageUrls((urls) => [
            ...urls,
            (e.target as HTMLImageElement).currentSrc,
          ])
        }
      />
      <Image
        className="w-full aspect-[1.5]"
        lazy={{ rootMargin: "100%" }}
        src="../../../public/images/farmers-are-walking-at-sunset-1639677_5089.jpg"
        onLoad={(e) =>
          setLoadedImageUrls((urls) => [
            ...urls,
            (e.target as HTMLImageElement).currentSrc,
          ])
        }
      />
    </div>
  );
};

export const LazyIntersectionObserverContainer = () => {
  const [loadedImageUrls, setLoadedImageUrls] = useState<string[]>([]);
  const [containerElement, setContainerElement] =
    useState<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   const obs = new IntersectionObserver(() => {}, { rootMargin: "0px 200px" });
  //   console.log(obs);
  // }, []);

  return (
    <div
      ref={setContainerElement}
      className="grid gap-4 w-[800px] border mx-auto h-[66vh] overflow-scroll"
    >
      <pre className="font-mono mt-4 px-4">
        {`<Image lazy={{ root: containerElement, rootMargin: "300px" }} />  
<Image lazy={{ root: containerElement, rootMargin="200px 0px" }} />  
<Image lazy={{ root: containerElement, rootMargin="100%" }} />  
        `}
      </pre>
      <div className="fixed top-40 left-8 border rounded shadow min-w-[50%] bg-white py-2 px-4">
        <h3 className="text-lg text-blue-600">Loaded Images:</h3>
        <ul>
          {loadedImageUrls.map((url) => (
            <li key={url} className="font-mono">
              {url}
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen w-full bg-yellow-100">1</div>
      <Image
        className="w-full"
        lazy={{ root: containerElement, rootMargin: "300px" }}
        height={1097}
        width={798}
        src="../../../public/images/big-entrance-little-alley-1255615_1456.jpg"
        onLoad={(e) =>
          setLoadedImageUrls((urls) => [
            ...urls,
            (e.target as HTMLImageElement).currentSrc,
          ])
        }
      />
      <Image
        className="w-full aspect-[0.667]"
        lazy={{ root: containerElement, rootMargin: "200px 0px" }}
        src="../../../public/images/eberhard-grossgasteiger-NHdBgmlGGBQ-unsplash_2400.webp"
        onLoad={(e) =>
          setLoadedImageUrls((urls) => [
            ...urls,
            (e.target as HTMLImageElement).currentSrc,
          ])
        }
      />
      <Image
        className="w-full aspect-[1.5]"
        lazy={{ root: containerElement, rootMargin: "100%" }}
        src="../../../public/images/farmers-are-walking-at-sunset-1639677_5089.jpg"
        onLoad={(e) =>
          setLoadedImageUrls((urls) => [
            ...urls,
            (e.target as HTMLImageElement).currentSrc,
          ])
        }
      />
    </div>
  );
};

export const NativeLazyAndResize = () => {
  const [loadedImageUrls, setLoadedImageUrls] = useState<string[]>([]);
  const [width, setWidth] = useState(500);

  return (
    <div
      style={{ width }}
      className="grid gap-4 border mx-auto h-[66vh] overflow-y-scroll"
    >
      <pre className="px-4 font-mono italic">
        For this to work disable caching in `Developer Tools`
      </pre>
      <pre className="font-mono mt-4 px-4 whitespace-pre-wrap">
        {`Image should peek right resolution for loading depending on container width
<Image 
  lazy
  srcSet="/images/zunnoon-ahmed-n_Cx3Rhp4I8-unsplash_640.jpg 640w,
          /images/zunnoon-ahmed-n_Cx3Rhp4I8-unsplash_1024.jpg 1024w,
          /images/zunnoon-ahmed-n_Cx3Rhp4I8-unsplash_2400.webp 2400w"
/>  
<Image 
  lazy
  srcSet="/images/maeva-vigier-90a6S2LEEEc-unsplash_640.webp 640w,
          /images/maeva-vigier-90a6S2LEEEc-unsplash_2400.webp 2400w"
/>
        `}
      </pre>
      <div className="fixed bottom-40 left-8 border rounded shadow min-w-[50%] bg-white py-2 px-4">
        <input
          type="range"
          min="400"
          max="1700"
          value={width}
          onChange={(e) => {
            setWidth(+e.target.value);
          }}
        />
        <pre className="font-mono">
          <span className="text-blue-600">Width:</span> {width}
        </pre>
        <h3 className="text-lg text-blue-600">Loaded Images:</h3>
        <ul>
          {loadedImageUrls.map((url) => (
            <li key={url} className="font-mono">
              {url}
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen w-full bg-yellow-100">1</div>
      <Image
        className="w-full aspect-[0.73]"
        lazy
        srcSet={srcSets[0]}
        onLoad={(e) =>
          setLoadedImageUrls((urls) => [
            ...urls,
            (e.target as HTMLImageElement).currentSrc,
          ])
        }
      />
      <Image
        className="w-full aspect-[0.667]"
        lazy
        srcSet={srcSets[1]}
        onLoad={(e) =>
          setLoadedImageUrls((urls) => [
            ...urls,
            (e.target as HTMLImageElement).currentSrc,
          ])
        }
      />
    </div>
  );
};

export const LazyOptionsAndResize = () => {
  const [loadedImageUrls, setLoadedImageUrls] = useState<string[]>([]);
  const [width, setWidth] = useState(500);
  const [containerElement, setContainerElement] =
    useState<HTMLDivElement | null>(null);

  return (
    <div
      ref={setContainerElement}
      style={{ width }}
      className="grid gap-4 border mx-auto h-[66vh] overflow-y-scroll"
    >
      <pre className="px-4 font-mono italic">
        For this to work disable caching in `Developer Tools`
      </pre>
      <pre className="font-mono mt-4 px-4 whitespace-pre-wrap">
        {`Image should peek right resolution for loading depending on container width
<Image 
  lazy={{ root: containerElement, rootMargin: '300px' }}
  srcSet="/images/zunnoon-ahmed-n_Cx3Rhp4I8-unsplash_640.jpg 640w,
          /images/zunnoon-ahmed-n_Cx3Rhp4I8-unsplash_1024.jpg 1024w,
          /images/zunnoon-ahmed-n_Cx3Rhp4I8-unsplash_2400.webp 2400w"
/>  
<Image 
  lazy={{ root: containerElement, rootMargin: '300px' }}
  srcSet="/images/maeva-vigier-90a6S2LEEEc-unsplash_640.webp 640w,
          /images/maeva-vigier-90a6S2LEEEc-unsplash_2400.webp 2400w"
/>
        `}
      </pre>
      <div className="fixed bottom-40 left-8 border rounded shadow min-w-[50%] bg-white py-2 px-4">
        <input
          type="range"
          min="400"
          max="1700"
          value={width}
          onChange={(e) => {
            setWidth(+e.target.value);
          }}
        />
        <pre className="font-mono">
          <span className="text-blue-600">Width:</span> {width}
        </pre>
        <h3 className="text-lg text-blue-600">Loaded Images:</h3>
        <ul>
          {loadedImageUrls.map((url) => (
            <li key={url} className="font-mono">
              {url}
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen w-full bg-yellow-100">1</div>
      <Image
        className="w-full aspect-[0.73]"
        lazy={{ root: containerElement, rootMargin: "300px" }}
        srcSet={srcSets[0]}
        onLoad={(e) =>
          setLoadedImageUrls((urls) => [
            ...urls,
            (e.target as HTMLImageElement).currentSrc,
          ])
        }
      />
      <Image
        className="w-full aspect-[0.667]"
        lazy={{ root: containerElement, rootMargin: "300px" }}
        srcSet={srcSets[1]}
        onLoad={(e) =>
          setLoadedImageUrls((urls) => [
            ...urls,
            (e.target as HTMLImageElement).currentSrc,
          ])
        }
      />
    </div>
  );
};

export const Tests = () => {
  const [, setUpdate] = useState(false);
  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);
  const [img2, setImg2] = useState<HTMLImageElement | null>(null);
  const [img3, setImg3] = useState<HTMLImageElement | null>(null);
  const [img4, setImg4] = useState<HTMLImageElement | null>(null);
  const [img5, setImg5] = useState<HTMLImageElement | null>(null);
  const [img6, setImg6] = useState<HTMLImageElement | null>(null);
  const [img7, setImg7] = useState<HTMLImageElement | null>(null);
  const [img8, setImg8] = useState<HTMLImageElement | null>(null);
  const [img9, setImg9] = useState<HTMLImageElement | null>(null);
  const [img10, setImg10] = useState<HTMLImageElement | null>(null);
  const [img11, setImg11] = useState<HTMLImageElement | null>(null);
  const [img12, setImg12] = useState<HTMLImageElement | null>(null);
  const [img13, setImg13] = useState<HTMLImageElement | null>(null);
  const [img14, setImg14] = useState<HTMLImageElement | null>(null);
  const [img15, setImg15] = useState<HTMLImageElement | null>(null);
  const [img16, setImg16] = useState<HTMLImageElement | null>(null);
  const [img17, setImg17] = useState<HTMLImageElement | null>(null);
  const [img18, setImg18] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    setTimeout(() => setUpdate((u) => !u), 100);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (img13) img13.style.width = "0px";
    }, 30);
  }, [img13]);

  useEffect(() => {
    if (img14) img14.style.width = "640px";
  }, [img14]);

  useEffect(() => {
    if (img15) img15.style.width = "481px";
  }, [img15]);

  const [observing16, setObserving16] = useState("");
  useEffect(() => {
    if (img16) img16.style.width = "481px";
  }, [img16]);

  const [observing17, setObserving17] = useState("");
  const [srcSet17, setSrcSet17] = useState("foo 240w, bar 480w");
  useEffect(() => {
    if (img17) img17.style.width = "481px";
    setTimeout(() => {
      setSrcSet17("baz 360w, abc 800w");
    }, 25);
  }, [img17]);

  // const ref = useRef<HTMLImageElement | null>(null);
  // console.log(ref)
  return (
    <div className="w-full border">
      <Image
        ref={setImg6}
        className="h-0"
        src="/some_picture"
        lazy={{
          onIntersect: () => setUpdate((u) => !u),
        }}
      />
      <Image
        ref={setImg7}
        className="h-0"
        srcSet="/some_picture2"
        lazy={{
          onIntersect: () => setTimeout(() => setUpdate((u) => !u), 50),
        }}
      />
      <Describe title="Image: general features">
        {[[`<Image ref={ref} /> should forward ref`, imgElement !== null]]}
      </Describe>
      <Describe title="Image: lazy loading (see useIntersectionObserver stories for more tests)">
        {[
          [
            `<Image lazy /> should set 'loading="lazy"'`,
            img2?.loading === "lazy",
          ],
          [
            `<Image lazy={false} loading="lazy" /> should set 'loading="lazy"'`,
            img3?.loading === "lazy",
          ],
          [
            `<Image lazy={{}} /> should keep 'src' equal to '' until intersection`,
            img4?.getAttribute("src") === "",
          ],
          [
            `<Image lazy={{}} /> should keep 'srcSet' equal to '' until intersection`,
            img5?.getAttribute("srcset") === "",
          ],
          [
            `<Image lazy={{}} /> should reset 'src' to actual value on intersection`,
            (img6?.getAttribute("src") ?? "").length > 0,
          ],
          [
            `<Image lazy={{}} /> should reset 'srcSet' to actual value on intersection`,
            (img7?.getAttribute("srcset") ?? "").length > 0,
          ],
        ]}
      </Describe>

      <Describe title="Image: resize">
        {[
          [
            `should not set 'sizes' for <Image srcSet="" />`,
            !!img8 && img8.sizes === "",
          ],
          [
            `should set 'sizes' to '{actual_width}px' for <Image srcSet="foo 480w" />`,
            img11 ? img11.sizes === "320px" : false,
          ],
          [
            `should not set 'sizes' if actual image width is 0`,
            img12 ? !Object.hasOwn(img12, "sizes") : false,
          ],
          [
            `should not scale down 'sizes' on image shrinking`,
            img13 ? img13.sizes === '320px' : false,
          ],
          [
            `should not change 'sizes' when width is <= next 'srcset' breakpoints`,
            img14
              ? img14.sizes === "320px" &&
                img14.dataset.srcsetBreakpoints === "[240, 640]"
              : false,
          ],
          [
            `should change 'sizes' when width > next 'srcset' breakpoints`,
            img15
              ? img15.sizes === "481px" &&
                img15.dataset.srcsetBreakpoints === "[240, 480, 640]"
              : false,
          ],
          [
            `should stop observing when reached the highest srcset breakpoint`,
            observing16 === "+-",
          ],
          [
            `should restart observing when switched to new srcSet`,
            observing17 === "+-+" && img17?.sizes === "481px",
          ],
          [
            `should set 'data-srcset-breakpoints' to '[480, 640]' for <Image srcSet="foo 640w, bar 480w" />`,
            img9
              ? img9.getAttribute("data-srcset-breakpoints") === "[480, 640]"
              : false,
          ],
          [
            `should ignore malformed sources in 'srcset': set 'data-srcset-breakpoints' to '[480]' for <Image srcSet="foo 2x 640w, bar 480w" />`,
            img10
              ? img10.getAttribute("data-srcset-breakpoints") === "[480]"
              : false,
          ],
        ]}
      </Describe>
      <Image ref={setImgElement} />
      <Image ref={setImg2} lazy />
      <Image ref={setImg3} lazy={false} loading="lazy" />
      <div className="h-screen"></div>
      <Image
        ref={setImg4}
        lazy={{}}
        src="../../../public/images/house_on_tree_1536.jpg"
      />
      <Image
        ref={setImg5}
        lazy={{}}
        srcSet="../../../public/images/house_on_tree_1536.jpg"
      />
      <Image ref={setImg8} srcSet="" />
      <Image
        ref={setImg9}
        srcSet="foo 640w, bar 480w"
        resizeOptions={{ breakpointsAttrName: "srcset-breakpoints" }}
      />
      <Image
        ref={setImg10}
        srcSet="foo 2x 640w, bar 480w"
        resizeOptions={{
          breakpointsAttrName: "srcset-breakpoints",
          onResize: () => console.log("onResize"),
        }}
      />
      <Image
        ref={setImg11}
        className="w-80"
        srcSet="../../../public/images/big-entrance-little-alley-1255615_1456.jpg 640w"
        resizeOptions={{
          breakpointsAttrName: "srcset-breakpoints",
        }}
      />
      <Image ref={setImg12} srcSet="" className="w-0" />
      <Image ref={setImg13} srcSet="idjf" className="w-80" />
      <Image
        ref={setImg14}
        srcSet="foo 240w, bar 640w"
        className="w-80"
        resizeOptions={{
          breakpointsAttrName: "srcset-breakpoints",
        }}
      />
      <Image
        ref={setImg15}
        srcSet="foo 240w, bar 480w, baz 640w"
        className="w-80"
        resizeOptions={{
          breakpointsAttrName: "srcset-breakpoints",
        }}
      />
      <Image
        ref={setImg16}
        srcSet="foo 240w, bar 480w"
        className="w-80"
        resizeOptions={{
          breakpointsAttrName: "srcset-breakpoints",
          onResizeToggle: (isObserving) =>
            setObserving16((obs) => obs + (isObserving ? "+" : "-")),
        }}
      />
      <Image
        ref={setImg17}
        srcSet={srcSet17}
        className="w-80"
        resizeOptions={{
          breakpointsAttrName: "srcset-breakpoints",
          onResizeToggle: (isObserving) =>
            setObserving17((obs) => obs + (isObserving ? "+" : "-")),
        }}
      />
    </div>
  );
};
