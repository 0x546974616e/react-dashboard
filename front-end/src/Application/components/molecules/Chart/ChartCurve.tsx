import { memo } from "react";
import { Position } from "Application/types";
import { ChartPolyline } from "Application/components/atoms";

export interface ChartCurveProps {
  points: Position[];
  strokeColor?: string,
  strokeWidth?: number,
  className?: string,
}

export const ChartCurve = memo(_ChartCurve);

function _ChartCurve(
    { points,
      strokeColor,
      strokeWidth,
      className,
    }: ChartCurveProps
  ): JSX.Element
{
  return (
    <g className={"chart-curve"}>
      <ChartPolyline
        animated={true}
        points={points}
        fill={"none"}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap={"round"}
        className={className}
      />
    </g>
  );
}
