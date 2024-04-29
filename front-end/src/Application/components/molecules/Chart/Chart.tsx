import { PointerEvent, ReactNode, createElement, memo, useCallback, useMemo, useRef } from "react";
import { ChartContext } from "./ChartContext";

export interface ChartProps {
  children?: ReactNode,
  onMouseMove?(pointer: { vx: number, vy: number }): void,
  onMouseDown?(pointer: { vx: number, vy: number }): void,
  onMouseUp?(pointer: { vx: number, vy: number }): void,
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
      onMouseMove,
      onMouseDown,
      onMouseUp,
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

  const normalizeToViewBox = useCallback(
    (event: PointerEvent<SVGSVGElement>) => {
      const { top, left } = event.currentTarget.getBoundingClientRect();

      const cx = event.clientX - left;
      const cy = event.clientY - top;

      const sx = clamp(cx, inset!, width - inset!) - inset!;
      const sy = clamp(cy, inset!, height - inset!) - inset!;

      const vx = sx / (width - 2 * inset!) * viewBoxWidth;
      const vy = sy / (height - 2 * inset!) * viewBoxHeight;

      return { vx, vy };
    }, [
      width,
      height,
      viewBoxWidth,
      viewBoxHeight,
      inset,
    ]
  );

  const onPointerDown = useCallback(
    (event: PointerEvent<SVGSVGElement>) => {
      event.preventDefault();
      event.currentTarget.classList.remove("touch-pan-y", "touch-pinch-zoom");

      if (pointer.current == null || event.pointerId == pointer.current) {
        event.currentTarget.setPointerCapture(pointer.current = event.pointerId);

        if (onMouseDown && event.pointerType != "touch") {
          onMouseDown(normalizeToViewBox(event));
        }
      }
    },
    [ normalizeToViewBox ]
  );

  const onPointerUp = useCallback(
    (event: PointerEvent<SVGSVGElement>) => {
      event.preventDefault();
      event.currentTarget.classList.add("touch-pan-y", "touch-pinch-zoom");

      if (event.pointerId == pointer.current) {
        if (event.currentTarget.hasPointerCapture(pointer.current)) {
          event.currentTarget.releasePointerCapture(pointer.current);
          pointer.current = null;
        }

        if (onMouseUp) {
          onMouseUp(normalizeToViewBox(event));
        }
      }
    },
    [ normalizeToViewBox ]
  );

  const onPointerMove = useCallback(
    (event: PointerEvent<SVGSVGElement>) => {
      event.preventDefault();

      if (event.pointerId == pointer.current && onMouseMove) {
        onMouseMove(normalizeToViewBox(event));
      }
    },
    [ normalizeToViewBox ]
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
        // onPointerLeave={onPointerUp}
        // onPointerEnter={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        className={"select-none touch-pan-y touch-pinch-zoom"}
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
