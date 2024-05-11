import { Position } from "Application/types";

/**
 * @pre Histogram X axis are expected to be in minutes.
 * @pre Histogram X axis are expected to be sorted.
 */
export interface KpiChartProps {
  histogram1?: Position[],
  histogram2?: Position[],
}
