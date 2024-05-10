import { useEffect, useMemo } from "react";

import { ChartCircle, ChartCircleProps } from "Application/components/atoms";
import { Interpolation, InterpolationOptions, Position } from "Application/types";
import { useChartPanningContext } from "Application/contexts";

export interface ChartCursorCircleProps extends
  Pick<ChartCircleProps,
    | "r"
    | "fill"
    | "stroke"
    | "strokeWidth"
  >
{
  points: Position[],
  defaultX?: Position["x"],
  interpolation?: Interpolation,
  interpolationOptions?: InterpolationOptions,
  onChange?(position: Position | null): void,
  className?: string,
}

/**
 * Display a vertical bar.
 */
export function ChartCursorCircle(
    { points,
      defaultX,
      interpolation,
      interpolationOptions,
      onChange,
      r,
      fill,
      stroke,
      strokeWidth,
      className,
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

      return Position.findNearestByX(
        points, position?.x! ?? defaultX,
        interpolation, interpolationOptions,
      );
    }, [
      onChange,
      interpolation,
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
          className={className}
        />
      )}
    </g>
  );
}
