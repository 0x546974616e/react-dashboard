import { memo } from "react";
import { Interpolation, Position } from "Application/types";
import { ChartHistogramTheme } from "Application/theme";
import { ChartRect } from "Application/components/atoms";
import { ChartCursorCircle } from "./ChartCursorCircle";
import { useChartContext } from "Application/contexts";

export interface ChartHistogramProps {
  points: Position[];
  baseLine?: number,
  color: string,
  boxWidth?: number,
  boxOffset?: number,
  panningFollow?: boolean,
  panningDefaultX?: Position["x"],
  panningOnChange?(position: Position | null): void,
}

export const ChartHistogram = memo(_ChartHistogram);

function _ChartHistogram(
    { points,
      baseLine,
      color,
      boxWidth,
      boxOffset,
      panningFollow,
      panningDefaultX,
      panningOnChange,
    }: ChartHistogramProps
  ): JSX.Element
{
  baseLine ??= points[0]?.y;

  boxWidth ??= 1.0;
  boxOffset ??= 0.0;

  return (
    <g className={"chart-curve"}>
      {points.map(
        ({ x, y }, index, points) => {
          if (index <= 0 || points.length < 2) {
            return null;
          }

          const { x: nx } = points[index - 1]!;

          return (
            <ChartRect
              key={index}
              x={nx + (x - nx) * boxOffset!}
              y={baseLine!}
              w={(x - nx) * boxWidth!}
              h={y - baseLine!}
              animated={true}
              stroke={"none"}
              fill={color}
            />
          );
        }
      )}

      {panningFollow && (
        <ChartCursorCircle
          points={points}
          defaultX={panningDefaultX}
          onChange={panningOnChange}
          fill={color}
          stroke={"black"}
          strokeWidth={1}
          r={ChartHistogramTheme.cursorRadius}
          interpolation={Interpolation.Horizontal}
          interpolationOptions={{
            horizontalWidth: boxWidth,
            horizontalOffset: boxOffset,
          }}
        />
      )}
    </g>
  );
}
