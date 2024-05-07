import { useMemo } from "react";

import { ChartCircle, ChartCircleProps } from "Application/components/atoms";
import { useChartPanningContext } from "Application/contexts";
import { Position } from "Application/types";

export interface ChartCursorCircleProps extends
  Pick<ChartCircleProps,
    | "r"
    | "fill"
    | "stroke"
    | "strokeWidth"
  >
{
  points: [x: number, y: number][],
  defaultX?: Position["x"],
  interpolate?: boolean,
}

/**
 * Display a vertical bar.
 */
export function ChartCursorCircle(
    { points,
      defaultX,
      interpolate,
      r,
      fill,
      stroke,
      strokeWidth,
    }: ChartCursorCircleProps
  ): JSX.Element
{
  const position = useChartPanningContext();

  const cursor = useMemo(
    (): Position | null => {
      if (!position && defaultX == undefined) {
        return null;
      }

      const x = position?.x! ?? defaultX;
      const length = points.length;

      if (length <= 1) {
        return null;
      }

      // Special case (useful?).
      if (length == 2) {
        const [[ x1, y1 ], [ x2, y2 ]] = points as any;

        if (x <= x1) {
          return {
            x: x1, y: y1
          };
        }

        if (x2 <= x) {
          return {
            x: x2, y: y2
          };
        }

        if (interpolate) {
          return {
            x, y: y1 + (y2 - y1) * ((x - x1) / (x2 - x1)),
          };
        }
        else {
          return {
            x: x1, y: y1,
          };
        }
      }

      let low = 0;
      let high = length - 2;

      // Binary search.
      while (low <= high) {
        const mid = Math.floor((high + low) / 2);

        const [ x1, y1 ] = points[mid]!;
        const [ x2, y2 ] = points[mid + 1]!;

        if (x1 <= x && x < x2) {
          if (interpolate) {
            return {
              x, y: y1 + (y2 - y1) * ((x - x1) / (x2 - x1)),
            };
          }
          else {
            return {
              x: x1, y: y1,
            };
          }
        }

        if (x1 < x) {
          low = mid + 1;
        }
        else {
          high = mid - 1;
        }
      }

      // Get first or last point.
      const [ x1, y ] = points[low <= 0 ? 0 : length - 1]!;

      return {
        x: x1, y
      };
    }, [
      interpolate,
      position?.x ?? defaultX,
      points,
    ]
  );

  return (
    <g className={"char-cursor-circle"}>
      {cursor && (
        <ChartCircle
          r={r}
          cx={cursor.x}
          cy={cursor.y}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      )}
    </g>
  );
}
