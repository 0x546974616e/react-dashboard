import { memo, useMemo } from "react";
import { useChartContext } from "Application/contexts";

export interface ChartPolylineProps extends
  Pick<JSX.IntrinsicElements["polyline"],
    | "fill"
    | "stroke"
    | "strokeWidth"
    | "strokeLinecap"
    | "className"
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
      className,
    }: ChartPolylineProps
  ): JSX.Element
{
  const { nx, ny } = useChartContext();

  return (
    <polyline
      points={
        useMemo(
          () => points.map(([ x, y ]) => `${nx(x)},${ny(y)}`).join(" "),
          [ points, nx, ny ]
        )
      }
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
      className={className}
    />
  );
}
