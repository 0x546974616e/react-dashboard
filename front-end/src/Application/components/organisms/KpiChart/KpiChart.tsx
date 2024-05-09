import { memo, useCallback, useMemo, useState } from "react";

import { clamp } from "Application/utils";
import { useDimensions } from "Application/hooks";
import { Dimensions, Position, Position2 } from "Application/types";
import { ChartPolyline, ChartSvg } from "Application/components/atoms";

import {
  ChartCursorCircle,
  ChartCursorLine,
  ChartGrid,
  ChartHistograms,
  ChartPanning,
} from "Application/components/molecules";

import { histogramMetrics } from "./histogramMetrics";

const INSET = 0;
const RADIUS = 10;

export interface KpiChartProps {
  histogram1: Position2[],
  histogram2: Position2[],

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
  const metrics1 = useMemo(() => histogramMetrics(histogram1), [ histogram1 ]);
  const metrics2 = useMemo(() => histogramMetrics(histogram2), [ histogram2 ]);

  const dada = useCallback((v: number) => `${v.toFixed(2)} €`, []);
  const fafa = useCallback((v: number, i: number) => i % 3 > 0 ? null : `${v.toFixed(2)} km/s`, []);

  const minMax = useMemo(
    () => {
      switch (display) {
        case Display.Histogram:
          return metrics1?.histogram;
        case Display.Cumulative:
          return metrics1?.cumulative;
        case Display.Combined:
          return metrics1?.combined;
      }
    }, [
      metrics1,
      metrics2,
      display,
    ]
  );

  if (!minMax) {
    return (
      <div><code>null</code></div>
    );
  }

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

        minX={minMax.limits[0][0]}
        maxX={minMax.limits[1][0]}
        offsetXLegend={1}
        nearestXLegend={1.75}
        // nearestXLegend={5.75}
        renderXLegend={dada}

        minY={minMax.limits[0][1]}
        maxY={minMax.limits[1][1]}
        offsetYLegend={23}
        nearestYLegend={12345}
        // nearestYLegend={50000}
        renderYLegend={fafa}
      >
        <ChartPanning>
          <ChartHistograms
            histogram1={histogram1}
            histogram2={histogram2}
          />

          {display != Display.Cumulative && metrics1 && (
            <ChartPolyline
              points={metrics1.histogram.positions}
              fill={"none"}
              stroke={"cyan"}
              strokeWidth={5}
              strokeLinecap={"round"}
              animated={true}
            />
          )}

          {display != Display.Histogram && metrics1 && (
            <ChartPolyline
              points={metrics1.cumulative.positions}
              fill={"none"}
              stroke={"cyan"}
              strokeWidth={5}
              strokeLinecap={"round"}
              animated={true}
            />
          )}

          <ChartCursorLine
            defaultX={6.3}
          />

          <ChartCursorCircle
            defaultX={6.3}
            points={display == Display.Cumulative ? metrics1!.cumulative.positions : metrics1!.histogram.positions}
            onChange={onCurrent2Change}
            fill={"cyan"}
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
