import { memo, useCallback, useState } from "react";

import { clamp } from "Application/utils";
import { useDimensions } from "Application/hooks";
import { Dimensions, Position } from "Application/types";
import { ChartPolyline, ChartSvg } from "Application/components/atoms";

import {
  ChartCursorCircle,
  ChartCursorLine,
  ChartCurve,
  ChartGrid,
  ChartHistogram,
  ChartPanning,
} from "Application/components/molecules";

const INSET = 0;
const RADIUS = 10;

export interface KpiChartProps {
  histogram1: Position[],
  histogram2: Position[],

  onCurrent1Change?(position: Position | null): void,
  onCurrent2Change?(position: Position | null): void,
}

export const KpiChart = memo(_KpiChart);

enum Display {
  Histogram,
  Cumulative,
  Combined,
}

function _KpiChart(props: KpiChartProps): JSX.Element {
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
        <_KpiGrid
          {...props}
          display={Display.Combined}
          width={width}
          height={height}
        />
      )}
    </div>
  );
}

function _KpiGrid(
    { histogram1,
      histogram2,

      onCurrent1Change,
      onCurrent2Change,

      display,

      width, height
    }: (
      & KpiChartProps
      & Dimensions
      & {
        display: Display,
      }
    )
  ): JSX.Element
{
  const dada = useCallback((v: number) => `${v.toFixed(2)} €`, []);
  const fafa = useCallback((v: number, i: number) => i % 3 > 0 ? null : `${v.toFixed(2)} km/s`, []);

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

        // minX={2.75}
        minX={-1.2}
        maxX={7.3}
        offsetXLegend={1}
        nearestXLegend={1.75}
        // nearestXLegend={5.75}
        renderXLegend={dada}

        minY={-10000}
        maxY={95000}
        offsetYLegend={23}
        nearestYLegend={12345}
        // nearestYLegend={50000}
        renderYLegend={fafa}
      >
        <ChartPanning>
          {/* <ChartPolyline
            points={histogram1}
            fill={"none"}
            stroke={"cyan"}
            strokeWidth={5}
            strokeLinecap={"round"}
            animated={true}
          /> */}

          <ChartHistogram
            points={histogram1}
            color={"cyan"}
            boxMargin={5}
            boxOffset={5}
            panningFollow={true}
            panningDefaultX={6.3}
            panningOnChange={onCurrent1Change}
          />

          <ChartCursorLine
            defaultX={6.3}
          />

          <ChartCurve
            points={histogram1}
            strokeColor={"blue"}
            strokeWidth={5}
            // panningFollow={true}
            panningDefaultX={6.3}
            panningInterpolate={true}
            panningOnChange={onCurrent1Change}
          />

          {/* <ChartCursorCircle
            defaultX={6.3}
            points={histogram1}
            onChange={onCurrent2Change}
            fill={"cyan"}
            stroke={"black"}
            strokeWidth={2}
            r={RADIUS}
            interpolate
          /> */}
        </ChartPanning>
      </ChartGrid>
    </ChartSvg>
  );
}
