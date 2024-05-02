import { memo, useMemo } from "react";
import { useChartContext } from "Application/contexts";

export interface ChartPolygonProps extends
  Pick<JSX.IntrinsicElements["polygon"],
    | "fill"
    | "stroke"
    | "strokeWidth"
    | "strokeLinecap"
  >
{
  points: [x: number, y: number][],
}

export const ChartPolygon = memo(_ChartPolygon);

function _ChartPolygon(
    { points,
      fill,
      stroke,
      strokeWidth,
      strokeLinecap,
    }: ChartPolygonProps
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
