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

  renderXLegend?(value: number): string | number;
  renderYLegend?(value: number): string | number;
}

export const ChartGrid = memo(_ChartGrid);

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
  const px = w / 4;
  const py = h / 4;

  const xLegend = useMemo(
    () => {
      const legends: (number | string)[] = [];
      let x = Math.floor(minX / nearestXLegend) * nearestXLegend;

      if (offsetXLegend) {
        x = x + offsetXLegend > minX
          ? x - offsetXLegend
          : x + offsetXLegend;
      }

      while (x < maxX + nearestXLegend) {
        legends.push(renderXLegend ? renderXLegend(x) : x);
        x += nearestXLegend;
      }

      return legends;
    },
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

      <ChartLine
        x1={x + w - px}
        y1={y + py}
        x2={x + px}
        y2={y + h - py}
        stroke={"black"}
        strokeWidth={3}
      />

      {xLegend.map(
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
                x={x + w * percentage}
                y={y + h * percentage}
                textAnchor={"middle"}
              >
                {legend}
              </ChartText>
            </Fragment>
          );
        }
      )}

      <ChartContext.Consumer>
        {({ vw, vh }) => (
           <ChartTransform
             x={x + px} y={y + py}
             w={w - 2 * px} h={h - 2 * py}
             vw={vw}
             vh={vh}
           >
             {children}
           </ChartTransform>
        )}
      </ChartContext.Consumer>
    </g>
  );
}
