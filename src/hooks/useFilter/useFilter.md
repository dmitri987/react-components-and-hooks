#react #hooks #useFilter #snippet 

```tsx
import { useEffect, useMemo, useRef, useState } from "react";

export type Options<Item extends any = string> = {
  // define how to turn a list item to a string,
  // which possibly will be filtered
  stringifyFn?: StringifyFn<Item>;
  // use it to customize filtering algorithm
  filterFn?: (
    query: string,
    list: Item[],
    stringify?: StringifyFn<Item>
  ) => Item[];
  // use it instead default cache object for caching intermediate results
  cache?: false | Cache<Item>;
};

type StringifyFn<Item extends any> = (item: Item) => string;

type Cache<Item extends any> = {
  set(key: string, list: Item[]): void;
  get(key: string): Item[] | undefined;
  clear(): void;
};

function defaultCache<Item>(): Cache<Item> {
  const _cache = new Map<string, Item[]>();
  return {
    set: (key, list) => {
      _cache.set(key, list);
    },
    get: (key) => _cache.get(key),
    clear: () => _cache.clear(),
  };
}

export const EMPTY: any[] = [];

const createRegExp = (s: string) => new RegExp(s.split("").join(".*"));
const compare = (strA: string, strB: string, firstLetter: string) =>
  strA.length < strB.length
    ? -1
    : strA.length > strB.length
    ? 1
    : strA < strB
    ? -1
    : strA.startsWith(firstLetter)
    ? -1
    : 0;

export function filterAndSortByRelevance<Item extends any = string>(
  query: string,
  list: Item[],
  stringify?: StringifyFn<Item>
): Item[] {
  if (!(list?.length > 0)) return EMPTY;

  const re = createRegExp(query);

  if (typeof list[0] === "string") {
    const filtered = list.filter((item) => re.test(item as string));
    return filtered.sort((a, b) => {
      return compare(a as string, b as string, query[0]);
    });
  } else {
    const indices = Array.from({ length: list.length }, (_, i) => i);
    const filteredIndices = indices.filter((i) => re.test(stringify!(list[i])));
    filteredIndices.sort((a, b) => {
      return compare(stringify!(list[a]), stringify!(list[b]), query[0]);
    });
    return filteredIndices.map((i) => list[i]);
  }
}

function resolveOptions<Item>(options: Options<Item>): Required<
  Omit<Options<Item>, "stringifyFn">
> & {
  stringifyFn?: StringifyFn<Item>;
} {
  return {
    stringifyFn: options.stringifyFn,
    filterFn: options.filterFn ?? filterAndSortByRelevance,
    cache: options.cache ?? defaultCache(),
  };
}

type Filter<Item extends any = string> = (query: string) => Item[];

export function createFilter<Item extends any = string>(
  initialList: Item[],
  options: Options<Item> = {} as Options<Item>
): Filter<Item> {
  if (!(initialList?.length > 0)) return () => EMPTY;

  if (
    typeof initialList[0] !== "string" &&
    !(
      options.stringifyFn instanceof Function ||
      options.filterFn instanceof Function
    )
  ) {
    throw new Error(`'initialList' has type Array<${typeof initialList[0]}>, but neither 'stringifyFn' nor 'filterFn' functions is provided.
Possible solutions:
 * use Array<string> for 'initialList' 
    
 * provide 'stringifyFn':
   createFilter(users, { stringify: (user) => user.firstName + ' ' + user.lastName })

 * provide 'filterFn':
   createFilter(list, { filter: (query, list, stringify?) => filtered_list }) `);
  }

  const { stringifyFn, filterFn, cache } = resolveOptions(options);
  const filter: Filter<Item> = (query): Item[] => {
    if (cache === false) {
      return filterFn(query, initialList, stringifyFn);
    }

    if (!query) {
      cache.clear();
      return initialList;
    }

    const match = cache.get(query);
    if (match) return match;

    const list =
      cache.get(query.slice(0, -1)) ?? cache.get(query.slice(1)) ?? initialList;

    let result = filterFn(query, list, stringifyFn);
    cache.set(query, result);
    return result;
  };

  return filter;
}

export default function useFilter<Item extends any = string>(
  query: string,
  initialList: Item[],
  options: Options<Item>
) {
  const [result, setResult] = useState<Item[] | null>(null);

  const filter = useMemo(() => {
    return createFilter(initialList, options);
  }, [initialList])

  useEffect(() => {
    new Promise((resolve) => {
      resolve(filter ? filter(query) : null)
    }).then((f) => {
      setResult(f as Item[]);
    });
  }, [query, filter]);

  return result;
}
```