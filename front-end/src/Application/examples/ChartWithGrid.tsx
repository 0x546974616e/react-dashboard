import { useCallback, useState } from "react";

import { clamp } from "Application/utils";
import { useDimensions } from "Application/hooks";
import { ChartCircle, ChartLine, ChartSvg, ChartText } from "Application/components/atoms";
import { ChartGrid, ChartPanning } from "Application/components/molecules";
import { Position } from "Application/types";

const STROKE_WIDTH = 10;

export function ChartWithGrid(): JSX.Element {
  // A state is used instead a ref to prevent multiple re-render.
  const [ container, setContainer ] = useState<HTMLDivElement | null>(null);

  const { height: screenHeight } = useDimensions();
  const width = container?.getBoundingClientRect().width ?? null;
  const height = clamp(screenHeight * 0.6, 200, 600);

  return (
    <div
      className={"w-full"}
      ref={(element) => setContainer(element)}
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
        <_ChartWithGrid
          width={width}
          height={height}
        />
      )}
    </div>
  );
}

function _ChartWithGrid(
    { width, height }: {
      width: number,
      height: number,
    }
  ): JSX.Element
{
  const [ position, setPosition ] = useState(Position.ZERO);

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
        debug

        x={200}
        y={200}

        w={700}
        h={600}

        minX={-1.2}
        maxX={7.3}
        offsetXLegend={1}
        nearestXLegend={1.75}
        // nearestXLegend={5.75}
        renderXLegend={
          useCallback(
            (v: number, i: number) => (
              i % 2 ? null : `${v.toFixed(2)} €`
            ), []
          )
        }

        minY={-1500}
        maxY={89652}
        offsetYLegend={23}
        nearestYLegend={12345}
        // nearestYLegend={50000}
        renderYLegend={useCallback((v: number) => `${v.toFixed(2)} km/s`, [])}
      >
        <ChartPanning
          onStart={setPosition}
          onMove={setPosition}
        >
          <ChartLine
            x1={-1.2} y1={-1500}
            x2={7.3} y2={89652}
            stroke={"magenta"}
            strokeWidth={5}
            strokeLinecap={"round"}
          />

          <ChartCircle
            r={10}
            cx={position.x}
            cy={position.y}
            fill={"red"}
          />

          <ChartText
            x={position.x}
            y={position.y}
            fill={"yellow"}
            textAnchor={"middle"}
            alignmentBaseline={"middle"}
            dominantBaseline={"middle"}
          >
            Ici et là
          </ChartText>
        </ChartPanning>
      </ChartGrid>
    </ChartSvg>
  );
}
