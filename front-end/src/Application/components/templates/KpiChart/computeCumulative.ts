import { Position } from "Application/types";

/**
 * TODO: Adjust according to the width.
 */
const NEAREST_MINUTE = 120;

/**
 * - `histogram.*.x` In minutes
 * - `histogram.*.y` Amount
 *
 * TODO: Refacto.
 */
export function computeCumulative(histogram?: Position[]) {
  if (!histogram) {
    return null;
  }

  histogram.sort((a, b) => a.x - b.x);

  let cumulative = Position.cumulativeYSum(histogram);

  histogram = histogram.reduce(
    (accumulator, { x, y }) => {
      x = Math.floor(x / NEAREST_MINUTE) * NEAREST_MINUTE;

      accumulator[x + NEAREST_MINUTE] ||= 0;
      accumulator[x + NEAREST_MINUTE] += y;

      return accumulator;
    },
    [] as number[]
  ).reduce(
    (acc, y, x, arr) => {
      if (x % NEAREST_MINUTE != 0) {
        return acc;
      }

      if (y == undefined) {
        // TODO: Never reached because of reduce() with sparse array.
        acc.push({ x, y: 0 });
      }
      else {
        if (acc.length <= 0) {
          acc.push({ x: x - NEAREST_MINUTE, y: 0 });
        }
        acc.push({ x, y })
      }

      return acc;
    },
    [] as Position[]
  );

  cumulative = cumulative.map(({ x, y }) => ({ x: x / 60, y }));
  histogram = histogram.map(({ x, y }) => ({ x: x / 60, y }));

  const cumulativeExtremum = Position.minMax(cumulative);
  const histogramExtremum = Position.minMax(histogram);

  if (!histogramExtremum || !cumulativeExtremum) {
    return null;
  }

  return {
    cumulative,
    histogram,
    cumulativeExtremum,
    histogramExtremum,
    combinedExtremum: Position.minMax(
      cumulativeExtremum.min,
      cumulativeExtremum.max,
      histogramExtremum.min,
      histogramExtremum.max,
    ),
  };
}
