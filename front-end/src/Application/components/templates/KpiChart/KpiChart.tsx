import { useState } from "react";

import { ChartCurvesWithHistograms } from "Application/components";
import { useDimensions } from "Application/hooks";
import { Position } from "Application/types";
import { clamp } from "Application/utils";

import { KpiChartProps } from "./KpiChartProps";
import { useKpiChart } from "./useKpiChart";

import "./KpiChart.scss";

// TODO accoding to screen and histogram.
function hour(hour: number, index: number): string | null {
  if (index % 2 == 0) {
    return `${hour.toFixed(0)} h`;
  }

  return null;
}

function euro(euro: number): string {
  return `${Math.floor(euro)} €`;
}

export function KpiChart(
    props: KpiChartProps
  ): JSX.Element
{
  const [ current1, setCurrent1 ] = useState<Position | null>(null);
  const [ current2, setCurrent2 ] = useState<Position | null>(null);

  const [ container, setContainer ] = useState<HTMLDivElement | null>(null);
  const width = container?.getBoundingClientRect().width ?? null;
  const height = clamp((width ?? 0) * 0.8, 200, 400);

  useDimensions(); // TODO TMP Only to trigger re-render.

  const {
    nearestX,
    nearestY,

    histogram1,
    histogram2,

    cumulative1,
    cumulative2,

    boxWidth1,
    boxWidth2,

    boxOffset1,
    boxOffset2,

    toggleDisplay,
  } = useKpiChart(props);

  return (
    <div
      ref={setContainer}
      className={"kpi-chart w-full"}
    >
      <div><code>[1]</code><span>{current1?.x.toFixed(2)} - {current1?.y.toFixed(2)}</span></div>
      <div><code>[2]</code><span>{current2?.x.toFixed(2)} - {current2?.y.toFixed(2)}</span></div>

      {!width && (
        <div className={"w-full min-h-[200px] max-h-[400px] overflow-hidden bg-stone-100 animate-pulse"}>
          <div className={"w-full pb-[100%] text-center"}>
            <p className={"p-4"}>Loading...</p>
          </div>
        </div>
      )}

      {width && (
        <ChartCurvesWithHistograms
          width={width}
          height={height}

          histogram1={histogram1}
          histogram2={histogram2}

          curve1={cumulative1}
          curve2={cumulative2}

          // onHistogram1Change={nop}
          onHistogram2Change={setCurrent1}

          // onCurve1Change={nop}
          onCurve2Change={setCurrent2}

          histogram1BaseLine={0}
          histogram2BaseLine={0}

          boxWidth1={boxWidth1}
          boxWidth2={boxWidth2}

          boxOffset1={boxOffset1}
          boxOffset2={boxOffset2}

          cursorDefaultX={18.4}
          atMostMinY={0}

          nearestXLegend={nearestX}
          nearestYLegend={nearestY}

          renderXLegend={hour}
          renderYLegend={euro}
        />
      )}

      {width && (
        <div
          className="absolute bottom-0 right-0 bg-blue-900 cursor-pointer"
          onClick={toggleDisplay}
        >
          dada
        </div>
      )}
    </div>
  );
}
