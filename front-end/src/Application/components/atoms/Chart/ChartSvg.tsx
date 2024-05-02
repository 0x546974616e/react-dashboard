import { ReactNode, memo, useMemo } from "react";
import { ChartContext } from "Application/contexts";

export interface ChartSvgProps {
  width: number | number,
  height: number | number,
  inset?: number,
  viewBoxWidth: number,
  viewBoxHeight: number,
  children?: ReactNode,
  debug?: boolean,
}

export const ChartSvg = memo(_ChartSvg);

function _ChartSvg(
    { width,
      height,
      inset,
      viewBoxWidth,
      viewBoxHeight,
      children,
      debug,
    }: ChartSvgProps
  ): JSX.Element
{
  inset ??= 0;

  return (
    <ChartContext.Provider
      value={
        useMemo(
          () => ({
            nw: (value) => value / viewBoxWidth * (width - 2 * inset!) + inset!,
            nh: (value) => value / viewBoxHeight * (height - 2 * inset!) + inset!,
            vw: viewBoxWidth,
            vh: viewBoxHeight,
          }), [
            width,
            height,
            viewBoxWidth,
            viewBoxHeight,
            inset,
          ]
        )
      }
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        {debug && (
          <g id="debug-rect">
            <rect
              x={0} y={0}
              width={width}
              height={height}
              fill={"#ff000022"}
            />
            <rect
              x={inset} y={inset}
              width={width - 2 * inset}
              height={height - 2 * inset}
              fill={"#ff000044"}
            />
          </g>
        )}
        {children}
      </svg>
    </ChartContext.Provider>
  );
}
