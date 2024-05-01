import { memo } from "react";
import { ChartContext } from "../ChartContext";

export interface RectProps extends
  Pick<JSX.IntrinsicElements["rect"],
    | "fill"
    | "stroke"
    | "strokeWidth"
    | "strokeLinecap"
  >
{
  x: number,
  y: number,
  w: number,
  h: number,
}

export const Rect = memo(_Rect);

function _Rect(
    { x, y, w, h,
      fill,
      stroke,
      strokeWidth,
      strokeLinecap,
    }: RectProps
  ): JSX.Element
{
  return (
    <ChartContext.Consumer>
      {({ nw, nh }) => (
        <rect
          x={nw(x)}
          y={nh(y)}
          width={nw(w + x) - nw(x)}
          height={nh(h + y) - nh(y)}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLinecap}
        />
      )}
    </ChartContext.Consumer>
  );
}
