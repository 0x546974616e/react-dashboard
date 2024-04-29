import { memo } from "react";
import { ChartContext } from "../ChartContext";

export interface CircleProps extends
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

export const Circle = memo(_Circle);

function _Circle(
    { cx, cy, r,
      fill,
      stroke,
      strokeWidth,
    }: CircleProps
  ): JSX.Element
{
  return (
    <ChartContext.Consumer>
      {({ nw, nh }) => (
        <circle
          cx={nw(cx)}
          cy={nh(cy)}
          r={r}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      )}
    </ChartContext.Consumer>
  );
}
