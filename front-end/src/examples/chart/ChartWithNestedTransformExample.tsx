import { useState } from "react";
import { View } from "react-native";

import { clamp } from "@app/utils";
import { useDimensions } from "@app/hooks";
import { ChartContext } from "@app/contexts";

import {
  ChartLine,
  ChartRect,
  ChartSvg,
  ChartTransform,
} from "@app/components/atoms";

export function ChartWithNestedTransformsExample(): JSX.Element {
  const { width } = useDimensions();
  return (
    <View>
      <_ChartWithNestedTransformExample
        height={clamp((width) * 0.8, 200, 400)}
        width={width * 0.8}
      />
    </View>
  );
}

function _ChartWithNestedTransformExample(
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

      pt={10}
      pb={30}

      pl={40}
      pr={20}

      vx1={-10}
      vy1={20}

      vx2={100}
      vy2={70}

      debug
    >
      <ChartRect
        x={(-10 + 100) / 2}
        y={(20 + 70) / 2}

        w={(100 - -10) / 2}
        h={(70 - 20) / 2}

        fill={"green"}
      />

      <ChartRect
        x={-10 + (100 + 10) * 0.25}
        y={20 + (70 - 20) * 0.25}

        w={(100 - -10) * 0.25}
        h={(70 - 20) * 0.25}

        fill={"#ff00ff"}
      />

      <ChartContext.Consumer>
        {({ ix, iy, iw, ih }) => (
          <ChartRect
            x={ix(275)}
            y={iy(227)}

            w={iw(235)}
            h={ih(108.5)}

            fill={"#00ffff44"}
          />
        )}
      </ChartContext.Consumer>

      <ChartLine
        x1={-10}
        y1={20}

        x2={100}
        y2={70}

        stroke={"blue"}
        strokeWidth={stroke}
        strokeLinecap={"round"}
      />

      <ChartLine
        x1={(-10 + 100) / 2}
        y1={(20 + 70) / 2}

        x2={100}
        y2={70}

        stroke={"red"}
        strokeWidth={stroke / 2}
        strokeLinecap={"round"}
      />

      <ChartTransform
        x1={-10 + (100 + 10) * 0.50}
        y1={20 + (70 - 20) * 0.25}

        x2={-10 + (100 + 10) * 0.75}
        y2={20 + (70 - 20) * 0.50}

        vx1={-5}
        vx2={5}

        vy1={1200}
        vy2={2200}
      >
        <ChartRect
          x={-5 + (5 - -5) * (1 / 6)}
          y={1200 + (2200 - 1200) * (1 / 6)}

          w={(5 - -5) * (4 / 6)}
          h={(2200 - 1200) * (4 / 6)}

          fill={"yellow"}
        />

        <ChartContext.Consumer>
          {({ ix, iy, iw, ih }) => (
            <ChartRect
              x={ix(549.1666666666667)}
              y={iy(136.58333333333337)}

              w={iw(156.66666666666666)}
              h={ih(72.33333333333331)}

              fill={"#ff000044"}
            />
          )}
        </ChartContext.Consumer>

        <ChartLine
          x1={-5}
          x2={5}

          y1={1200}
          y2={2200}

          stroke={"cyan"}
          strokeWidth={10}
        />

        <ChartLine
          x1={-5 + (5 - -5) * 0.75}
          x2={-5 + (5 - -5) * 0.25}

          y1={1200 + (2200 - 1200) * 0.25}
          y2={1200 + (2200 - 1200) * 0.75}

          stroke={"red"}
          strokeWidth={5}
        />

        <ChartTransform
          x1={0}
          x2={5}
          y1={1200 - (2200 - 1200)}
          y2={1200}

          vx1={-536}
          vx2={-500}

          vy1={123456}
          vy2={789012}
        >
          <ChartRect
            x={-536 + 36 * 0.333}
            y={123456 + (789012 - 123456) * 0.333}

            w={36 * 0.666}
            h={(789012 - 123456) * 0.666}

            fill={"cyan"}
          />

          <ChartLine
            x1={-536}
            x2={-500}

            y1={123456}
            y2={789012}

            stroke={"black"}
            strokeWidth={10}
            strokeLinecap={"round"}
          />

          <ChartLine
            x1={-536}
            x2={-500}

            y1={123456}
            y2={789012}

            stroke={"gray"}
            strokeWidth={6}
            strokeLinecap={"round"}
          />

          <ChartContext.Consumer>
            {({ ix, iy, iw, ih }) => (
              <>
                <ChartRect
                  x={ix(745)}
                  y={iy(118.5)}

                  w={iw(78.25500000000001)}
                  h={ih(72.26100000000001)}

                  fill={"#00ffff44"}
                  stroke={"red"}
                />
                <ChartLine
                  x1={ix(745)}
                  x2={ix(627.5)}

                  y1={iy(118.64999999999999)}
                  y2={iy(10)}

                  stroke={"white"}
                  strokeWidth={2}
                />
              </>
            )}
          </ChartContext.Consumer>
        </ChartTransform>
      </ChartTransform>

      <ChartTransform
        x1={-10}
        y1={20}

        x2={-10 + 110 * 0.25}
        y2={70}

        vx1={-123}
        vx2={123}

        vy1={0.100}
        vy2={0.185}
      >
        <ChartRect
          x={-123}
          y={0.100 + 0.085 * 0.33333}

          w={123 * 2}
          h={0.085 * 0.33333}

          fill={"#00ff0044"}
        />

        <ChartContext.Consumer>
          {({ ix, iy, iw, ih }) => (
            <>
              <ChartRect
                x={0}
                y={0.100 + 0.085 * 0.33333}

                w={123}
                h={0.085 * 0.66666}

                fill={"#ffff0044"}
              />

              <ChartRect
                x={ix(157.5)}
                y={iy(154.86521799999997)}

                w={iw(117.5)}
                h={ih(289.73043600000005)}

                fill={"#ff880044"}
              />
            </>
          )}
        </ChartContext.Consumer>

        <ChartLine
          x1={-123}
          x2={123}

          y1={0.100}
          y2={0.185}

          stroke={"red"}
          strokeWidth={2}
        />
      </ChartTransform>
    </ChartSvg>
  );
}
