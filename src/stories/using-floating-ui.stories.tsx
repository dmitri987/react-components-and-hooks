import { useEffect, useRef, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { Menu, Popover, Transition } from "@headlessui/react";
import MuiMenu from "@mui/material/Menu";
import {
  flip,
  arrow,
  offset,
  useFloating,
  useTransitionStyles,
  useHover,
  useClick,
  useDismiss,
  useInteractions,
  useListNavigation,
  FloatingFocusManager,
  FloatingPortal,
  FloatingArrow,
} from "@floating-ui/react";
import MenuItem from "@mui/material/MenuItem";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { clss } from "../libs/utils";
// import {useFloating} from "@floating-ui/react";

export default {
  title: "Features/Using floating-ui for Popovers",
};

export const HeadlessUIPopover = () => {
  return (
    <div className="grid gap-8 p-8 w-full">
      <Popover>
        <div className="flex items-center">
          <Popover.Button className="p-2 rounded">
            <Bars3Icon className="w-6 h-6"></Bars3Icon>
          </Popover.Button>
          <span className="ml-4 italic font-mono">
            Using HeadlessUI Popover
          </span>
        </div>
        <Popover.Panel className="border rounded">
          <pre className="font-mono px-8 py-4 bg-slate-700 text-white rounded">
            {`// automatically handle open/close state        
<Popover>
  <Popover.Button>
    <Bars3Icon>
  </Popover.Button>
  <Popover.Panel>
     ...
  </Popover.Panel>
</Popover> `}{" "}
          </pre>
        </Popover.Panel>
        <hr className="h-1 border-red-500" />
      </Popover>

      <Popover className="relative">
        {({ open }) => {
          return (
            <>
              <div className="flex items-center">
                <Popover.Button className="p-2 rounded">
                  <Bars3Icon className="w-6 h-6"></Bars3Icon>
                </Popover.Button>
                <span className="ml-4 italic font-mono">
                  Absolutely positioned panel with Transition
                </span>
              </div>
              <Transition
                show={open}
                enterFrom="opacity-0 scale-0"
                leaveTo="opacity-0 scale-0"
                className="absolute z-10 transition duration-1000 origin-top-left"
              >
                <Popover.Panel className="border rounded" static>
                  <pre className="font-mono px-8 py-4 bg-slate-700 text-white rounded">
                    {`// automatically handle open/close state        
  <Popover className="relative">
    {({ open }) => (
      <Popover.Button>
        <Bars3Icon>
      </Popover.Button>

      <Transition
        show={open}
        enterFrom="opacity-0 scale-0"
        leaveTo="opacity-0 scale-0"
        className="absolute z-10 transition duration-1000 origin-top-left ml-2"
      >
        <Popover.Panel static>
           ...
        </Popover.Panel>
    )}
  </Popover> 
  `}{" "}
                  </pre>
                </Popover.Panel>
              </Transition>
              <hr className="h-1 border-red-500" />
            </>
          );
        }}
      </Popover>
    </div>
  );
};

export const TooltipWithFloatingUI = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { x, y, strategy, refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
    middleware: [flip()],
  });

  const hover = useHover(context, {
    // delay: { open: 500, close: 0 },
    restMs: 300,
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    dismiss,
  ]);
  const [marginTop, setMarginTop] = useState(0);

  return (
    <>
      <div className="flex gap-4 items-center" style={{ marginTop }}>
        <label htmlFor="margin-top">Set Top Margin</label>
        <input
          id="margin-to"
          type="range"
          min={0}
          max={96}
          value={marginTop}
          onChange={(e) => setMarginTop(+e.target.value)}
        />
        <div
          ref={refs.setReference}
          className="p-2 border rounded w-fit inline-block"
          {...getReferenceProps()}
        >
          Reference element
        </div>
        {isOpen && (
          <div
            ref={refs.setFloating}
            className="p-4 border rounded bg-white"
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            {...getFloatingProps()}
          >
            Tooltip
          </div>
        )}
      </div>
      <pre className="font-mono rounded p-4 bg-slate-700 text-white mt-8">{`
  const [isOpen, setIsOpen] = useState(false);

  const { x, y, strategy, refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
    middleware: [flip()],
  });

  const hover = useHover(context, {
    delay: { open: 500, close: 0 }
  });
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, dismiss]);
        `}</pre>
    </>
  );
};

