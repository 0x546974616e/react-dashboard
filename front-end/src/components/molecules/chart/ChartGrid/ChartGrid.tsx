import { Fragment, memo } from "react";

import {
  ChartLine,
  ChartRect,
  ChartText,
  ChartTransform,
} from "@app/components/atoms";

import { ChartGridProps } from "./ChartGridProps";
import { useChartGrid } from "./useChartGrid";
import { G } from "react-native-svg";

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

  const {
    stroke,
    strokeWidth,
    children,
  } = props;

  return (
    <G className={"chart-grid"}>
      <G className={"chart-grid-rules"}>
        {props.debug && (
          <ChartRect
            x={props.x} y={props.y}
            w={props.w} h={props.h}
            fill={"#00ff0088"}
            strokeWidth={1}
          />
        )}

        <G className={"chart-grid-rules-x"}>
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
                    stroke={stroke}
                    strokeWidth={strokeWidth}
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
        </G>

        <G className={"chart-grid-rules-y"}>
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
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    strokeDasharray={"3"}
                  />
                  {legend && (
                    <ChartText
                      x={x1 - yLegendMarginRight}
                      y={vertical}
                      onLayout={onYLegentLayout}
                      textAnchor={"end"}
                      alignmentBaseline={"middle"}
                    >
                      {legend}
                    </ChartText>
                  )}
                </Fragment>
              );
            }
          )}
        </G>
      </G>

      <ChartTransform
        x1={x1} y1={y1}
        x2={x2} y2={y2}

        vx1={xLegend.min}
        vx2={xLegend.max}

        vy1={yLegend.max}
        vy2={yLegend.min}
      >
        {children}
      </ChartTransform>
    </G>
  );
}
