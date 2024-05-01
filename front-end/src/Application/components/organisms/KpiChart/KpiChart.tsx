import { useState } from "react";

import { clamp } from "Application/utils";
import { Chart } from "Application/components";
import { useDimensions } from "Application/hooks";

export interface KpiChartProps {
  // onXLegend()
  // nearestXLegend= [nearest, offset] | nearest
  // (offsetXLength  ^)
}

export function KpiChart(): JSX.Element {
  const [ width, setWidth ] = useState<number | null>(null);
  const { height: screenHeight } = useDimensions();
  const height = clamp(screenHeight * 0.6, 200, 600);

  return (
    <div
      className={"w-full"}
      ref={
        (element) => {
          if (element) {
            setWidth(element.getBoundingClientRect().width);
          }
        }
      }
    >
      {width == null && (
        <div
          className={"w-full bg-red-100"}
          style={{ height }}
        >
          Skeletton
        </div>
      )}

      {width != null && (
        <_KpiChart
          width={width}
          height={height}
        />
      )}
    </div>
  );
}

function _KpiChart(
    { width, height }: {
      width: number,
      height: number,
    }
  ): JSX.Element
{
  const w = 130;
  const h = 250;
  const stroke = 20;

  return (
    <Chart
      width={width}
      height={height}
      viewBoxWidth={w}
      viewBoxHeight={h}
      inset={stroke}
    >
      <Chart.Line
        x1={w * 0.25} y1={h * 0.75}
        x2={w * 0.75} y2={h * 0.25}
        stroke={"blue"}
        strokeWidth={stroke}
        strokeLinecap={"round"}
      />
      <Chart.Line
        x1={0} y1={0}
        x2={w} y2={h}
        stroke={"red"}
        strokeWidth={stroke}
        strokeLinecap={"round"}
      />
      <Chart.Text
        x={w / 2}
        y={h / 2}
        textAnchor="middle"
        dominantBaseline={"middle"}
        alignmentBaseline={"middle"}
      >
        dada dadada
      </Chart.Text>
      <Chart.Grid
        x={0.25 * w}
        y={0.25 * h}
        w={w * 0.25}
        h={h * 0.25}
      >
        <Chart.Line
          x1={0} y1={0}
          x2={w} y2={h}
          stroke={"gray"}
          strokeWidth={5}
          strokeLinecap={"round"}
        />
      </Chart.Grid>
      <Chart.Transform
        x={0.50 * w}
        y={0.25 * h}
        w={w * 0.25}
        h={h * 0.25}
        vw={w}
        vh={h}
      >
        <Chart.Line
          x1={0} y1={0}
          x2={w} y2={h}
          stroke={"cyan"}
          strokeWidth={5}
          strokeLinecap={"round"}
        />
        <Chart.Line
          x1={w} y1={0}
          x2={0} y2={h}
          stroke={"cyan"}
          strokeWidth={5}
          strokeLinecap={"round"}
        />
      </Chart.Transform>
      <Chart.Transform
        x={0.50 * w}
        y={0.75 * h}
        w={w * 0.25}
        h={h * 0.25}
        vw={3} vh={2}
        // inset={0}
      >
        <Chart.Line
          x1={3 * 0.25} y1={2 * 0.75}
          x2={3 * 0.75} y2={2 * 0.25}
          stroke={"green"}
          strokeWidth={stroke}
          strokeLinecap={"round"}
        />
        <Chart.Line
          x1={0} y1={0}
          x2={3} y2={2}
          stroke={"magenta"}
          strokeWidth={stroke}
          strokeLinecap={"round"}
        />
        <Chart.Text
          x={3 / 2}
          y={2 / 2}
          textAnchor="middle"
          dominantBaseline={"middle"}
          alignmentBaseline={"middle"}
        >
          dada dadada
        </Chart.Text>
      </Chart.Transform>
    </Chart>
  );
}
