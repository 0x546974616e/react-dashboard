import { createContext, useContext } from "react";

/**
 * @todo Use (x, y, w, h) instead of (vw, vh).
 */
export interface ChartContext {
  nw(value: number): number,
  nh(value: number): number,

  /** @deprecated */
  vw: number,
  /** @deprecated */
  vh: number,
}

export const ChartContext = (
  createContext<ChartContext>({
    nw(value) { return value },
    nh(value) { return value },
    vw: 0,
    vh: 0,
  })
);

export function useChartContext() {
  return useContext(ChartContext);
}
