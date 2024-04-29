import { useCallback, useRef, useState } from "react";

function preventDefault(event: Event | TouchEvent) {
  if ("touches" in event && event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
}

/**
 *
 * @source https://stackoverflow.com/a/48057286
 */
export function useLongPress(
    onPress: ((event: MouseEvent | TouchEvent) => void) | undefined,
    onLongPress: ((event: MouseEvent | TouchEvent) => void) | undefined,
    { shouldPreventDefault = true, delay = 300 }: {
      shouldPreventDefault?: boolean,
      delay?: number,
    }
  )
{
  const target = useRef<EventTarget>();
  const timeout = useRef<NodeJS.Timeout>();

  const [ longPressTriggered, setLongPressTriggered ] = useState(false);

  const start = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (shouldPreventDefault && event.target) {
        target.current = event.target;
        event.target.addEventListener(
          "touchend", preventDefault, {
            passive: false,
          }
        );
      }

      timeout.current = setTimeout(
        () => {
          onLongPress?.(event);
          setLongPressTriggered(true);
        },
        delay
      );
    },
    [ onLongPress, shouldPreventDefault, delay ]
  );

  const clear = useCallback(
    (event: MouseEvent | TouchEvent, shouldTriggerClick = true) => {
      timeout.current && clearTimeout(timeout.current);
      shouldTriggerClick && !longPressTriggered && onPress?.(event);
      setLongPressTriggered(false);

      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener("touchend", preventDefault);
      }
    },
    [ onPress, shouldPreventDefault, longPressTriggered ]
  );

  return {
    onMouseDown: (event: any) => start(event),
    onMouseLeave: (event: any) => clear(event, false),
    onMouseUp: (event: any) => clear(event),

    onTouchStart: (event: any) => start(event),
    onTouchEnd: (event: any) => clear(event),
  };
};
