import { memo, useCallback, useMemo, useState } from "react";

import { clamp } from "Application/utils";
import { useDimensions } from "Application/hooks";
import { Dimensions, Interpolation, Position } from "Application/types";
import { ChartPolyline, ChartSvg } from "Application/components/atoms";

import {
  ChartCursorCircle,
  ChartCursorLine,
  ChartCurve,
  ChartGrid,
  ChartHistogram,
  ChartPanning,
} from "Application/components/molecules";
import { ChartHistogramTheme } from "Application/theme";
import { ChartContext } from "Application/contexts";

const INSET = 0;
const RADIUS = 10;

export interface KpiChartProps {
  histogram1?: Position[],
  histogram2?: Position[],

  curve1?: Position[],
  curve2?: Position[],

  onHistogram1Change?(position: Position | null): void,
  onHistogram2Change?(position: Position | null): void,

  onCurve1Change?(position: Position | null): void,
  onCurve2Change?(position: Position | null): void,

  atMostMinX?: number,
  atMostMinY?: number,

  atLeastMaxX?: number,
  atLeastMaxY?: number,
}

export const KpiChart = memo(_KpiChart);

function _KpiChart(props: KpiChartProps): JSX.Element {
  // A state is used instead a ref to prevent multiple re-render.
  const [ container, setContainer ] = useState<HTMLDivElement | null>(null);

  const { height: screenHeight } = useDimensions();
  const width = container?.getBoundingClientRect().width ?? null;
  // const height = clamp(screenHeight * 0.6, 200, 600);
  const height = clamp((width ?? 0) * 0.8, 200, 600);

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

      curve1,
      curve2,

      onHistogram1Change,
      onHistogram2Change,

      onCurve1Change,
      onCurve2Change,

      atMostMinX,
      atMostMinY,

      atLeastMaxX,
      atLeastMaxY,

      width,
      height,
    }: (
      & KpiChartProps
      & Dimensions
    )
  ): JSX.Element
{
  const dada = useCallback((v: number) => `${v.toFixed(2)}s`, []);
  const fafa = useCallback((v: number, i: number) => i % 3 > 0 ? null : `${(v / 1000).toFixed(0)} K€`, []);

  const extremum = useMemo(
    () => {
      const extremum = Position.minMax(
        histogram1, histogram2,
        curve1, curve2,
      );

      if (extremum) {
        if (atMostMinX != undefined && extremum.min.x > atMostMinX) extremum.min.x = atMostMinX;
        if (atMostMinY != undefined && extremum.min.y > atMostMinY) extremum.min.y = atMostMinY;

        if (atLeastMaxX != undefined && extremum.max.x > atLeastMaxX) extremum.max.x = atLeastMaxX;
        if (atLeastMaxY != undefined && extremum.max.y > atLeastMaxY) extremum.max.y = atLeastMaxY;
      }

      return extremum;
    }, [
      histogram1,
      histogram2,
      curve1,
      curve2,
      atMostMinX,
      atMostMinY,
      atLeastMaxX,
      atLeastMaxY,
    ]
  );

  if (!extremum) {
    return (
      <div>
        <span>TODO TMP</span>
        <code>null</code>
      </div>
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

        minX={extremum.min.x}
        maxX={extremum.max.x}
        offsetXLegend={1}
        nearestXLegend={1.75}
        // nearestXLegend={5.75}
        renderXLegend={dada}

        minY={extremum.min.y}
        maxY={extremum.max.y}
        offsetYLegend={23}
        nearestYLegend={12345}
        // nearestYLegend={50000}
        renderYLegend={fafa}
      >
        <ChartPanning>
          {histogram1 && (
            <ChartHistogram
              points={histogram1}
              color={"cyan"}
              baseLine={0}
              boxWidth={0.5}
              boxOffset={0.1}
              panningFollow={false}
            />
          )}

          {histogram2 && (
            <ChartHistogram
              points={histogram2}
              color={"red"}
              baseLine={0}
              boxWidth={0.5}
              boxOffset={0.4}
              panningFollow={false}
            />
          )}

          {curve1 && (
            <ChartCurve
              points={curve1}
              strokeColor={"blue"}
              strokeWidth={5}
              panningFollow={false}
            />
          )}

          {curve2 && (
            <ChartCurve
              points={curve2}
              strokeColor={"orange"}
              strokeWidth={5}
              panningFollow={false}
            />
          )}

          <ChartCursorLine
            defaultX={6.3}
          />

          {histogram1 && (
            <ChartCursorCircle
              points={histogram1}
              defaultX={6.3}
              // onChange={onCurrent2Change}
              fill={"cyan"}
              stroke={"black"}
              strokeWidth={2}
              r={ChartHistogramTheme.cursorRadius}
              interpolation={Interpolation.Horizontal}
              interpolationOptions={{
                horizontalWidth: 0.5,
                horizontalOffset: 0.1,
              }}
            />
          )}

          {curve1 && (
            <ChartCursorCircle
              points={curve1}
              defaultX={6.3}
              // onChange={onCurrent1Change}
              fill={"blue"}
              stroke={"black"}
              strokeWidth={2}
              r={ChartHistogramTheme.cursorRadius}
              interpolation={Interpolation.Linear}
            />
          )}
        </ChartPanning>
      </ChartGrid>
    </ChartSvg>
  );
}
