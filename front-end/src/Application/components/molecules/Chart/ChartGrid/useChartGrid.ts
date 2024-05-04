import { useCallback, useMemo, useReducer } from "react";

import { useChartContext } from "Application/contexts";

import { ChartGridProps } from "./ChartGridProps";
import { computeLegend } from "./computeLegend";
import { Size } from "Application/types";
import { ChartGridRule } from "Application/theme";

export function useChartGrid(
    { x, y, w, h,
      minX, minY,
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

  const [ maxXLayout, setMaxXLayout ] = useReducer(Size.max, Size.ZERO);
  const [ maxYLayout, setMaxYLayout ] = useReducer(Size.max, Size.ZERO);

  return {
    xLegendMarginBottom: ih(ChartGridRule.xLegendMarginBottom),
    yLegendMarginRight: iw(ChartGridRule.yLegendMarginRight),

    x1: x + iw(maxYLayout.width + ChartGridRule.yLegendMarginRight),
    y1: y + ih(maxXLayout.height + ChartGridRule.xLegendMarginBottom),

    x2: x + w - iw(maxXLayout.width) / 2,
    y2: y + h - ih(maxYLayout.height) / 2,

    onXLegentLayout: setMaxXLayout,
    onYLegentLayout: setMaxYLayout,

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
