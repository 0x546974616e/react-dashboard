import { useCallback, useMemo, useState } from "react";

import { clamp } from "Application/utils";
import { Position } from "Application/types";
import { useDimensions } from "Application/hooks";
import { ChartCircle, ChartLine, ChartPolyline, ChartSvg } from "Application/components/atoms";
import { ChartCursor, ChartGrid, ChartPanning } from "Application/components/molecules";

export interface KpiChartProps {
  // onXLegend()
  // nearestXLegend= [nearest, offset] | nearest
  // (offsetXLength  ^)
}

const STROKE_WIDTH = 0;

export function KpiChart(): JSX.Element {
  // A state is used instead a ref to prevent multiple re-render.
  const [ container, setContainer ] = useState<HTMLDivElement | null>(null);

  const { height: screenHeight } = useDimensions();
  const width = container?.getBoundingClientRect().width ?? null;
  const height = clamp(screenHeight * 0.6, 200, 600);

  return (
    <div
      className={"w-full"}
      ref={(element) => setContainer(element)}
    >
      {width == null && (
        <div
          className={"w-full bg-red-100"}
          style={{ height }}
        >
          Skeletton
        </div>
      )}

      {width != null && (
        <_KpiChart
          width={width}
          height={height}
        />
      )}
    </div>
  );
}

function _KpiChart(
    { width, height }: {
      width: number,
      height: number,
    }
  ): JSX.Element
{
  return (
    <ChartSvg
      w={width}
      h={height}

      pt={STROKE_WIDTH}
      pb={STROKE_WIDTH}

      pl={STROKE_WIDTH}
      pr={STROKE_WIDTH}

      vx1={0}
      vy1={0}

      vx2={1000}
      vy2={1000}

      // debug
    >
      <ChartGrid
        x={0}
        y={0}

        w={1000}
        h={1000}

        minX={-1.2}
        maxX={7.3}
        offsetXLegend={1}
        nearestXLegend={1.75}
        // nearestXLegend={5.75}
        renderXLegend={useCallback((v: number) => `${v.toFixed(2)} €`, [])}

        minY={-1500}
        maxY={89652}
        offsetYLegend={23}
        nearestYLegend={12345}
        // nearestYLegend={50000}
        renderYLegend={useCallback((v: number) => `${v.toFixed(2)} km/s`, [])}
      >
        <ChartPanning>
          <ChartLine
            x1={-1.2} y1={-1500}
            x2={7.3} y2={89652}
            stroke={"magenta"}
            strokeWidth={5}
            strokeLinecap={"round"}
          />
          <ChartPolyline
            points={
              useMemo(
                () => (
                  [[ -1, -1000 ], [ 2, 1000 ], [ 2.5, 15151 ], [ 3, 20000 ], [ 6, 50000 ], [ 7.2, 89000 ]]
                ), []
              )
            }
            fill={"none"}
            stroke={"cyan"}
            strokeWidth={5}
            strokeLinecap={"round"}
          />
          <ChartCursor/>
        </ChartPanning>
      </ChartGrid>
    </ChartSvg>
  );
}
