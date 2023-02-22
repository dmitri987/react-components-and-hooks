'use client'

import {ReactElement, ReactNode, useEffect, useRef} from "react";
import {react} from "../../../libs/syntax-highlight";
export { prism, hljs } from '../../../libs/syntax-highlight/modules/core';
import type { Options } from "../../../libs/syntax-highlight";

export type SyntaxHighlightOptions = Options;

export default function useHighlight(
  text: ReactNode,
  languageOrOptions: string | Options = {} as Options
): ReactNode {
  const cache = useRef(new Map<string, ReactElement>());

  useEffect(() => {
    const _cache = cache.current;
    return () => _cache.clear();
  }, []);

  if (typeof text !== "string") return text;

  if (cache.current.has(text)) {
    return cache.current.get(text);
  }

  const reactTree = react(text, languageOrOptions);
  if (!reactTree) return null;

  cache.current.set(text, reactTree);
  return reactTree;
}
