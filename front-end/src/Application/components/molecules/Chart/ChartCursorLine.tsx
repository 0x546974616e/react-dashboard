import { Position } from "Application/types";
import { ChartLine } from "Application/components/atoms";
import { ChartPanningContext, useChartContext } from "Application/contexts";

export interface ChartCursorLineProps {
  defaultX?: Position["x"],
}

/**
 * Display a vertical bar.
 */
export function ChartCursorLine(
    { defaultX }: ChartCursorLineProps
  ): JSX.Element
{
  const { y1, y2 } = useChartContext();

  return (
    <ChartPanningContext.Consumer>
      {(position) => (
        <g className={"char-cursor-line"}>
          {position && (
            <ChartLine
              x1={position.x} y1={y1}
              x2={position.x} y2={y2}
              stroke={"black"}
              strokeWidth={3}
              strokeLinecap={"round"}
            />
          )}

          {!position && defaultX != undefined && (
            <ChartLine
              x1={defaultX} y1={y1}
              x2={defaultX} y2={y2}
              stroke={"black"}
              strokeWidth={3}
              strokeLinecap={"round"}
            />
          )}
        </g>
      )}
    </ChartPanningContext.Consumer>
  );
}
