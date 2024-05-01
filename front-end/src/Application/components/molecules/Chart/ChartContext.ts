import { createContext, useContext } from "react";

export interface ChartContext {
  nw(value: number): number,
  nh(value: number): number,
  vw: number,
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
