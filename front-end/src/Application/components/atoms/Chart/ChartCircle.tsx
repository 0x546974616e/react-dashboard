import { memo } from "react";
import { ChartContext } from "Application/contexts";

export interface ChartCircleProps extends
  Pick<JSX.IntrinsicElements["circle"],
    | "fill"
    | "stroke"
    | "strokeWidth"
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
    }: ChartCircleProps
  ): JSX.Element
{
  return (
    <ChartContext.Consumer>
      {({ nw, nh }) => (
        <circle
          r={r}
          cx={nw(cx)}
          cy={nh(cy)}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      )}
    </ChartContext.Consumer>
  );
}
