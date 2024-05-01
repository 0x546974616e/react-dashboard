import { memo, useMemo } from "react";

import { ChartContext, useChartContext } from "../ChartContext";
import { Transform } from "./Transform";
import { Line } from "./Line";
import { Rect } from "./Rect";

export interface GridProps extends
  Pick<JSX.IntrinsicElements["g"],
    | "children"
  >
{
  x: number,
  y: number,
  w: number,
  h: number,
}

export const Grid = memo(_Grid);

function _Grid(
    { x, y, w, h,
      children,
    }: GridProps
  ): JSX.Element
{
  const px = w / 4;
  const py = h / 4;

  // const { vw, vh } = useChartContext();
  // console.log({ vw, vh })

  return (
    <g>
      <ChartContext.Consumer>
        {({ vw, vh }) => (
           <Transform
             x={x + px} y={y + py}
             w={w - 2 * px} h={h - 2 * py}
             vw={vw}
             vh={vh}
           >
             {children}
           </Transform>
        )}
      </ChartContext.Consumer>



      <Rect
        x={x}
        y={y}
        w={w}
        h={h}
        // stroke={"black"}
        fill="#00ff0088"
        strokeWidth={1}
      />

      <Line
        x1={x}
        y1={y}
        x2={x + w}
        y2={y + h}
        stroke={"black"}
        strokeWidth={1}
      />
      <Line
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
