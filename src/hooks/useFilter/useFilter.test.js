import { createFilter, filterAndSortByRelevance, EMPTY } from "./useFilter";

describe(`createFilter<T>(initialList: T[], options?: Options<T>): Filter<T>`, () => {
  it(`should return function`, () => {
    expect(createFilter()).toBeInstanceOf(Function);
  });

  it(`should throw an error when 'initialList' is not empty, not string[] and 'option.stringifyFn' is not provided`, () => {
    expect(() => createFilter([1, 2, 3])).toThrow();
    expect(() => createFilter([{}, {}])).toThrow();
    expect(() => createFilter([[], []])).toThrow();
  });

  it(`should not throw an error when 'initialList' is empty or string[]`, () => {
    expect(() => createFilter(["1", "2"])).not.toThrow();
    expect(() =>
      createFilter([1, 2], { stringifyFn: (n) => n.toString() })
    ).not.toThrow();
  });

  // it(`should limit number of returned filtered items to 'options.limit' provided in createFilter`, () => {
  //   const filter = createFilter(["a", "a", "a", "a", "a"], { limit: 2 });
  //   expect(filter("a")).toHaveLength(2);
  // });

  // it(`should limit number of returned filtered items to 'options.limit' when query === ''`, () => {
  //   const filter = createFilter(["a", "a", "a", "a", "a"], { limit: 2 });
  //   expect(filter("")).toHaveLength(2);
  // });

  // it(`should return 'initialList' if limit > initialList.length and query === ''`, () => {
  //   const list = ["a", "a", "a", "a", "a"];
  //   const filter = createFilter(list, { limit: 20 });
  //   expect(filter("")).toBe(list);
  // });

  // it(`should not trim number of filtered items if options.limit <= 0 or is not provided in createFilter`, () => {
  //   expect(
  //     createFilter(["a", "a", "a", "a", "a"], { limit: -1 })("a")
  //   ).toHaveLength(5);
  //   expect(
  //     createFilter(["a", "a", "a", "a", "a"], { limit: 0 })("a")
  //   ).toHaveLength(5);
  //   expect(createFilter(["a", "a", "a", "a", "a"])("a")).toHaveLength(5);
  // });

  it(`should use 'options.fitlerFn' (if provided) instead of default filtering algorithm`, () => {
    const dummyList = ["some", "dummy", "content"];
    const dummyFilter = () => dummyList;
    const filter = createFilter(["a", "b", "c"], { filterFn: dummyFilter });
    expect(filter("a")).toEqual(dummyList);
  });
});

describe(`filter<T>(query: string): T[]`, () => {
  it(`when created with empty or invalid 'initialList' filter(query) should return empty array`, () => {
    expect(createFilter()("foo")).toEqual([]);
  });

  it(`multiple filter functions created by different calls of 'createFilter' with invalid 'initialList' should return EMPTY`, () => {
    const f1 = createFilter();
    const f2 = createFilter();
    expect(f1()).toBe(EMPTY);
    expect(f2()).toBe(EMPTY);
  });

  it(`filter(query) should return 'initialList' provided to createFilter (exact reference) for any falsy 'query' (like '' or null)`, () => {
    const list = ["a", "b"];
    expect(createFilter(list)("")).toBe(list);
  });

  it(`repeating calls of 'filter' with the same non-empty 'query' should return the same result (with the same reference)`, () => {
    const list = ["abc", "abd", "cef"];
    const filter = createFilter(list);
    const f1 = filter("a");
    const f2 = filter("a");
    expect(f1).toHaveLength(2);
    expect(f1).toBe(f2);
  });

  it(`should return Array of the same type as 'initialList'`, () => {
    const list = [101, 121, 301];
    const filter = createFilter(list, { stringifyFn: (n) => n.toString() });
    const r = filter("2");
    expect(typeof r[0]).toBe("number");
  });

  // it(`if two consecutive calls of 'filter' return the same set of items, the returned values should have the same reference (be the same object)`, () => {
  //   const list = ["john", "johnny", "rocky", "ronald", "donald"];
  //   const filter = createFilter(list);
  //   const r1 = filter("j");
  //   const r2 = filter("jo");
  //   const r3 = filter("joh");
  //   expect(r1).toBe(r2);
  //   expect(r1).toBe(r3);
  // });

  describe(`Caching`, () => {
    it(`when 'options.cache === false' should not use cache`, () => {
      const filter = createFilter(["aaa", "aab", "abc"], { cache: false });
      const r1 = filter('a');
      const r2 = filter('a');
      expect(r1).toEqual(r2);
      expect(r1).not.toBe(r2);
    })

    it(`when 'options.cache' provided in createFilter is an object of Cache type, should use it for caching instead of default Map`, () => {
      const cache = new Map();
      const filter = createFilter(["aaa", "aab", "abc"], { cache });
      expect(cache.size).toBe(0);
      filter("a");
      expect(cache.size).toBe(1);
      filter("aa");
      expect(cache.size).toBe(2);
    });

    it(`should create a record in the cache for each unique query`, () => {
      const cache = new Map();
      const filter = createFilter(["aaa", "aab", "abc", "bcd"], {
        cache,
      });
      filter("a");
      filter("d");
      filter("bc");
      expect(cache.size).toBe(3);
    });

    it(`should not create new record if a query already exists in the cache`, () => {
      const cache = new Map();
      const filter = createFilter(["aaa", "aab", "abc", "bcd"], {
        cache,
      });
      filter("a");
      filter("a");
      filter("a");
      expect(cache.size).toBe(1);
    });

    it(`filter('abcd') should search exact match in the cache ('abcd'), then trimmed one letter from right ('abc'), then from left ('bcd')`, () => {
      const map = new Map();
      const cacheQueries = [];
      const cache = {
        set: (k, v) => map.set(k, v),
        get: (k) => {
          cacheQueries.push(k);
          return map.get(k);
        },
        clear: () => map.clear(),
      };
      const filter = createFilter(["aaa", "aab", "aac"], { cache });
      filter("abcd");
      expect(cacheQueries).toEqual(["abcd", "abc", "bcd"]);
    });

    it(`filter('') should clear inner cache`, () => {
      const cache = new Map();
      const filter = createFilter(["a", "b"], { cache });
      filter("ba");
      expect(cache.size).toBe(1);
      filter("");
      expect(cache.size).toBe(0);
    });
  });

  // describe(`benchmarks`, () => {
  //   it(`incremental filtering: 1000 items, 10 queries`, () => {
  //     const list = new Array(1000);
  //     list.fill("abcdefghijklmnopqrstuvwxyzABCDEF");
  //     const incrementalFilter = createFilter(list);
  //     const simpleFilter = filterAndSortByRelevance;
  //     const query = "ghijklmnopqrst";
  //     const MAX = 100;

  //     console.time("incremental");
  //     for (let j = 0; j < MAX; j++) {
  //       for (let i = 1; i < query.length; i++) {
  //         incrementalFilter(query.slice(0, i));
  //       }
  //     }
  //     console.timeEnd("incremental");

  //     console.time("simple");
  //     for (let j = 0; j < MAX; j++) {
  //       for (let i = 1; i < query.length; i++) {
  //         simpleFilter(query.slice(0, i), list);
  //       }
  //     }
  //     console.timeEnd("simple");
  //   });
  // });
});
