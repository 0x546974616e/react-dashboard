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
      {({ nx, ny, nw, nh }) => (
        <rect
          x={nx(x)}
          y={ny(y)}
          width={nw(w)}
          height={nh(h)}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLinecap}
          className={className}
        />
      )}
    </ChartContext.Consumer>
  );
}
