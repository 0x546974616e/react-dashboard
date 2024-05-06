import { memo } from "react";
import { ChartContext } from "Application/contexts";

export interface ChartCircleProps extends
  Pick<JSX.IntrinsicElements["circle"],
    | "fill"
    | "stroke"
    | "strokeWidth"
    | "className"
  >
{
  cx: number,
  cy: number,
  r: number,
}

export const ChartCircle = memo(_ChartCircle);

function _ChartCircle(
    { cx, cy, r,
      fill,
      stroke,
      strokeWidth,
      className
    }: ChartCircleProps
  ): JSX.Element
{
  return (
    <ChartContext.Consumer>
      {({ nx, ny }) => (
        <circle
          r={r}
          cx={nx(cx)}
          cy={ny(cy)}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          className={className}
        />
      )}
    </ChartContext.Consumer>
  );
}
