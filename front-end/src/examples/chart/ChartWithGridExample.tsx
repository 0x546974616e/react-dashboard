import { useCallback, useState } from "react";

import { clamp } from "@app/utils";
import { useDimensions } from "@app/hooks";
import { ChartCircle, ChartLine, ChartSvg, ChartText } from "@app/components/atoms";
import { ChartGrid, ChartPanning } from "@app/components/molecules";
import { Position } from "@app/types";
import { View } from "react-native";

const STROKE_WIDTH = 10;

export function ChartWithGridExample(): JSX.Element {
  const { width } = useDimensions();
  return (
    <View>
      <_ChartWithGridExample
        height={clamp((width) * 0.8, 200, 400)}
        width={width * 0.8}
      />
    </View>
  );
}

function _ChartWithGridExample(
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

        stroke={"red"}
        strokeWidth={1}

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
        renderYLegend={
          useCallback(
            (v: number) => `${v.toFixed(2)} km/s`, []
          )
        }
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
          >
            Ici et là
          </ChartText>
        </ChartPanning>
      </ChartGrid>
    </ChartSvg>
  );
}
