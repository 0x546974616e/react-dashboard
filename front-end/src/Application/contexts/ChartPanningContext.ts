import { createContext, useContext } from "react";
import { Position } from "Application/types";

export type ChartPanningContext = Position | null;

export const ChartPanningContext = (
  createContext<ChartPanningContext>(null)
);

export function useChartPanningContext() {
  return useContext(ChartPanningContext);
}
