#react #component #LightBox #draft #snippet #headlessui #tailwind 

```
  images
  thumbnails?: string[]
  defaultIndex
  index
  onChange
  transtions: slide, fade

  ## passing items
  as children: ReactElement[]
  items: url[] | 

  ## subcomponents
  indicators: dots/thumbnails   // styleable with classes
  next/prev buttons   // styleable
  actions (current_item) => list of icon buttons
  
  ## customization
  transition 
  hide controls after delay
  autoslide
```


```tsx
import { Tab, Transition } from "@headlessui/react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { ReactNode, useState } from "react";

type CommonProps = {
  className?: string;
  defaultIndex?: number;
  transition?: TransitionProps | "fade" | "slide";
};

type PropsWithImages = {
  images: StaticImageData[];
  children?: undefined;
};

type PropsWithChildren = {
  children: ReactNode | ReactNode[];
  images?: undefined;
};

type Props = (PropsWithChildren | PropsWithImages) & CommonProps;

type TransitionProp =
  | string
  | ((indices: { index: number; prevIndex: number }) => string);

interface TransitionProps extends Record<string, any> {
  enter?: TransitionProp;
  enterFrom?: TransitionProp;
  enterTo?: TransitionProp;
  leave?: TransitionProp;
  leaveFrom?: TransitionProp;
  leaveTo?: TransitionProp;
}

const slideTransition: TransitionProps = {
  enter: "transition duration-300",
  enterFrom: ({ index, prevIndex }) =>
    `${index > prevIndex ? "" : "-"}translate-x-full opacity-0`,
  enterTo: "translate-x-0 opacity-100",
  leave: "transition duration-300",
  leaveTo: ({ index, prevIndex }) =>
    `${index < prevIndex ? "" : "-"}translate-x-full opacity-0`,
};

const fadeTransition: TransitionProps = {
  enter: "transition duration-300",
  enterFrom: "opacity-0 ease-in",
  enterTo: "opacity-100",
  leave: "transition duration-300",
  leaveTo: "opacity-0 ease-out",
};

const resolveTransitionProps = (
  props: TransitionProps,
  indices: {
    index: number;
    prevIndex: number;
  }
) => {
  return Object.keys(props).reduce((res, key) => {
    res[key] =
      props[key] instanceof Function
        ? props[key](indices)
        : (props[key] as string);
    return res;
  }, {} as Record<string, any>);
};

const classNames = (...classes: (string | undefined)[]) =>
  classes
    .filter(Boolean)
    .flatMap((s) => s!.split(/ +/))
    .join(" ");

export default function Lightbox({
  className,  // pass styles for root element
  images,     // set slides as array of next.Image
  children,   // or as any valid React element
  defaultIndex = 0,
  transition = "slide", // pass props for Transition
}: Props) {
  // need this for slide transitions
  const [lastIndices, setLastIndices] = useState({ index: 0, prevIndex: -1 });
  const isImages = !!images;

  const slides = isImages
    ? images
    : children instanceof Array
    ? children
    : [children];

  const _transition =
    transition === "fade"
      ? fadeTransition
      : transition === "slide"
      ? slideTransition
      : transition ?? {};

  return (
    <Tab.Group
      as="div"
      className={classNames(
        "relative w-[640px] h-[480px] mt-8 mx-auto",
        className
      )}
      defaultIndex={defaultIndex}
    >
      <Tab.Panels className="relative w-full h-full overflow-hidden">
        {({ selectedIndex }) => {
          return (
            <>
              {slides.map((slide, index) => (
                <Tab.Panel
                  key={index}
                  className="absolute inset-0 w-full h-full"
                  static
                >
                  <Transition
                    key={index}
                    show={index === selectedIndex}
                    appear={false}
                    className="w-full h-full"
                    {...resolveTransitionProps(_transition, lastIndices)}
                  >
                    {isImages ? (
                      <Image
                        src={slide as StaticImageData}
                        alt="image"
                        className="object-cover object-center w-auto h-full"
                      />
                    ) : (
                      (slide as ReactNode)
                    )}
                  </Transition>
                </Tab.Panel>
              ))}
            </>
          );
        }}
      </Tab.Panels>

      <Tab.List
        className={`absolute inset-x-0 bottom-0 
        flex justify-center p-4 gap-4 `}
      >
        {slides.map((_, index) => (
          <Tab
            key={index}
            className={`w-3 h-3 bg-gray-300 rounded-full
       bg-opacity-90 ui-selected:bg-white focus:outline-gray-500
       shadow-[0_0_4px_gray]`}
            onFocus={() =>
              setLastIndices((indices) => ({
                index,
                prevIndex: indices.index,
              }))
            }
          />
        ))}
      </Tab.List>
    </Tab.Group>
  );
}
```