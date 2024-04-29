import { createContext } from "react";

export interface ChartContext {
  nw(value: number): number,
  nh(value: number): number,
  inset: number,
  vw: number,
  vh: number,
}

export const ChartContext = (
  createContext<ChartContext>({
    nw(value) { return value },
    nh(value) { return value },
    inset: 0,
    vw: 0,
    vh: 0,
  })
);
