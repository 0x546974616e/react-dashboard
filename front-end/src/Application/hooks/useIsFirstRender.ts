import { useEffect, useRef } from "react";

export function useIsFirstRender(): boolean {
  const first = useRef(true);

  // When using the StrictMode then it's important to do some useEffect() reset/cleanup.
  // https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development

  useEffect(
    () => {
      if (first.current) {
        first.current = false;
      }

      return () => {
        first.current = true;
      };
    }, []
  );

  return first.current;
}
