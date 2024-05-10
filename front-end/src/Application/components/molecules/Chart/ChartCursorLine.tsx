import { Position } from "Application/types";
import { ChartLine } from "Application/components/atoms";
import { ChartPanningContext, useChartContext } from "Application/contexts";

export interface ChartCursorLineProps {
  defaultX?: Position["x"],
  panningStroke?: string,
  strokeWidth?: number,
  defaultStroke?: string,
  activeStroke?: string,
}

/**
 * Display a vertical bar.
 */
export function ChartCursorLine(
    { defaultX,
      strokeWidth,
      defaultStroke,
      activeStroke,
    }: ChartCursorLineProps
  ): JSX.Element
{
  const { y1, y2 } = useChartContext();

  return (
    <ChartPanningContext.Consumer>
      {(position) => (
        <g className={"char-cursor-line"}>
          {defaultX && (
            <ChartLine
              x1={defaultX} y1={y1}
              x2={defaultX} y2={y2}
              strokeWidth={strokeWidth}
              strokeLinecap={"round"}
              className={
                position
                  ? "chart-cursor-line-default"
                  : "chart-cursor-line-active"
                }
              stroke={
                position
                  ? (defaultStroke ?? activeStroke)
                  : (activeStroke ?? defaultStroke)
              }
            />
          )}

          {position && (
            <ChartLine
              x1={position.x} y1={y1}
              x2={position.x} y2={y2}
              className={"chart-cursor-line-active"}
              stroke={activeStroke ?? defaultStroke}
              strokeWidth={strokeWidth}
              strokeLinecap={"round"}
            />
          )}
        </g>
      )}
    </ChartPanningContext.Consumer>
  );
}
