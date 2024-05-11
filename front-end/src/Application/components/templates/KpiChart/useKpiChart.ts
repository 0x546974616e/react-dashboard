import { useMemo, useReducer } from "react";

import { KpiDisplay, Position } from "Application/types";
import { computeCumulative } from "./computeCumulative";
import { KpiChartProps } from "./KpiChartProps";

function nearestY(extremum: ReturnType<typeof Position["minMax"]>) {
  if (extremum) {
    const diff = Math.abs(extremum.max.y - extremum.min.y);

    for (let limit = 100; limit < 10_000_000_000; limit *= 10) {
      if (diff <= limit) {
        return limit / 10;
      }
    }
  }

  return 100;
}

export function useKpiChart(
    { histogram1,
      histogram2,
    }: KpiChartProps
  ) //: auto
{
  const [ display, toggleDisplay ] = useReducer(KpiDisplay.reducer, KpiDisplay.Cumulative);

  const dataSet1 = useMemo(() => computeCumulative(histogram1), [ histogram1 ]);
  const dataSet2 = useMemo(() => computeCumulative(histogram2), [ histogram2 ]);

  switch (display) {
    case KpiDisplay.Cumulative: {
      const extremum = Position.minMax(
        dataSet1?.cumulativeExtremum.min,
        dataSet1?.cumulativeExtremum.max,
        dataSet2?.cumulativeExtremum.min,
        dataSet2?.cumulativeExtremum.max,
      );

      if (extremum) {
      }

      return {
        nearestX: 1,
        nearestY: nearestY(extremum),

        histogram1: undefined,
        histogram2: undefined,

        cumulative1: dataSet1?.cumulative,
        cumulative2: dataSet2?.cumulative,

        boxWidth1: undefined,
        boxWidth2: undefined,

        boxOffset1: undefined,
        boxOffset2: undefined,

        toggleDisplay,
      };
    }

    case KpiDisplay.Histogram: {
      const extremum = Position.minMax(
        dataSet1?.histogramExtremum.min,
        dataSet1?.histogramExtremum.max,
        dataSet2?.histogramExtremum.min,
        dataSet2?.histogramExtremum.max,
      );

      return {
        nearestX: 1,
        nearestY: nearestY(extremum),

        histogram1: dataSet1?.histogram,
        histogram2: dataSet2?.histogram,

        cumulative1: undefined,
        cumulative2: undefined,

        boxWidth1: dataSet2?.histogram ? 0.5 : 0.8,
        boxWidth2: dataSet1?.histogram ? 0.5 : 0.8,

        boxOffset1: dataSet2?.histogram ? 0.4 : 0.1,
        boxOffset2: 0.1,

        toggleDisplay,
      };
    }

    case KpiDisplay.Combined: {
      const extremum = Position.minMax(
        dataSet1?.combinedExtremum?.min,
        dataSet1?.combinedExtremum?.max,
        dataSet2?.combinedExtremum?.min,
        dataSet2?.combinedExtremum?.max,
      );

      return {
        nearestX: 1,
        nearestY: nearestY(extremum),

        histogram1: dataSet1?.histogram,
        histogram2: dataSet2?.histogram,

        cumulative1: dataSet1?.cumulative,
        cumulative2: dataSet2?.cumulative,

        boxWidth1: dataSet2?.histogram ? 0.5 : 0.8,
        boxWidth2: dataSet1?.histogram ? 0.5 : 0.8,

        boxOffset1: dataSet2?.histogram ? 0.4 : 0.1,
        boxOffset2: 0.1,

        toggleDisplay,
      };
    }
  }
}
