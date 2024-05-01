import { memo, useMemo } from "react";
import { useChartContext } from "../ChartContext";

export interface PolygonProps extends
  Pick<JSX.IntrinsicElements["polygon"],
    | "fill"
    | "stroke"
    | "strokeWidth"
    | "strokeLinecap"
  >
{
  points: [x: number, y: number][],
}

export const Polygon = memo(_Polygon);

function _Polygon(
    { points,
      fill,
      stroke,
      strokeWidth,
      strokeLinecap,
    }: PolygonProps
  ): JSX.Element
{
  const { nw, nh } = useChartContext();

  return (
    <polygon
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
