import { memo, useMemo } from "react";
import { useChartContext } from "Application/contexts";

export interface ChartPolylineProps extends
  Pick<JSX.IntrinsicElements["polyline"],
    | "fill"
    | "stroke"
    | "strokeWidth"
    | "strokeLinecap"
  >
{
  points: [x: number, y: number][],
}

export const ChartPolyline = memo(_ChartPolyline);

function _ChartPolyline(
    { points,
      fill,
      stroke,
      strokeWidth,
      strokeLinecap,
    }: ChartPolylineProps
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
