import { useCallback, useMemo, useReducer } from "react";

import { useChartContext } from "Application/contexts";

import { ChartGridProps } from "./ChartGridProps";
import { computeLegend } from "./computeLegend";

export function useChartGrid(
    { minX, minY,
      maxX, maxY,
      nearestXLegend,
      nearestYLegend,
      offsetXLegend,
      offsetYLegend,
      renderXLegend,
      renderYLegend,
    }: ChartGridProps
  ) //: auto
{
  const { iw, ih } = useChartContext();

  const [ _maxXLegendHeight, setMaxXLengthHeight ] = useReducer(
    (current: number, width: number) => Math.max(current, width), 0
  );

  const [ _maxYLegendWidth, setMaxYLengthWidth ] = useReducer(
    (current: number, width: number) => Math.max(current, width), 0
  );

  return {
    maxXLegendHeight: ih(_maxXLegendHeight),
    maxYLegendWidth: iw(_maxYLegendWidth),

    onXLegentLayout: useCallback(
      ({ height }: DOMRect) => setMaxXLengthHeight(height), []
    ),

    onYLegentLayout: useCallback(
      ({ width }: DOMRect) => setMaxYLengthWidth(width), []
    ),

    xLegend: useMemo(
      () => computeLegend(
        minX, maxX,
        nearestXLegend,
        offsetXLegend,
        renderXLegend,
      ), [
        minX, maxX,
        nearestXLegend,
        offsetXLegend,
        // renderXLegend,
      ]
    ),

    yLegend: useMemo(
      () => computeLegend(
        minY, maxY,
        nearestYLegend,
        offsetYLegend,
        renderYLegend,
      ), [
        minY, maxY,
        nearestYLegend,
        offsetYLegend,
        // renderYLegend,
      ]
    ),
  };
}
