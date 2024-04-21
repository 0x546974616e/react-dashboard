import { getWindowYScroll, getWindowYScrollPercentage } from "Application/utils";
import { useEffect, useMemo, useState } from "react";

export interface ScrollPosition {
  y: number,
  yp: number,
}

export function getScrollPosition() {
  return {
    y: getWindowYScroll(),
    yp: getWindowYScrollPercentage(),
  };
}

export function useScrollPosition(
    callback?: (scroll: { y: number, yp: number }) => void
  ): ScrollPosition
{
  const [ position, setPosition ] = (
    useState<ScrollPosition>(
      useMemo(getScrollPosition, [])
    )
  );

  useEffect(
    () => {
      function onScroll() {
        const position = getScrollPosition();
        callback?.(position);
        setPosition(
          (current) => (
            position.y != current.y || position.yp != current.yp
              ? position
              : current
          )
        );
      }

      onScroll();
      window.addEventListener("scroll", onScroll);
      window.addEventListener("resize", onScroll);

      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    }, []
  );

  return position;
}
