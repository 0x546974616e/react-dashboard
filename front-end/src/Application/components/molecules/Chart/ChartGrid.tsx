import { memo } from "react";

import {
  ChartLine,
  ChartRect,
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
}

export const ChartGrid = memo(_ChartGrid);

function _ChartGrid(
    { x, y, w, h,
      children,
    }: ChartGridProps
  ): JSX.Element
{
  const px = w / 4;
  const py = h / 4;

  return (
    <g>
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
    </g>
  );
}
