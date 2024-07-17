import {
  PointerEvent,
  ReactNode,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

import { G } from "react-native-svg";

import { ChartPanningContext, useChartContext } from "@app/contexts";
import { ChartRect } from "@app/components/atoms";
import { Position } from "@app/types";
import { clamp } from "@app/utils";
// import { PanResponder } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
// import { useSharedValue } from "react-native-reanimated";

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

  // const dada = useMemo(
  //   () => {
  //     return PanResponder.create({
  //       onStartShouldSetPanResponder: () => true,
  //       onMoveShouldSetPanResponder: () => true,
  //       onPanResponderMove: (event) => console.log(event),
  //       onPanResponderRelease: (event) => console.log(event),
  //       onPanResponderGrant: (event) => console.log(event),
  //     });
  //   }, []
  // );

  const group = useRef<G<any>>(null);

  // const start = useRef<{ x: number, y: number }>({})

  const gesture = Gesture.Pan()
    .onBegin((e) => {
      console.log("start")
      // isPressed.value = true;
    })
    .onUpdate((e) => {
      console.log("move")
      // offset.value = {
      //   x: e.translationX + start.value.x,
      //   y: e.translationY + start.value.y,
      // };
      // console.log(e.x)
      // group.current?.
    })
    .onEnd(() => {
      console.log("end")
      // onStop(null)
      // start.value = {
      //   x: offset.value.x,
      //   y: offset.value.y,
      // };
    })
    .onFinalize(() => {
      console.log("the end")
      // isPressed.value = false;
    });



/*
    const initialTouchLocation = useRef<{ x: number, y: number } | null>(null);
    const panGesture = Gesture.Pan()
      // .manualActivation(true)
      .onBegin((evt) => {
        initialTouchLocation.current = { x: evt.x, y: evt.y };
      })
      .onTouchesMove((evt, state) => {
        // Sanity checks
        if (!initialTouchLocation.current || !evt.changedTouches.length) {
          // state.fail();
          return;
        }

        const xDiff = Math.abs(evt.changedTouches[0]!.x - initialTouchLocation.current.x);
        const yDiff = Math.abs(evt.changedTouches[0]!.y - initialTouchLocation.current.y);
        const isHorizontalPanning = xDiff > yDiff;

        if (isHorizontalPanning) {
          state.activate();
        } else {
          // state.fail();
        }
      })
      .onStart(() => console.log('Horizontal panning begin'))
      .onUpdate(() => console.log('Pan change'))
      .onEnd(() => console.log('No cleanup required!'));
 */

  return (
    // <GestureDetector gesture={gesture}>
    <G
      // TODO: Do like the <Swipeable/> react-native-gesture-handler with the left/right actions.
      // TODO: Do like the <Swipeable/> react-native-gesture-handler with the left/right actions.
      // TODO: Do like the <Swipeable/> react-native-gesture-handler with the left/right actions.

      ref={group}
      // {...dada.panHandlers}

      // This prevents horizontal panning.
      // className={"chart-panning touch-pan-y touch-pinch-zoom"}

      // onPointerDown={_onStart}
      // onPointerMove={_onMove}
      // onPointerUp={_onStop}
      // onPointerCancel={_onStop}

      // onPointerLeave={onPointerUp}
      // onPointerEnter={onPointerUp}
    >
      <ChartRect
        x={x1}
        y={y1}
        w={x2 - x1}
        h={y2 - y1}
        fill={"green"}
        stroke={"none"}
      />

      <ChartPanningContext.Provider value={position}>
        {children}
      </ChartPanningContext.Provider>
    </G>
    // </GestureDetector>
  );
}
