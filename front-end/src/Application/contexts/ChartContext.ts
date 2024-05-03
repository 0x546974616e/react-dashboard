import { createContext, useContext } from "react";

export interface ChartContext {
  nx(value: number): number,
  ny(value: number): number,

  nw(value: number): number,
  nh(value: number): number,

  ix(value: number): number,
  iy(value: number): number,

  iw(value: number): number,
  ih(value: number): number,

  x1: number,
  y1: number,

  x2: number,
  y2: number,
}

export const ChartContext = (
  createContext<ChartContext>({
    nx: (value) => value,
    ny: (value) => value,

    nw: (value) => value,
    nh: (value) => value,

    ix: (value) => value,
    iy: (value) => value,

    iw: (value) => value,
    ih: (value) => value,

    x1: 0,
    y1: 0,

    x2: 0,
    y2: 0,
  })
);

export function useChartContext() {
  return useContext(ChartContext);
}
