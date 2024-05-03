import { memo, useMemo } from "react";
import { ChartContext, useChartContext } from "Application/contexts";
import { div0 } from "Application/utils";

export interface ChartTransformProps extends
  Pick<JSX.IntrinsicElements["g"],
    | "children"
  >
{
  x1: number,
  y1: number,

  x2: number,
  y2: number,

  vx1: number,
  vy1: number,

  vx2: number,
  vy2: number,
}

export const ChartTransform = memo(_ChartTransform);

function _ChartTransform(
    { children,
      x1, y1,
      x2, y2,
      vx1, vy1,
      vx2, vy2,
    }: ChartTransformProps
  ): JSX.Element
{
  const properties = useChartContext();

  return (
    <ChartContext.Provider
      value={
        useMemo(
          () => {
            const {
              nx, ny,
              nw, nh,

              ix, iy,
              iw, ih,
            } = properties;

            return {
              nx: v => nx(div0(v - vx1, vx2 - vx1) * (x2 - x1) + x1),
              ny: v => ny(div0(v - vy1, vy2 - vy1) * (y2 - y1) + y1),

              nw: v => nw(div0(v, vx2 - vx1) * (x2 - x1)),
              nh: v => nh(div0(v, vy2 - vy1) * (y2 - y1)),

              ix: v => div0(ix(v) - x1, x2 - x1) * (vx2 - vx1) + vx1,
              iy: v => div0(iy(v) - y1, y2 - y1) * (vy2 - vy1) + vy1,

              iw: v => div0(iw(v), x2 - x1) * (vx2 - vx1),
              ih: v => div0(ih(v), y2 - y1) * (vy2 - vy1),

              x1: vx1,
              y1: vy1,

              x2: vx2,
              y2: vy2,
            };
          }, [
            x1, y1,
            x2, y2,
            vx1, vy1,
            vx2, vy2,
            properties,
          ]
        )
      }
    >
      <g className="chart-transform">
        {children}
      </g>
    </ChartContext.Provider>
  );
}
