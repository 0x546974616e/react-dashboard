import { useCallback, useState } from "react";

import { clamp } from "Application/utils";
import { useDimensions } from "Application/hooks";
import { ChartLine, ChartRect, ChartSvg, ChartText, ChartTransform } from "Application/components/atoms";
import { ChartGrid } from "Application/components/molecules";
import { ChartContext } from "Application/contexts";

export interface KpiChartProps {
  // onXLegend()
  // nearestXLegend= [nearest, offset] | nearest
  // (offsetXLength  ^)
}

const STROKE_WIDTH = 10;

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
  const stroke = 20;

  return (
    <ChartSvg
      w={width}
      h={height}

      pt={STROKE_WIDTH}
      pb={STROKE_WIDTH}

      pl={STROKE_WIDTH}
      pr={STROKE_WIDTH}

      vx1={0}
      vy1={0}

      vx2={1000}
      vy2={1000}

      debug
    >
      <ChartGrid
        x={200}
        y={200}

        w={700}
        h={600}

        minX={-1.2}
        maxX={7.3}
        offsetXLegend={1}
        nearestXLegend={1.75}
        // nearestXLegend={5.75}
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
    </ChartSvg>
  );
}
