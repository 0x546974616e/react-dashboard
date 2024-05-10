import { memo, useCallback, useMemo, useState } from "react";

import { clamp } from "Application/utils";
import { useDimensions } from "Application/hooks";
import { ChartHistogramTheme } from "Application/theme";
import { Dimensions, Interpolation, Position } from "Application/types";
import { ChartSvg } from "Application/components/atoms";

import {
  ChartCursorCircle,
  ChartCursorLine,
  ChartCurve,
  ChartGrid,
  ChartHistogram,
  ChartPanning,
} from "Application/components/molecules";

const INSET = 0; // TODO Remove

export interface ChartCurvesWithHistogramsProps {
  histogram1?: Position[],
  histogram2?: Position[],

  curve1?: Position[],
  curve2?: Position[],

  onHistogram1Change?(position: Position | null): void,
  onHistogram2Change?(position: Position | null): void,

  onCurve1Change?(position: Position | null): void,
  onCurve2Change?(position: Position | null): void,

  histogram1BaseLine?: number,
  histogram2BaseLine?: number,

  atMostMinX?: number,
  atMostMinY?: number,

  atLeastMaxX?: number,
  atLeastMaxY?: number,

  cursorDefaultX?: number,
  cursorDefaultXStroke?: string,

  cursorStroke?: string,
  cursorStrokeWidth?: number,

  histogram1Color?: string,
  histogram2Color?: string,

  curve1Color?: string,
  curve2Color?: string,
  curveWidth?: number,
}

export const ChartCurvesWithHistograms = memo(_KpiChart);

function _KpiChart(props: ChartCurvesWithHistogramsProps): JSX.Element {
  // A state is used instead a ref to prevent multiple re-render.
  const [ container, setContainer ] = useState<HTMLDivElement | null>(null);

  const { height: _screenHeight } = useDimensions();
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

      histogram1BaseLine,
      histogram2BaseLine,

      atMostMinX,
      atMostMinY,

      atLeastMaxX,
      atLeastMaxY,

      cursorDefaultX,
      cursorDefaultXStroke,

      cursorStroke,
      cursorStrokeWidth,

      histogram1Color,
      histogram2Color,

      curve1Color,
      curve2Color,
      curveWidth,

      width,
      height,
    }: (
      & ChartCurvesWithHistogramsProps
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
        if (atMostMinX != undefined) extremum.min.x = Math.min(extremum.min.x, atMostMinX);
        if (atMostMinY != undefined) extremum.min.y = Math.min(extremum.min.y, atMostMinY);

        if (atLeastMaxX != undefined) extremum.max.x = Math.max(extremum.max.x, atLeastMaxX);
        if (atLeastMaxY != undefined) extremum.max.y = Math.max(extremum.max.y, atLeastMaxY);
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
              className={"chart-histogram-1"}
              baseLine={histogram1BaseLine}
              color={histogram1Color}
              boxWidth={0.5}
              boxOffset={0.1}
            />
          )}

          {histogram2 && (
            <ChartHistogram
              points={histogram2}
              className={"chart-histogram-2"}
              baseLine={histogram2BaseLine}
              color={histogram2Color}
              boxWidth={0.5}
              boxOffset={0.4}
            />
          )}

          {curve1 && (
            <ChartCurve
              points={curve1}
              className={"chart-curve-1"}
              strokeColor={curve1Color}
              strokeWidth={curveWidth}
            />
          )}

          {curve2 && (
            <ChartCurve
              points={curve2}
              className={"chart-curve-2"}
              strokeColor={curve2Color}
              strokeWidth={curveWidth}
            />
          )}

          <ChartCursorLine
            defaultX={cursorDefaultX}
            strokeWidth={cursorStrokeWidth}
            defaultStroke={cursorDefaultXStroke}
            activeStroke={cursorStroke}
          />

          {histogram1 && onHistogram1Change && (
            <ChartCursorCircle
              points={histogram1}
              defaultX={cursorDefaultX}
              onChange={onHistogram1Change}
              className={"chart-cursor-histogram-1"}
              fill={histogram1Color}
              stroke={cursorStroke}
              strokeWidth={cursorStrokeWidth}
              r={ChartHistogramTheme.cursorRadius}
              interpolation={Interpolation.Horizontal}
              interpolationOptions={{
                horizontalWidth: 0.5,
                horizontalOffset: 0.1,
              }}
            />
          )}

          {histogram2 && onHistogram2Change && (
            <ChartCursorCircle
              points={histogram2}
              defaultX={cursorDefaultX}
              onChange={onHistogram2Change}
              className={"chart-cursor-histogram-2"}
              fill={histogram2Color}
              stroke={cursorStroke}
              strokeWidth={cursorStrokeWidth}
              r={ChartHistogramTheme.cursorRadius}
              interpolation={Interpolation.Horizontal}
              interpolationOptions={{
                horizontalWidth: 0.5,
                horizontalOffset: 0.4,
              }}
            />
          )}

          {curve1 && onCurve1Change && (
            <ChartCursorCircle
              points={curve1}
              defaultX={cursorDefaultX}
              onChange={onCurve1Change}
              className={"chart-cursor-curve-1"}
              fill={curve1Color}
              stroke={cursorStroke}
              strokeWidth={cursorStrokeWidth}
              r={ChartHistogramTheme.cursorRadius}
              interpolation={Interpolation.Linear}
            />
          )}

          {curve2 && onCurve2Change && (
            <ChartCursorCircle
              points={curve2}
              defaultX={cursorDefaultX}
              onChange={onCurve2Change}
              className={"chart-cursor-curve-2"}
              fill={curve2Color}
              stroke={cursorStroke}
              strokeWidth={cursorStrokeWidth}
              r={ChartHistogramTheme.cursorRadius}
              interpolation={Interpolation.Linear}
            />
          )}
        </ChartPanning>
      </ChartGrid>
    </ChartSvg>
  );
}
