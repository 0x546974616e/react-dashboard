import { memo } from "react";
import { ChartContext } from "Application/contexts";

export interface ChartTextProps extends
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

export const ChartText = memo(_ChartText);

function _ChartText(
    { x, y,
      children,
      textAnchor,
      dominantBaseline,
      alignmentBaseline,
      fill,
    }: ChartTextProps
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
