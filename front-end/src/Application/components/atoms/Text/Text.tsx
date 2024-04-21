import { createElement } from "react";

import "./Text.scss";

export interface TextPros {
  as?: (
    | `h${1 | 2 | 3 | 4 | 5 | 6}`
    | "span"
    | "p"
  ),
  children?: string,
}

export function Text(props: TextPros): JSX.Element {
  const { as, children, ...attributes } = props;
  return (
    createElement(
      as ?? "p",
      Object.assign(
        { className: "tr-text" },
        attributes,
      ),
      children,
    )
  );
}
