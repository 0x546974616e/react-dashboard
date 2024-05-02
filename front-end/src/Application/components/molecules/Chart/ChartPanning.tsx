import {
  PointerEvent,
  ReactNode,
  useCallback,
  useRef,
} from "react";

import { Position } from "Application/types";
import { clamp } from "Application/utils";

export interface UseHorizontalPanningProps {
  width: number,
  height: number,
  inset?: number,
  viewBoxWidth: number,
  viewBoxHeight: number,
  children?: ReactNode,
  onStart?: (position: Position) => void,
  onMove?: (position: Position) => void,
  onStop?: (position: Position) => void,
}

export function ChartPanning(
    { width,
      height,
      inset,
      viewBoxWidth,
      viewBoxHeight,
      children,
      onStart,
      onMove,
      onStop,
    }: UseHorizontalPanningProps
  ): JSX.Element
{
  inset ??= 0;

  const pointer = useRef<number | null>(null);

  const normalizeToViewBox = useCallback(
    (event: PointerEvent<HTMLDivElement>): Position => {
      const { top, left } = event.currentTarget.getBoundingClientRect();

      const cx = event.clientX - left;
      const cy = event.clientY - top;

      const sx = clamp(cx, inset!, width - inset!) - inset!;
      const sy = clamp(cy, inset!, height - inset!) - inset!;

      const x = sx / (width - 2 * inset!) * viewBoxWidth;
      const y = sy / (height - 2 * inset!) * viewBoxHeight;

      return { x, y };
    }, [
      width,
      height,
      viewBoxWidth,
      viewBoxHeight,
      inset,
    ]
  );

  const _onStart = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.currentTarget.classList.remove("touch-pan-y", "touch-pinch-zoom");

      if (pointer.current == null || event.pointerId == pointer.current) {
        event.currentTarget.setPointerCapture(pointer.current = event.pointerId);

        if (onStart && event.pointerType != "touch") {
          onStart(normalizeToViewBox(event));
        }
      }
    },
    [ normalizeToViewBox ]
  );

  const _onStop = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.currentTarget.classList.add("touch-pan-y", "touch-pinch-zoom");

      if (event.pointerId == pointer.current) {
        if (event.currentTarget.hasPointerCapture(pointer.current)) {
          event.currentTarget.releasePointerCapture(pointer.current);
          pointer.current = null;
        }

        if (onStop) {
          onStop(normalizeToViewBox(event));
        }
      }
    },
    [ normalizeToViewBox ]
  );

  const _onMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (event.pointerId == pointer.current && onMove) {
        onMove(normalizeToViewBox(event));
      }
    },
    [ normalizeToViewBox ]
  );

  return (
    <div
      style={{ width, height }}
      className={"select-none touch-pan-y touch-pinch-zoom"}

      onPointerDown={_onStart}
      onPointerMove={_onMove}
      onPointerUp={_onStop}
      onPointerCancel={_onStop}
      // onPointerLeave={onPointerUp}
      // onPointerEnter={onPointerUp}
    >
      {children}
    </div>
  );
}
