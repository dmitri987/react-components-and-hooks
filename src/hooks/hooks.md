#react #hooks #collection #snippets

| hook                                                        | description                                                                                                     |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| #effects                                                    |                                                                                                                 |
| [useRipple](useRipple/useRipple.md)                         | Add ripple effect on click                                                                                      |
| #state                                                      |                                                                                                                 |
| [useFilter](useFilter/useFilter.md)                         | Incremental list filtering                                                                                      |
| [usePrevious](usePrevious.md)                             | Return value on previous render. See also https://github.com/streamich/react-use/blob/master/src/usePrevious.ts | 
| [useSum](./useSum.md)                                       | Accumulate values on each render                                                                                |
| #presentation                                               |                                                                                                                 |
| [useSyntaxHighlight](useSyntaxHighlight/useSyntaxHighlight) | Raw text to React Element or markup                                                                             |
| [useMask](useMask/useMask.md)                               | Add mask functionality to an `<input>`                                                                          |
| #scroll                                                     |                                                                                                                 |
| [useScroll](useScroll/useScroll)                            | Return scroll offset on each 'scroll' event                                                                     |
| [useScrollDireciton](useScrollDirection.md)                 | Return 'forward' / 'backward'                                                                                   |
| [useSlideOnScroll](useSlideOnScroll/useSlideOnScroll.md)    | Slide over viewport edge on scroll                                                                              |



https://github.com/streamich/react-use/blob/master/src/useRendersCount.ts
Hook, which counts all component renders
```
import { useRef } from 'react'; 
export function useRendersCount(): number { 
  return ++useRef(0).current; 
}

```

```
useMask  // Input 
useKeyMap / useActionMap ?? 
useFilter / useListFilter   // Combobox
```
```
#headlessui #tailwind
// replicate state to 'data-headlessui-state="open checked"'
const createRef = useReplicateStateToDataAttribute(value, 'open')
```

```
#utility hooks
useDelta / useDiff
useDebounce(value, delay)  may be useful for inputs


delayedValue = useDelay(value, delay)
debouncedValue = useDebounce(value, delay)

useResizeObserver    // https://github.com/ZeeCoder/use-resize-observer
useMediaQuery(query)
useContainerQuery(query)
useBreakpoint ?
useIsRtl(element?): boolean

useOverflowStrategy ??

useClickAway        // see @mui

useFloatingUI ?? #floating-ui
```

```
useLogicalUnits(target = document) // transform 'inline-' 'block-' to 'right, left, top, bottom'
```

from  https://github.com/streamich/react-use/tree/master/src 
```
const [get, set] = useGetSet(0);  

const { state, prev, next, setStateAt, setState, currentIndex } = useStateList(stateSet); 

const [state, setState, stateHistory] = useStateWithHistory(initial, capacity, initialHistory) 
[values, setValue] = useCachedState(value, capacity)  // values is always different object ?? 

const currentValue = useSpring(targetValue, tension, friction); 

const update = useUpdate(); // update() will rerender
```

```
#state management
useControl  ??
useForm
useLocalStorage ??
```

```
#scroll
useScroll 
useScrollDirection ??
useSlideOnScroll

useConditionalScroll(y, condition) ??

useIdle ??

useScrollTrigger  ??
useScrollSpy ??
```

```
useSyntaxHighlight   uses syntax-highlight
```

- Do not keep functions in `useState`. React has some weird bugs (retrurn another object instead of the function !?). Use `useMemo` instead #react #hooks #tip #usestate #usememo

- Create predefined hooks with factory  #react #hook #factory #pattern #idea
  `createMediaQuery / createBreakpoints / createContainerQueries`



