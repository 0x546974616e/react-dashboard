import { memo, useMemo } from "react";
import { ChartContext, useChartContext } from "../ChartContext";

export interface TransformProps extends
  Pick<JSX.IntrinsicElements["g"],
    | "children"
  >
{
  x: number,
  y: number,
  w: number,
  h: number,
  vw: number,
  vh: number,
}

export const Transform = memo(_Transform);

function _Transform(
    { children,
      x, y, w, h, vw, vh,
    }: TransformProps
  ): JSX.Element
{
  const properties = useChartContext();

  // TODO: Use "transform" attribute later?
  return (
    <ChartContext.Provider
      value={
        useMemo(
          () => {
            const { nw, nh } = properties;
            return {
              nw: (value) => nw(x + value / vw * w),
              nh: (value) => nh(y + value / vh * h),
              vw, vh,
            };
          }, [
            x, y, w, h, vw, vh,
            properties,
          ]
        )
      }
    >
      <g>{children}</g>
    </ChartContext.Provider>
  );
}
