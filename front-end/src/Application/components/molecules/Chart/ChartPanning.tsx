import {
  PointerEvent,
  ReactNode,
  memo,
  useCallback,
  useRef,
  useState,
} from "react";

import { ChartRect } from "Application/components/atoms";
import { ChartPanningContext, useChartContext } from "Application/contexts";
import { Position } from "Application/types";
import { clamp } from "Application/utils";

export interface ChartPanningProps {
  onStart?: (position: Position) => void,
  onMove?: (position: Position) => void,
  onStop?: (position: Position) => void,
  children?: ReactNode,
}

export const ChartPanning = memo(_ChartPanning);

function _ChartPanning(
    { children,
      onStart,
      onMove,
      onStop,
    }: ChartPanningProps
  ): JSX.Element
{
  const {
    x1, y1,
    x2, y2,
    ix, iy,
  } = useChartContext();

  const pointer = useRef<number | null>(null);
  const [ position, setPosition ] = useState<Position | null>(null);

  const normalize = useCallback(
    (event: PointerEvent<SVGGElement>): Position | null => {
      const { ownerSVGElement } = event.currentTarget;
      if (!ownerSVGElement) {
        return null;
      }

      const { top, left } = ownerSVGElement.getBoundingClientRect();

      const cx = ix(event.clientX - left);
      const cy = iy(event.clientY - top);

      const x = clamp(cx, x1, x2);
      const y = clamp(cy, y1, y2);

      return { x, y };
    }, [
      x1, y1,
      x2, y2,
      ix, iy,
    ]
  );

  const _onStart = useCallback(
    (event: PointerEvent<SVGGElement>) => {
      event.preventDefault();
      if (pointer.current == null || event.pointerId == pointer.current) {
        event.currentTarget.setPointerCapture(pointer.current = event.pointerId);

        if (event.pointerType == "mouse") {
          const position = normalize(event);
          position && onStart?.(position);
          setPosition(position);
        }
      }
    },
    [ normalize ]
  );

  const _onStop = useCallback(
    (event: PointerEvent<SVGGElement>) => {
      event.preventDefault();
      if (event.pointerId == pointer.current) {
        if (event.currentTarget.hasPointerCapture(pointer.current)) {
          event.currentTarget.releasePointerCapture(pointer.current);
          pointer.current = null;
        }

        const position = normalize(event);
        position && onStop?.(position);
        setPosition(null);
      }
    },
    [ normalize ]
  );

  const _onMove = useCallback(
    (event: PointerEvent<SVGGElement>) => {
      event.preventDefault();
      if (event.pointerId == pointer.current) {
        const position = normalize(event);
        position && onMove?.(position);
        setPosition(position);
      }
    },
    [ normalize ]
  );

  return (
    <g
      // This prevents horizontal panning.
      className={"chart-panning touch-pan-y touch-pinch-zoom"}

      onPointerDown={_onStart}
      onPointerMove={_onMove}
      onPointerUp={_onStop}
      onPointerCancel={_onStop}
      // onPointerLeave={onPointerUp}
      // onPointerEnter={onPointerUp}
    >
      <ChartRect
        x={x1}
        y={y1}
        w={x2 - x1}
        h={y2 - y1}
        fill={"rgb(0, 0, 0, 0)"}
        stroke={"none"}
      />

      <ChartPanningContext.Provider value={position}>
        {children}
      </ChartPanningContext.Provider>
    </g>
  );
}
