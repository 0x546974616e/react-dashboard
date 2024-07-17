import { memo } from "react";
import { Rect, RectProps } from "react-native-svg";
import { useChartContext } from "@app/contexts";

export interface ChartRectProps extends
  Pick<RectProps,
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
  const { nx, ny, nw, nh } = useChartContext();

  const ww = nw(w);
  const hh = nh(h);

  return (
    <Rect
      x={nx(x) + (ww < 0 ? ww : 0)}
      y={ny(y) + (hh < 0 ? hh : 0)}
      width={Math.abs(ww)}
      height={Math.abs(hh)}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap={strokeLinecap}
    />
  );
}
