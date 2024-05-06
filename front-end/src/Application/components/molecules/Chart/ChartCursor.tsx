import { ChartCircle, ChartLine } from "Application/components/atoms";
import { ChartPanningContext, useChartContext } from "Application/contexts";
import { Position } from "Application/types";

export interface ChartCursorProps {
  defaultX?: Position["x"],
}

/**
 * Display a vertical bar.
 */
export function ChartCursor(
    { defaultX }: ChartCursorProps
  ): JSX.Element
{
  const { y1, y2 } = useChartContext();

  return (
    <g className={"char-cursor"}>
      <ChartPanningContext.Consumer>
        {(position) => (
          <>
            {position && (
              <ChartLine
                x1={position.x} y1={y1}
                x2={position.x} y2={y2}
                stroke={"black"}
                strokeWidth={5}
                strokeLinecap={"round"}
              />
            )}

            {position && (
              <ChartCircle
                r={10}
                cx={position.x}
                cy={position.y}
                fill={"red"}
              />
            )}
          </>
        )}
      </ChartPanningContext.Consumer>
    </g>
  );
}
