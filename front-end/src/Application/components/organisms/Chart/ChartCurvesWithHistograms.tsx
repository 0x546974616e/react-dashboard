import { memo, useMemo } from "react";

import { ChartCurveTheme, ChartHistogramTheme } from "Application/theme";
import { Interpolation, Position } from "Application/types";
import { ChartSvg } from "Application/components/atoms";

import {
  ChartBaseLines,
  ChartCursorCircle,
  ChartCursorLine,
  ChartCurve,
  ChartGrid,
  ChartHistogram,
  ChartPanning,
} from "Application/components/molecules";

const INSET = 0; // TODO Remove

export interface ChartCurvesWithHistogramsProps {
  width: number,
  height: number,

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

  gridStroke?: string,
  gridWidth?: number,

  curve1Color?: string,
  curve2Color?: string,
  curveWidth?: number,

  histogram1BaseLineColor?: string,
  histogram2BaseLineColor?: string,
  histogramBaseLineWidth?: number,

  boxWidth1?: number,
  boxWidth2?: number,

  boxOffset1?: number,
  boxOffset2?: number,

  nearestXLegend: number,
  nearestYLegend: number,

  offsetXLegend?: number,
  offsetYLegend?: number,

  renderXLegend?(value: number, index: number): string | null;
  renderYLegend?(value: number, index: number): string | null;
}

export const ChartCurvesWithHistograms = memo(_KpiChart);

function _KpiChart(
    { width,
      height,

      histogram1,
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

      gridStroke,
      gridWidth,

      curve1Color,
      curve2Color,
      curveWidth,

      histogram1BaseLineColor,
      histogram2BaseLineColor,
      histogramBaseLineWidth,

      boxWidth1,
      boxWidth2,

      boxOffset1,
      boxOffset2,

      nearestXLegend,
      nearestYLegend,

      offsetXLegend,
      offsetYLegend,

      renderXLegend,
      renderYLegend,
    }: ChartCurvesWithHistogramsProps
  ): JSX.Element
{
  const extremum = useMemo(
    () => {
      const extremum = Position.minMax(
        histogram1,
        histogram2,
        curve1,
        curve2,
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

        stroke={gridStroke}
        strokeWidth={gridWidth}

        minX={extremum.min.x}
        maxX={extremum.max.x}

        minY={extremum.min.y}
        maxY={extremum.max.y}

        nearestXLegend={nearestXLegend}
        nearestYLegend={nearestYLegend}

        offsetXLegend={offsetXLegend}
        offsetYLegend={offsetYLegend}

        renderXLegend={renderXLegend}
        renderYLegend={renderYLegend}
      >
        <ChartPanning>
          {histogram1 && (
            <ChartHistogram
              points={histogram1}
              className={"chart-histogram-1"}
              baseLine={histogram1BaseLine}
              color={histogram1Color}
              boxWidth={boxWidth1}
              boxOffset={boxOffset1}
            />
          )}

          {histogram2 && (
            <ChartHistogram
              points={histogram2}
              className={"chart-histogram-2"}
              baseLine={histogram2BaseLine}
              color={histogram2Color}
              boxWidth={boxWidth2}
              boxOffset={boxOffset2}
            />
          )}

          <ChartBaseLines
            baseLine1={histogram1BaseLine}
            baseLine2={histogram2BaseLine}
            strokeWidth1={histogramBaseLineWidth}
            strokeWidth2={histogramBaseLineWidth}
            strokeColor1={histogram1BaseLineColor}
            strokeColor2={histogram2BaseLineColor}
          />

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
                horizontalWidth: boxWidth1,
                horizontalOffset: boxOffset1,
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
                horizontalWidth: boxWidth2,
                horizontalOffset: boxOffset2,
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
              r={ChartCurveTheme.cursorRadius}
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
              r={ChartCurveTheme.cursorRadius}
              interpolation={Interpolation.Linear}
            />
          )}
        </ChartPanning>
      </ChartGrid>
    </ChartSvg>
  );
}
