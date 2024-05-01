import { memo, useMemo } from "react";
import { useChartContext } from "../ChartContext";

export interface PolylineProps extends
  Pick<JSX.IntrinsicElements["polyline"],
    | "fill"
    | "stroke"
    | "strokeWidth"
    | "strokeLinecap"
  >
{
  points: [x: number, y: number][],
}

export const Polyline = memo(_Polyline);

function _Polyline(
    { points,
      fill,
      stroke,
      strokeWidth,
      strokeLinecap,
    }: PolylineProps
  ): JSX.Element
{
  const { nw, nh } = useChartContext();

  return (
    <polyline
      points={
        useMemo(
          () => points.map(([ x, y ]) => `${nw(x)},${nh(y)}`).join(" "),
          [ points, nw, nh ]
        )
      }
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
    />
  );
}
