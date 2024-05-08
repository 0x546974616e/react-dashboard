import { Position2 } from "Application/types";

export interface HistogramMetrics {
  histogram: {
    positions: Position2[],
    limits: [
      min: Position2,
      max: Position2,
    ],
  },
  cumulative: {
    positions: Position2[],
    limits: [
      min: Position2,
      max: Position2,
    ],
  },
  combined: {
    limits: [
      min: Position2,
      max: Position2,
    ],
  }
}

export function histogramMetrics(
    histogram: Position2[],
  ): HistogramMetrics | null
{
  if (histogram.length <= 0) {
    return null;
  }

  const cumulative = Position2.cumulativeYSum(histogram);

  const histogramMinMax = Position2.minMax(histogram)!;
  const cumulativeMinMax = Position2.minMax(cumulative)!;

  return {
    histogram: {
      positions: histogram,
      limits: histogramMinMax,
    },
    cumulative: {
      positions: cumulative,
      limits: cumulativeMinMax,
    },
    combined: {
      limits: Position2.minMax([
        ...histogramMinMax,
        ...cumulativeMinMax,
      ])!,
    },
  };
}
