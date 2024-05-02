import { memo } from "react";
import { ChartContext } from "Application/contexts";

export interface ChartRectProps extends
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

export const ChartRect = memo(_ChartRect);

function _ChartRect(
    { x, y, w, h,
      fill,
      stroke,
      strokeWidth,
      strokeLinecap,
    }: ChartRectProps
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
