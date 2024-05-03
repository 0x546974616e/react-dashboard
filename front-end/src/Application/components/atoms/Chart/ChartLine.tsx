import { memo } from "react";
import { ChartContext } from "Application/contexts";

export interface ChartLineProps extends
  Pick<JSX.IntrinsicElements["line"],
    | "stroke"
    | "strokeWidth"
    | "strokeLinecap"
  >
{
  x1: number,
  y1: number,
  x2: number,
  y2: number,
}

export const ChartLine = memo(_ChartLine);

function _ChartLine(
    { x1, y1,
      x2, y2,
      stroke,
      strokeWidth,
      strokeLinecap,
    }: ChartLineProps
  ): JSX.Element
{
  return (
    <ChartContext.Consumer>
      {({ nx, ny }) => (
        <line
          x1={nx(x1)}
          y1={ny(y1)}
          x2={nx(x2)}
          y2={ny(y2)}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLinecap}
        />
      )}
    </ChartContext.Consumer>
  );
}
