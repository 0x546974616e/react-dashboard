import { ReactNode, memo, useMemo } from "react";
import { ChartContext } from "Application/contexts";
import { div0 } from "Application/utils";
import { ChartTransform } from "./ChartTransform";

export interface ChartSvgProps {
  w: number,
  h: number,

  pt: number,
  pb: number,

  pl: number,
  pr: number,

  vx1: number,
  vy1: number,

  vx2: number,
  vy2: number,

  children?: ReactNode,
  className?: string,

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
      className,
      debug,
    }: ChartSvgProps
  ): JSX.Element
{
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className={className}
    >
      {debug && (
        <g id="debug-rect">
          <rect
            x={0} y={0}
            width={w}
            height={h}
            fill={"#ff000022"}
          />
          <rect
            x={pl} y={pt}
            width={w - pl - pr}
            height={h - pt - pb}
            fill={"#ff000044"}
          />
        </g>
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
    </svg>
  );
}
