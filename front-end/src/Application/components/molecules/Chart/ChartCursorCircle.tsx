import { useEffect, useMemo } from "react";

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
  onChange?(position: Position | null): void,
}

/**
 * Display a vertical bar.
 */
export function ChartCursorCircle(
    { points,
      defaultX,
      interpolate,
      onChange,
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

      if (points.length <= 1) {
        return null;
      }

      return Position.findByX(
        points, position?.x! ?? defaultX, interpolate
      );
    }, [
      onChange,
      interpolate,
      position?.x ?? defaultX,
      points,
    ]
  );

  useEffect(
    () => {
      // onChange() was before called in the useMemo():
      // > Cannot update a component while rendering a different component.
      // > To locate the bad setState() [...]
      onChange?.(cursor);
    }, [
      onChange,
      cursor,
    ]
  )

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
