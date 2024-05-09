import { memo } from "react";
import { Interpolation, Position } from "Application/types";
import { ChartCurveTheme } from "Application/theme";
import { ChartPolyline } from "Application/components/atoms";
import { ChartCursorCircle } from "./ChartCursorCircle";

export interface ChartCurveProps {
  points: Position[];
  strokeColor: string,
  strokeWidth: number,
  panningFollow?: boolean,
  panningDefaultX?: Position["x"],
  panningInterpolate?: boolean,
  panningOnChange?(position: Position | null): void,
}

export const ChartCurve = memo(_ChartCurve);

function _ChartCurve(
    { points,
      strokeColor,
      strokeWidth,
      panningFollow,
      panningDefaultX,
      panningInterpolate,
      panningOnChange,
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
      />

      {panningFollow && (
        <ChartCursorCircle
          points={points}
          defaultX={panningDefaultX}
          onChange={panningOnChange}
          fill={strokeColor}
          stroke={"black"}
          strokeWidth={1}
          r={ChartCurveTheme.cursorRadius}
          interpolation={
            panningInterpolate
              ? Interpolation.Linear
              : undefined
          }
        />
      )}
    </g>
  );
}
