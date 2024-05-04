import { Fragment, memo } from "react";

import {
  ChartLine,
  ChartRect,
  ChartText,
  ChartTransform,
} from "Application/components/atoms";

import { ChartGridProps } from "./ChartGridProps";
import { useChartGrid } from "./useChartGrid";

export const ChartGrid = memo(_ChartGrid);

function _ChartGrid(props: ChartGridProps): JSX.Element {

  const {
    xLegend,
    yLegend,
    maxXLegendHeight,
    maxYLegendWidth,
    onXLegentLayout,
    onYLegentLayout,
  } = useChartGrid(props);

  const {
    children,
    x, y, w, h,
  } = props;

  return (
    <g className="chart-grid">
      <g className="chart-grid-rules">
        <ChartRect
          x={x} y={y}
          w={w} h={h}
          fill="#00ff0088"
          strokeWidth={1}
        />

        {xLegend.labels.map(
          (legend, index, { length }) => {
            const percentage = length <= 1 ? 0 : index / (length - 1);

            const horizontal = x + maxYLegendWidth + (w - maxYLegendWidth) * percentage;
            const vertical = y + maxXLegendHeight;

            return (
              <Fragment key={index}>
                <ChartLine
                  x1={horizontal}
                  x2={horizontal}
                  y1={vertical}
                  y2={y + h}
                  stroke="red"
                  strokeWidth={1}
                />
                <ChartText
                  y={vertical}
                  x={horizontal}
                  onLayout={onXLegentLayout}
                  textAnchor={"middle"}
                >
                  {legend}
                </ChartText>
              </Fragment>
            );
          }
        )}

        {yLegend.labels.map(
          (legend, index, { length }) => {
            const percentage = 1 - (length <= 1 ? 0 : index / (length - 1));

            const horizontal = x + maxYLegendWidth;
            const vertical = y + maxXLegendHeight + (h - maxXLegendHeight) * percentage;

            return (
              <Fragment key={index}>
                <ChartLine
                  x1={horizontal}
                  x2={x + w}
                  y1={vertical}
                  y2={vertical}
                  stroke="red"
                  strokeWidth={1}
                />
                <ChartText
                  x={horizontal}
                  y={vertical}
                  onLayout={onYLegentLayout}
                  textAnchor={"end"}
                  alignmentBaseline={"middle"}
                  dominantBaseline={"middle"}
                >
                  {legend}
                </ChartText>
              </Fragment>
            );
          }
        )}
      </g>

      <ChartTransform
        x1={x + maxYLegendWidth}
        y1={y + maxXLegendHeight}

        x2={x + w}
        y2={y + h}

        vx1={xLegend.min}
        vx2={xLegend.max}

        vy1={yLegend.max}
        vy2={yLegend.min}
      >
        {children}
      </ChartTransform>
    </g>
  );
}
