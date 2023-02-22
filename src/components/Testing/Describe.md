#react #storybook #testing #describe #tdd #bdd

Some draft on how to render tests in Storybook ??
```tsx
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
const Result = ({ result }: { result?: boolean | number | string }) => {
  if (result === undefined) return null;

  return (
    <span>
      :{" "}
      {typeof result === "boolean" ? (
        result === true ? (
          <span className="text-green-500">✓</span>
        ) : (
          <span className="text-red-500">🗙</span>
        )
      ) : (
        <span className="text-blue-200">{result}</span>
      )}
    </span>
  );
};

type Tests = Array<[description: string, result?: boolean | number | string]>;

const Describe = (props: { title?: string; children?: Tests }) => (
  <div className="bg-gray-700 text-gray-300 mt-4 p-4 rounded font-mono">
    {props.title && <h3 className="text-lg text-white mb-4">{props.title}</h3>}
    {props.children && (
      <ul className="grid gap-3 list-none">
        {props.children.map(([description, result], key) => (
          <li key={key}>
            {description}
            <Result result={result} />
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default Describe;

```