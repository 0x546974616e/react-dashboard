import { useMemo, useReducer } from "react";

import { useChartContext } from "@app/contexts";
import { ChartGridRuleTheme } from "@app/theme";
import { Size } from "@app/types";

import { ChartGridProps } from "./ChartGridProps";
import { computeLegend } from "./computeLegend";

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

  // TODO: Reset max values when new values.
  const [ maxXLayout, setMaxXLayout ] = useReducer(Size.maxOrRef, Size.ZERO);
  const [ maxYLayout, setMaxYLayout ] = useReducer(Size.maxOrRef, Size.ZERO);

  return {
    xLegendMarginBottom: ih(ChartGridRuleTheme.xLegendMarginBottom),
    yLegendMarginRight: iw(ChartGridRuleTheme.yLegendMarginRight),

    x1: x + iw(maxYLayout.width + ChartGridRuleTheme.yLegendMarginRight),
    y1: y + ih(maxXLayout.height + ChartGridRuleTheme.xLegendMarginBottom),

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
