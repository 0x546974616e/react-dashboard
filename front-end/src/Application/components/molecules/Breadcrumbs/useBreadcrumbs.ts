import { useReducer, useState } from "react";
import { useDimensions, useIsFirstRender } from "Application/hooks";

export function useBreadcrumbs() {
  useDimensions(); // Only to trigger re-render.

  const [ parent, setParent ] = useState<HTMLDivElement | null>(null);
  const width = parent?.getBoundingClientRect().width ?? 0;

  interface Widths {
    allWidths: number[],
    totalWidth: number,
  }

  interface Action {
    index: number,
    width: number,
  }

  let [ { totalWidth, allWidths }, updateWidth ] = useReducer(
    ({ allWidths, totalWidth }: Widths, { index, width }: Action) => {
      totalWidth += width - (allWidths[index] ?? 0);
      allWidths[index] = width;

      return { allWidths, totalWidth };
    }, {
      allWidths: [],
      totalWidth: 0,
    }
  );

  return {
    setParent,
    parentWidth: width,
    allUnitWidths: allWidths,
    unitWidthsTotal: totalWidth,
    updateUnitWidth: updateWidth,
    firstRender: useIsFirstRender(),
  };
}
