import { Fragment, memo, useMemo } from "react";

import {
  ChartLine,
  ChartRect,
  ChartText,
  ChartTransform,
} from "Application/components/atoms";

import { ChartContext } from "Application/contexts";

export interface ChartGridProps extends
  Pick<JSX.IntrinsicElements["g"],
    | "children"
  >
{
  x: number,
  y: number,
  w: number,
  h: number,

  minX: number,
  minY: number,

  maxX: number,
  maxY: number,

  nearestXLegend: number,
  nearestYLegend: number,

  offsetXLegend?: number,
  offsetYLegend?: number,

  renderXLegend?(value: number): string;
  renderYLegend?(value: number): string;
}

export const ChartGrid = memo(_ChartGrid);

function computeLegend(
    min: number,
    max: number,
    nearest: number,
    offset?: number,
    render?: (value: number) => string,
  ): {
    labels: string[],
    min: number,
    max: number,
  }
{
  nearest = Math.abs(nearest);
  offset = Math.min(nearest, Math.abs(offset ?? 0))

  let value = Math.floor(min / nearest) * nearest;

  if (offset) {
    value = (
      value + offset > min
        ? value - offset
        : value + offset
    );
  }

  const labels: string[] = [];
  let first = value;
  let last = value;

  while (value < max + nearest) {
    labels.push(
      render
        ? render(value)
        : value.toString()
    );

    last = value;
    value += nearest;
  }

  return {
    labels,
    min: first,
    max: last,
  };
}

function _ChartGrid(
    { children,
      x, y, w, h,
      minX, minY,
      maxX, maxY,
      nearestXLegend,
      nearestYLegend,
      offsetXLegend,
      offsetYLegend,
      renderXLegend,
      renderYLegend,
    }: ChartGridProps
  ): JSX.Element
{
  const xLegend = useMemo(
    () => computeLegend(
      minX, maxX,
      nearestXLegend,
      offsetXLegend,
      renderXLegend,
    ),
    [ /* TODO: Accept updates? */ ]
  );

  const yLegend = useMemo(
    () => computeLegend(
      minY, maxY,
      nearestYLegend,
      offsetYLegend,
      renderYLegend,
    ),
    [ /* TODO: Accept updates? */ ]
  );

  return (
    <g>
      <ChartRect
        x={x}
        y={y}
        w={w}
        h={h}
        // stroke={"black"}
        fill="#00ff0088"
        strokeWidth={1}
      />

      <ChartLine
        x1={x}
        y1={y}
        x2={x + w}
        y2={y + h}
        stroke={"black"}
        strokeWidth={1}
      />

      {xLegend.labels.map(
        (legend, index, { length }) => {
          const percentage = length <= 1 ? 0 : index / (length - 1);
          return (
            <Fragment key={index}>
              <ChartLine
                x1={x + w * percentage}
                x2={x + w * percentage}
                y1={y + 0}
                y2={y + h}
                stroke="red"
                strokeWidth={1}
              />
              <ChartText
                y={y}
                x={x + w * percentage}
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
          return (
            <Fragment key={index}>
              <ChartLine
                x1={x + 0}
                x2={x + w}
                y1={y + h * percentage}
                y2={y + h * percentage}
                stroke="red"
                strokeWidth={1}
              />
              <ChartText
                x={x}
                y={y + h * percentage}
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

      <ChartContext.Consumer>
        {({ nw, nh }) => (
          <ChartContext.Provider
            value={{
              nw: (value) => nw(
                x + ((value - xLegend.min) / (xLegend.max - xLegend.min)) * w
              ),
              nh: (value) => nh(
                y + (1 - (value - yLegend.min) / (yLegend.max - yLegend.min)) * h
              ),
              vw: 0, // TODO
              vh: 0, // TODO
            }}
          >
            <g>{children}</g>
          </ChartContext.Provider>
        )}
      </ChartContext.Consumer>
    </g>
  );
}
