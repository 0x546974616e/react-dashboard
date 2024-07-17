import { ReactNode, memo, useMemo } from "react";
import { G } from "react-native-svg";

import { ChartContext, useChartContext } from "@app/contexts";
import { div0 } from "@app/utils";

export interface ChartTransformProps {
  x1: number, // Parent viewBox x1
  y1: number, // Parent viewBox y1

  x2: number, // Parent viewBox x2
  y2: number, // Parent viewBox y2

  vx1: number, // New viewBox x1
  vy1: number, // New viewBox y1

  vx2: number, // New viewBox x2
  vy2: number, // New viewBox y2

  children?: ReactNode,
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
      <G className={"chart-transform"}>
        {children}
      </G>
    </ChartContext.Provider>
  );
}
