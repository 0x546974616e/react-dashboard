import { memo } from "react";
import { ChartContext } from "Application/contexts";
import { ChartRectTheme } from "Application/theme";

export interface ChartRectProps extends
  Pick<JSX.IntrinsicElements["rect"],
    | "fill"
    | "stroke"
    | "strokeWidth"
    | "strokeLinecap"
    | "className"
  >
{
  x: number,
  y: number,
  w: number,
  h: number,

  animated?: boolean,
}

export const ChartRect = memo(_ChartRect);

function _ChartRect(
    { x, y, w, h,
      fill,
      stroke,
      strokeWidth,
      strokeLinecap,
      className,
      animated,
    }: ChartRectProps
  ): JSX.Element
{
  return (
    <ChartContext.Consumer>
      {({ nx, ny, nw, nh }) => {
        const ww = nw(w);
        const hh = nh(h);

        const fromY = ny(y);

        return (
          <rect
            x={nx(x) + (ww < 0 ? ww : 0)}
            y={fromY + (hh < 0 ? hh : 0)}
            width={Math.abs(ww)}
            height={Math.abs(hh)}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap}
            className={className}
          >
            {animated && hh < 0 && (
              <animate
                from={fromY}
                to={fromY + hh}
                attributeName={"y"}
                calcMode={"spline"}
                keySplines={ChartRectTheme.splines}
                dur={ChartRectTheme.duration}
                repeatCount={1}
                fill={"freeze"}
              />
            )}

            {animated && (
              <animate
                from={0}
                to={Math.abs(hh)}
                attributeName={"height"}
                calcMode={"spline"}
                keySplines={ChartRectTheme.splines}
                dur={ChartRectTheme.duration}
                repeatCount={1}
                fill={"freeze"}
              />
            )}
          </rect>
        );
      }}
    </ChartContext.Consumer>
  );
}
