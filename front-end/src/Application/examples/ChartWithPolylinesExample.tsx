import { memo, useCallback, useMemo, useState } from "react";

import { clamp } from "Application/utils";
import { useDimensions } from "Application/hooks";
import { Dimensions, Interpolation, Position } from "Application/types";
import { ChartPolyline, ChartSvg } from "Application/components/atoms";

import {
  ChartCursorCircle,
  ChartCursorLine,
  ChartGrid,
  ChartPanning,
} from "Application/components/molecules";

const INSET = 0;
const RADIUS = 10;

export const ChartWithPolylinesExamples = memo(_ChartWithPolylinesExamples);

function _ChartWithPolylinesExamples(): JSX.Element {
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
        <__KpiChart
          width={width}
          height={height}
        />
      )}
    </div>
  );
}

function __KpiChart(
    { width, height }: Dimensions
  ): JSX.Element
{

  const histogram1 = useMemo(
    (): Position[] => [
      { x: -1, y: 9000 },
      { x: 2, y: 1000 },
      { x: 2.5, y: 45151 },
      { x: 3, y: 30000 },
      { x: 6, y: 50000 },
      { x: 6.9, y: 89000 },
    ], []
  );

  const histogram2 = useMemo(
    (): Position[] => [
      { x: -1.3, y: -10000 },
      { x: 2.7, y: 21000 },
      { x: 3.8, y: 42151 },
      { x: 4.1, y: 28000 },
      { x: 4.9, y: 55000 },
      // { x: 7.3, y: 81000 },
    ], []
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
            points={histogram2}
            fill={"none"}
            stroke={"cyan"}
            strokeWidth={5}
            strokeLinecap={"round"}
            animated={true}
          />
          <ChartPolyline
            points={histogram1}
            fill={"none"}
            stroke={"blue"}
            strokeWidth={5}
            strokeLinecap={"round"}
            animated={true}
          />

          <ChartCursorLine
            defaultX={6.3}
            stroke={"black"}
            strokeWidth={4}
          />

          <ChartCursorCircle
            defaultX={6.3}
            points={histogram2}
            fill={"cyan"}
            stroke={"black"}
            strokeWidth={2}
            r={RADIUS}
            interpolation={Interpolation.Linear}
          />
          <ChartCursorCircle
            defaultX={6.3}
            points={histogram1}
            fill={"blue"}
            stroke={"black"}
            strokeWidth={2}
            r={RADIUS}
            interpolation={Interpolation.Linear}
          />
        </ChartPanning>
      </ChartGrid>
    </ChartSvg>
  );
}
