import { useState } from "react";

import { KpiChart } from "Application/components";
import { Position } from "Application/types";

const histogram1: Position[] = [
  // { x: -1, y: 9000 },
  // { x: 1.2, y: -2222 },
  { x: 2.2, y: 45151 },
  // { x: 2.8, y: 45151 },
  { x: 3, y: 30000 },
  // { x: 4.5, y: 30010 },
  { x: 4.6, y: 35010 },
  // { x: 4.9, y: 5800 },
  { x: 6, y: 50000 },
  { x: 6.9, y: 89000 },
];

const histogram2: Position[] = [
  // { x: -1.3, y: -10000 },
  { x: 2.7, y: 21000 },
  { x: 3.8, y: 42151 },
  // { x: 4.1, y: 28000 },
  { x: 4.9, y: 55000 },
  // { x: 6.3, y: -10000 },
  // { x: 7.3, y: 81000 },
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

        curve1={histogram1}
        curve2={histogram2}

        onHistogram1Change={setCurrent1}
        onHistogram2Change={setCurrent2}

        histogram1BaseLine={0}
        histogram2BaseLine={0}

        atMostMinY={0}

        cursorStroke={"black"}
        cursorStrokeWidth={4}

        cursorDefaultX={6.3}
        cursorDefaultXStroke={"rgb(0, 0, 0, 0.25)"}

        histogram1Color={"blue"}
        histogram2Color={"green"}

        curve1Color={"#0088ff"}
        curve2Color={"#00ff88"}
      />
    </div>
  );
}
