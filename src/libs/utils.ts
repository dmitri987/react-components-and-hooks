// Usage:
//   <div className={clss(
//         'foo bar',
//         isFoo ? 'foo' : 'bar',
//         isFoo && 'foo',
//         isFooAndBar && [
//           'foo',
//           'bar'
//           ifFoo && 'foo',
//         ]
//        )} > ... </div>
//
type MaybeClassName = string | false | null | undefined;
export const clss = (...classes: (MaybeClassName | MaybeClassName[])[]) =>
  classes.flat().filter(Boolean).join(" ").trim();
