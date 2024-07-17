import { memo } from "react";
import { Line, LineProps } from "react-native-svg";
import { ChartContext } from "@app/contexts";

export interface ChartLineProps extends
  Pick<LineProps,
    | "stroke"
    | "strokeWidth"
    | "strokeLinecap"
    | "strokeDasharray"
    | "strokeDashoffset"
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
      strokeDasharray,
      strokeDashoffset,
    }: ChartLineProps
  ): JSX.Element
{
  return (
    <ChartContext.Consumer>
      {({ nx, ny }) => (
        <Line
          x1={nx(x1)}
          y1={ny(y1)}
          x2={nx(x2)}
          y2={ny(y2)}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLinecap}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
      )}
    </ChartContext.Consumer>
  );
}
