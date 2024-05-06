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
    x1, y1,
    x2, y2,
    xLegend,
    yLegend,
    xLegendMarginBottom,
    yLegendMarginRight,
    onXLegentLayout,
    onYLegentLayout,
  } = useChartGrid(props);

  return (
    <g className={"chart-grid"}>
      <g className={"chart-grid-rules"}>
        {props.debug && (
          <ChartRect
            x={props.x} y={props.y}
            w={props.w} h={props.h}
            fill="#00ff0088"
            strokeWidth={1}
          />
        )}

        {xLegend.labels.map(
          (legend, index, { length }) => {
            const percentage = length <= 1 ? 0 : index / (length - 1);
            const horizontal = x1 + (x2 - x1) * percentage;

            return (
              <Fragment key={index}>
                <ChartLine
                  x1={horizontal}
                  x2={horizontal}
                  y1={y1 - xLegendMarginBottom / 2}
                  y2={y2}
                  stroke="red"
                  strokeWidth={1}
                />
                {legend && (
                  <ChartText
                    x={horizontal}
                    y={y1 - xLegendMarginBottom}
                    onLayout={onXLegentLayout}
                    textAnchor={"middle"}
                  >
                    {legend}
                  </ChartText>
                )}
              </Fragment>
            );
          }
        )}

        {yLegend.labels.map(
          (legend, index, { length }) => {
            const percentage = 1 - (length <= 1 ? 0 : index / (length - 1));
            const vertical = y1 + (y2 - y1) * percentage;

            return (
              <Fragment key={index}>
                <ChartLine
                  x1={x1 - yLegendMarginRight / 2}
                  x2={x2}
                  y1={vertical}
                  y2={vertical}
                  stroke="red"
                  strokeWidth={1}
                />
                {legend && (
                  <ChartText
                    x={x1 - yLegendMarginRight}
                    y={vertical}
                    onLayout={onYLegentLayout}
                    textAnchor={"end"}
                    alignmentBaseline={"middle"}
                    dominantBaseline={"middle"}
                  >
                    {legend}
                  </ChartText>
                )}
              </Fragment>
            );
          }
        )}
      </g>

      <ChartTransform
        x1={x1} y1={y1}
        x2={x2} y2={y2}

        vx1={xLegend.min}
        vx2={xLegend.max}

        vy1={yLegend.max}
        vy2={yLegend.min}
      >
        {props.children}
      </ChartTransform>
    </g>
  );
}
