import { memo } from "react";
import { Circle, CircleProps } from "react-native-svg";
import { ChartContext } from "@app/contexts";

export interface ChartCircleProps extends
  Pick<CircleProps,
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
      {({ nx, ny }) => (
        <Circle
          r={r}
          cx={nx(cx)}
          cy={ny(cy)}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      )}
    </ChartContext.Consumer>
  );
}
