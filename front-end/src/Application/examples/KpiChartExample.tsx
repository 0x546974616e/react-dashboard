import { useState } from "react";

import { KpiChart } from "Application/components";
import { Position, Position2 } from "Application/types";

const histogram1: Position2[] = [
  [ -1, 9000 ],
  [ 1.2, -2222 ],
  [ 2.2, 45151 ],
  [ 3, 30000 ],
  [ 6, 50000 ],
  [ 6.9, 89000 ],
];

const histogram2: Position2[] = [
  [ -1.3, -10000 ],
  [ 2.7, 21000 ],
  [ 3.8, 42151 ],
  [ 4.1, 28000 ],
  [ 4.9, 55000 ],
  // [ 7.3, 81000 ],
];

export function KpiChartExample(): JSX.Element {
  const [ current1, setCurrent1 ] = useState<Position | null>(null);
  const [ current2, setCurrent2 ] = useState<Position | null>(null);

  return (
    <div>
      <div><code>[1]</code><span>{current1?.x.toFixed(2)} - {current1?.y.toFixed(2)}</span></div>
      <div><code>[2]</code><span>{current2?.x.toFixed(2)} - {current2?.y.toFixed(2)}</span></div>

      <KpiChart
        histogram1={histogram1}
        histogram2={histogram2}

        onCurrent1Change={setCurrent1}
        onCurrent2Change={setCurrent2}
      />
    </div>
  );
}
