import { memo } from "react";
import { Position } from "Application/types";
import { ChartRect } from "Application/components/atoms";

export interface ChartHistogramProps {
  points: Position[];
  color?: string,
  baseLine?: number,
  boxWidth?: number,
  boxOffset?: number,
  className?: string,
}

export const ChartHistogram = memo(_ChartHistogram);

function _ChartHistogram(
    { points,
      color,
      baseLine,
      boxWidth,
      boxOffset,
      className,
    }: ChartHistogramProps
  ): JSX.Element
{
  baseLine ??= points[0]?.y;

  boxWidth ??= 1.0;
  boxOffset ??= 0.0;

  return (
    <g className={"chart-histogram"}>
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
              fill={color}
              stroke={"none"}
              animated={true}
              className={className}
            />
          );
        }
      )}
    </g>
  );
}
