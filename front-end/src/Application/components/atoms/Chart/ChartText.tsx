import { memo } from "react";
import { ChartContext } from "Application/contexts";

export interface ChartTextProps extends
  Pick<JSX.IntrinsicElements["text"],
    | "children"
    | "fill"
    | "textAnchor"
    | "dominantBaseline"
    | "alignmentBaseline"
  >
{
  x: number,
  y: number,
}

export const ChartText = memo(_ChartText);

function _ChartText(
    { x, y,
      children,
      fill,
      textAnchor,
      dominantBaseline,
      alignmentBaseline,
    }: ChartTextProps
  ): JSX.Element
{
  return (
    <ChartContext.Consumer>
      {({ nw, nh }) => (
        <text
          x={nw(x)}
          y={nh(y)}
          fill={fill}
          textAnchor={textAnchor}
          alignmentBaseline={alignmentBaseline}
          dominantBaseline={dominantBaseline}
        >
          {children}
        </text>
      )}
    </ChartContext.Consumer>
  );
}
