import { useCallback, useState } from "react";

import { clamp } from "Application/utils";
import { useDimensions } from "Application/hooks";
import { ChartLine, ChartSvg, ChartText, ChartTransform } from "Application/components/atoms";
import { ChartGrid } from "Application/components/molecules";

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
    <ChartSvg
      width={width}
      height={height}
      viewBoxWidth={w}
      viewBoxHeight={h}
      inset={stroke}
    >
      <ChartLine
        x1={w * 0.25} y1={h * 0.75}
        x2={w * 0.75} y2={h * 0.25}
        stroke={"blue"}
        strokeWidth={stroke}
        strokeLinecap={"round"}
      />

      <ChartLine
        x1={0} y1={0}
        x2={w} y2={h}
        stroke={"red"}
        strokeWidth={stroke}
        strokeLinecap={"round"}
      />

      <ChartText
        x={w / 2}
        y={h / 2}
        textAnchor="middle"
        dominantBaseline={"middle"}
        alignmentBaseline={"middle"}
      >
        dada dadada
      </ChartText>

      <ChartGrid
        x={0.25 * w}
        y={0.25 * h}
        w={w * 0.75}
        h={h * 0.75}

        minX={-1.2}
        maxX={7.3}
        offsetXLegend={1}
        nearestXLegend={1.75}
        renderXLegend={useCallback((v: number) => `${v.toFixed(2)} €`, [])}

        minY={-1500}
        maxY={89652}
        offsetYLegend={23}
        nearestYLegend={12345}
        renderYLegend={useCallback((v: number) => `${v.toFixed(2)} km/s`, [])}
      >
        <ChartLine
          x1={-1.2} y1={-1500}
          x2={7.3} y2={89652}
          stroke={"magenta"}
          strokeWidth={5}
          strokeLinecap={"round"}
        />
      </ChartGrid>

      <ChartTransform
        x={0.50 * w}
        y={0.25 * h}
        w={w * 0.25}
        h={h * 0.25}
        vw={w}
        vh={h}
      >
        <ChartLine
          x1={0} y1={0}
          x2={w} y2={h}
          stroke={"cyan"}
          strokeWidth={5}
          strokeLinecap={"round"}
        />

        <ChartLine
          x1={w} y1={0}
          x2={0} y2={h}
          stroke={"cyan"}
          strokeWidth={5}
          strokeLinecap={"round"}
        />
      </ChartTransform>

      <ChartTransform
        x={0.50 * w}
        y={0.75 * h}
        w={w * 0.25}
        h={h * 0.25}
        vw={3} vh={2}
      >
        <ChartLine
          x1={3 * 0.25} y1={2 * 0.75}
          x2={3 * 0.75} y2={2 * 0.25}
          stroke={"green"}
          strokeWidth={stroke}
          strokeLinecap={"round"}
        />

        <ChartLine
          x1={0} y1={0}
          x2={3} y2={2}
          stroke={"magenta"}
          strokeWidth={stroke}
          strokeLinecap={"round"}
        />

        <ChartText
          x={3 / 2}
          y={2 / 2}
          textAnchor="middle"
          dominantBaseline={"middle"}
          alignmentBaseline={"middle"}
        >
          dada dadada
        </ChartText>
      </ChartTransform>
    </ChartSvg>
  );
}
