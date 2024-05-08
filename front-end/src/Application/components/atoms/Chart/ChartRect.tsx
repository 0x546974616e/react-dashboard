import { memo } from "react";
import { ChartContext } from "Application/contexts";

export interface ChartRectProps extends
  Pick<JSX.IntrinsicElements["rect"],
    | "fill"
    | "stroke"
    | "strokeWidth"
    | "strokeLinecap"
    | "className"
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
      className,
    }: ChartRectProps
  ): JSX.Element
{
  return (
    <ChartContext.Consumer>
      {({ nx, ny, nw, nh }) => {
        const ww = nw(w);
        const hh = nh(h);
        return (
          <rect
            x={nx(x) + (ww < 0 ? ww : 0)}
            y={ny(y) + (hh < 0 ? hh : 0)}
            width={Math.abs(ww)}
            height={Math.abs(hh)}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap}
            className={className}
          />
        );
      }}
    </ChartContext.Consumer>
  );
}
