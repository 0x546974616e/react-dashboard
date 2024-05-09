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
  boxMargin?: number,
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
      boxMargin,
      boxOffset,
      panningFollow,
      panningDefaultX,
      panningOnChange,
    }: ChartHistogramProps
  ): JSX.Element
{
  baseLine ??= points[0]?.y;
  const { iw } = useChartContext();
  const margin = boxMargin ? iw(boxMargin) : 0;
  const offset = boxOffset ? iw(boxOffset) : 0;

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
              x={nx + margin + offset}
              y={baseLine!}
              w={x - nx - 2 * margin}
              h={y - baseLine!}
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
          interpolation={Interpolation.Horizontal}
          onChange={panningOnChange}
          fill={color}
          stroke={"black"}
          strokeWidth={1}
          r={ChartHistogramTheme.cursorRadius}
        />
      )}
    </g>
  );
}
