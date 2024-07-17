import { ReactNode, memo } from "react";
import { G, Rect, Svg } from "react-native-svg";

import { ChartTransform } from "./ChartTransform";

export interface ChartSvgProps {
  w: number, // width
  h: number, // height

  pt: number, // padding-top
  pb: number, // paddint-botoom

  pl: number, // padding-left
  pr: number, // padding-right

  vx1: number, // viewBox x1
  vy1: number, // viewBox y1

  vx2: number, // viewBox x2
  vy2: number, // viewBox y2

  children?: ReactNode,
  debug?: boolean,
}

export const ChartSvg = memo(_ChartSvg);

function _ChartSvg(
    { w, h,
      pt, pb,
      pl, pr,
      vx1, vy1,
      vx2, vy2,
      children,
      debug,
    }: ChartSvgProps
  ): JSX.Element
{
  return (
    <Svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
    >
      {debug && (
        <G>
          <Rect
            x={0} y={0}
            width={w}
            height={h}
            fill={"#ff000022"}
          />

          <Rect
            x={pl} y={pt}
            width={w - pl - pr}
            height={h - pt - pb}
            fill={"#ff000044"}
          />
        </G>
      )}

      <ChartTransform
        x1={pl}
        x2={w - pr}

        y1={pt}
        y2={h - pb}

        vx1={vx1}
        vy1={vy1}

        vx2={vx2}
        vy2={vy2}
      >
        {children}
      </ChartTransform>
    </Svg>
  );
}
