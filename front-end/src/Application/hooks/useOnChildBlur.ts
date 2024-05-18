import { FocusEvent, useCallback } from "react";

export function useOnChildBlur(onBlur: () => void) {
  return useCallback(
    // https://muffinman.io/blog/catching-the-blur-event-on-an-element-and-its-children/
    (event: FocusEvent<HTMLDivElement>) => {
      const currentTarget = event.currentTarget;
      // Give browser time to focus the next element.
      requestAnimationFrame(() => {
        // Check if the new focused element is a child of the original container.
        if (!currentTarget.contains(document.activeElement)) {
          onBlur?.();
        }
      });
    },
    []
  );
}
