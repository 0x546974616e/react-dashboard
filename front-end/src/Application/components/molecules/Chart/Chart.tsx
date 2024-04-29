import { PointerEvent, ReactNode, createElement, memo, useCallback, useMemo, useRef } from "react";
import { ChartContext } from "./ChartContext";

export interface ChartProps {
  children?: ReactNode,
  onMove?(vx: number, vy: number): void,
  width: number | number,
  height: number | number,
  viewBoxWidth: number,
  viewBoxHeight: number,
  inset?: number,
  debug?: boolean,
}

export function Chart(props: ChartProps): JSX.Element {
  return createElement( _Chart, props); // TMP
}

const _Chart = memo(Svg);

function Svg(
    { children,
      onMove,
      width,
      height,
      viewBoxWidth,
      viewBoxHeight,
      inset,
      debug,
    }: ChartProps
  ): JSX.Element
{
  inset ??= 0;

  const pointer = useRef<number | null>(null);

  const onPointerMove = useCallback(
    (event: PointerEvent<SVGSVGElement>) => {
      if (event.pointerId == pointer.current && onMove) {
        const { top, left } = event.currentTarget.getBoundingClientRect();

        const cx = event.clientX - left;
        const cy = event.clientY - top;

        const sx = clamp(cx, inset!, width - inset!) - inset!;
        const sy = clamp(cy, inset!, height - inset!) - inset!;

        const vx = sx / (width - 2 * inset!) * viewBoxWidth;
        const vy = sy / (height - 2 * inset!) * viewBoxHeight;

        onMove(vx, vy);
      }
    }, [
      width,
      height,
      viewBoxWidth,
      viewBoxHeight,
      onMove,
    ]
  );

  const onPointerDown = useCallback(
    (event: PointerEvent<SVGSVGElement>) => {
      if (pointer.current != null) {
        event.currentTarget.releasePointerCapture(pointer.current);
      }

      event.currentTarget.setPointerCapture(
        pointer.current = event.pointerId
      );

      onPointerMove(event);
    },
    [ onPointerMove ]
  );

  const onPointerUp = useCallback(
    (event: PointerEvent<SVGSVGElement>) => {
      if (event.pointerId == pointer.current) {
        event.currentTarget.releasePointerCapture(pointer.current);
        pointer.current = null;
      }
    }, []
  );

  return (
    <ChartContext.Provider
      value={
        useMemo(
          () => ({
            nw: (value) => value / viewBoxWidth * (width - 2 * inset!) + inset!,
            nh: (value) => value / viewBoxHeight * (height - 2 * inset!) + inset!,
            vw: viewBoxWidth,
            vh: viewBoxWidth,
            inset: inset!,
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
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerEnter={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
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

// ╔╦╗┌─┐┬─┐┌─┐┌─┐
// ║║║├┤ ├┬┘│ ┬├┤
// ╩ ╩└─┘┴└─└─┘└─┘

/* eslint-disable import/first */
import { Circle as _Circle } from "./elements/Circle";
import { Group as _Group } from "./elements/Group";
import { Line as _Line } from "./elements/Line";
import { Path as _Path } from "./elements/Path";
import { Polygon as _Polygon } from "./elements/Polygon";
import { Rect as _Rect } from "./elements/Rect";
import { Text as _Text } from "./elements/Text";
import { clamp } from "Application/utils";

export namespace Chart {
  export const Circle = _Circle;
  export const Group = _Group;
  export const Line = _Line;
  export const Path = _Path;
  export const Polygon = _Polygon;
  export const Rect = _Rect;
  export const Text = _Text;
}
