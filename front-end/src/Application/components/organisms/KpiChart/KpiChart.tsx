import { useCallback, useMemo, useState } from "react";

import { clamp } from "Application/utils";
import { useDimensions } from "Application/hooks";
import { ChartPolyline, ChartSvg } from "Application/components/atoms";

import {
  ChartCursorCircle,
  ChartCursorLine,
  ChartGrid,
  ChartPanning,
} from "Application/components/molecules";

export interface KpiChartProps {
  // onXLegend()
  // nearestXLegend= [nearest, offset] | nearest
  // (offsetXLength  ^)
}

const INSET = 0;
const RADIUS = 10;

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
  const points1 = useMemo(
    () => [
      [ -1, 9000 ],
      [ 2, 1000 ],
      [ 2.5, 45151 ],
      [ 3, 30000 ],
      [ 6, 50000 ],
      [ 6.9, 89000 ],
    ] as [number, number][],
    []
  );

  const points2 = useMemo(
    () => [
      [ -1.3, -10000 ],
      [ 2.7, 21000 ],
      [ 3.8, 42151 ],
      [ 4.1, 28000 ],
      [ 4.9, 55000 ],
      // [ 7.3, 81000 ],
    ] as [number, number][],
    []
  );

  return (
    <ChartSvg
      w={width}
      h={height}

      pt={INSET}
      pb={INSET}

      pl={INSET}
      pr={INSET}

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

        stroke={"gray"}
        strokeWidth={1}

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
          <ChartPolyline
            points={points2}
            fill={"none"}
            stroke={"cyan"}
            strokeWidth={5}
            strokeLinecap={"round"}
            animated={true}
          />
          <ChartPolyline
            points={points1}
            fill={"none"}
            stroke={"blue"}
            strokeWidth={5}
            strokeLinecap={"round"}
            animated={true}
          />

          <ChartCursorLine
            defaultX={6.3}
          />

          <ChartCursorCircle
            defaultX={6.3}
            points={points2}
            fill={"cyan"}
            stroke={"black"}
            strokeWidth={2}
            r={RADIUS}
            interpolate
          />
          <ChartCursorCircle
            defaultX={6.3}
            points={points1}
            fill={"blue"}
            stroke={"black"}
            strokeWidth={2}
            r={RADIUS}
            interpolate
          />
        </ChartPanning>
      </ChartGrid>
    </ChartSvg>
  );
}
