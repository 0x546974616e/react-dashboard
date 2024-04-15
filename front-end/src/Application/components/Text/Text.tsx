import { createElement } from "react";

import "./Text.scss";

export interface TextPros {
  as?: "p" | "span",
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
