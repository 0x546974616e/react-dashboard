import { memo } from "react";
import { ChartContext } from "../ChartContext";

export interface TextProps extends
  Pick<JSX.IntrinsicElements["text"],
    | "children"
    | "textAnchor"
    | "dominantBaseline"
    | "alignmentBaseline"
    | "fill"
  >
{
  x: number,
  y: number,
}

export const Text = memo(_Text);

function _Text(
    { x, y,
      children,
      textAnchor,
      dominantBaseline,
      alignmentBaseline,
      fill,
    }: TextProps
  ): JSX.Element
{
  return (
    <ChartContext.Consumer>
      {({ nw, nh }) => (
        <text
          x={nw(x)}
          y={nh(y)}
          textAnchor={textAnchor}
          alignmentBaseline={alignmentBaseline}
          dominantBaseline={dominantBaseline}
          fill={fill}
        >
          {children}
        </text>
      )}
    </ChartContext.Consumer>
  );
}
