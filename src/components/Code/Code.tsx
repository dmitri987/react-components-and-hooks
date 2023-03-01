"use client";
// import "prismjs/themes/prism.css";
import {
  ReactNode,
  HTMLAttributes,
} from "react";
import useSyntaxHighlight, {
  SyntaxHighlightOptions,
} from "../../hooks/useSyntaxHighlight/useSyntaxHighlight";
import {clss} from "../../libs/utils";


type Props = {
  children: ReactNode;
  className?: string;
  hljs?: boolean;
} & SyntaxHighlightOptions & HTMLAttributes<HTMLDivElement>;


export default function Code({
  children,
  className,
  hljs,
  ..._options
}: Props) {
  const { parsingEngine, language, wrapLines, autolink, preClass, codeClass, ...props } =
    _options;
// console.log(props)    

  const highlighted = useSyntaxHighlight(children, {
    parsingEngine: hljs || parsingEngine === 'hljs' ? "hljs" : "prism",
    language,
    wrapLines,
    autolink,
    preClass,
    codeClass,
  });

  return <div className={clss("relative", className)} {...props}>{highlighted}</div>;
}