export const UseListNavigation = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { x, y, strategy, refs, context } = useFloating({
    open: true,
  });

  const listRef = useRef<(HTMLElement | null)[]>([]);

  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [listNavigation]
  );

  const items = ["one", "two", "three"];

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        Reference element
      </div>
      <FloatingPortal>
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={refs.setFloating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            {...getFloatingProps()}
          >
            {items.map((item, index) => (
              <div
                key={item}
                // Make these elements focusable using a roving tabIndex.
                tabIndex={activeIndex === index ? 0 : -1}
                ref={(node) => {
                  listRef.current[index] = node;
                }}
                {...getItemProps()}
              >
                {item}
              </div>
            ))}
          </div>
        </FloatingFocusManager>
      </FloatingPortal>
    </>
  );
};

export function WithArrow() {
  const [open, setOpen] = useState(false);

  const arrowRef = useRef(null);
  const { x, y, strategy, refs, context } = useFloating({
    open,
    onOpenChange: setOpen,
    // placement: "top",
    middleware: [
      // offset(16),
      // flip(),
      arrow({
        element: arrowRef,
      }),
    ],
  });

  const { styles, isMounted } = useTransitionStyles(context, {
    initial: () => ({
      scale: 0,
      opacity: 0,
    }),
    common: ({ side }) => ({
      transformOrigin:
        side === "right"
          ? "left"
          : side === "left"
          ? "right"
          : side === "top"
          ? "bottom"
          : "top",
    }),
  });

  const hover = useHover(context, { restMs: 300 });
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <>
      <p>
        Consectetur exercitationem at beatae atque optio necessitatibus rem,
        voluptatibus quisquam laudantium? Dignissimos ex rerum aperiam{" "}
        <span
          ref={refs.setReference}
          className="text-red-600"
          {...getReferenceProps()}
        >
          Hover Me
        </span>{" "}
        labore voluptatum quod, saepe. Sint saepe iure delectus ea iste? Magnam
        dolore consectetur deleniti tenetur?
      </p>
      {isMounted && (
        <div
          ref={refs.setFloating}
          className="bg-red-600 text-white px-2 py-1 rounded"
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            ...styles,
          }}
          {...getFloatingProps()}
          onTransitionEnd={() => console.log("transitionend")}
        >
          Tooltip
        </div>
      )}
    </>
  );
}

export const HeadlessUIMenu = () => {
  return (
    <Menu>
      <Menu.Button>File</Menu.Button>
      <Menu.Items as="menu" className="w-fit py-2 border rounded" static>
        <Menu.Item
          as="li"
          className="px-2 py-1 cursor-pointer ui-active:bg-red-300"
        >
          Option 1
        </Menu.Item>
        <Menu.Item
          as="li"
          className="px-2 py-1 cursor-pointer ui-active:bg-red-300"
        >
          Option 2
        </Menu.Item>
        <Menu.Item as="li" className="cursor-pointer">
        {
        ({ active }) => (

          <Menu as="menu" className="relative">
            <Menu.Button className={clss("px-2 py-1 w-full text-left", active && 'bg-red-300')}>
              Export
            </Menu.Button>
            <Menu.Items as="menu" className="absolute top-0 left-[calc(100%+2px)] w-max py-2 border rounded">
              <Menu.Item
                as="li"
                className="py-1 cursor-pointer"
              >
                {({ active }) => (
                  <span className={clss("w-full", active && "bg-red-300")}>Option 1</span>
                )}
              </Menu.Item>
              <Menu.Item
                as="li"
                className="px-2 py-1 cursor-pointer"
              >
                {({ active }) => (
                  <span className={clss(active && "bg-red-300")}>Option 2</span>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
            )
        }
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export const MuiMenuImplementation = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const anchorRef = useRef(null);
  const anchorRef2 = useRef(null);

  return (
    <div className="grid justify-items-center">
      <button
        ref={anchorRef}
        className="w-fit mx-auto"
        onClick={() => setOpen((o) => !o)}
      >
        Menu
      </button>
      <MuiMenu
        open={open}
        onClose={() => {
          console.log('close parent');
          setOpen(false)
        }}
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => setOpen(false)}>first</MenuItem>
        <MenuItem onClick={() => setOpen(false)}>first</MenuItem>
        <MenuItem ref={anchorRef2} >
          <button
            onMouseOver={() => {
              console.log("enter");
              setOpen2(true);
            }}
          >
            Nested
          </button>
          <MuiMenu
            open={open2}
            onClose={() => setOpen2(false)}
            anchorEl={anchorRef2.current}
            className="left-1"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem
              onClick={() => {
                setOpen(false);
                setOpen2(false);
              }}
            >
              first
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOpen(false);
                setOpen2(false);
              }}
            >
              first
            </MenuItem>
          </MuiMenu>
        </MenuItem>
      </MuiMenu>
    </div>
  );
};
