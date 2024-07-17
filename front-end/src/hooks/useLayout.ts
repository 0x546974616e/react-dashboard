import { useMemo } from "react";
import { Layout } from "@app/types";
import { useDimensions } from "./useDimensions";

/**
 * Return one of the given layout according to the current window dimensions.
 * NOTE: `availableLayouts` are consumed only once.
 * TODO: `useLayout.web.ts`?
 */
export function useLayout<const Layouts extends readonly Layout[]>(
    // Force the given layouts to have at least one element.
    availableLayouts: [] extends Layouts ? never : Layouts
  ): Layouts extends readonly (infer Layouts)[] ? Layouts : never
{
  const { width } = useDimensions();

  const layouts: Layout[] = useMemo(
    // @ts-expect-error Because "availableLayouts" can be "never".
    () => (availableLayouts as Layouts).sort((a, b) => a - b),
    [] // Given available layouts are not supposed to change.
  );

  // @ts-expect-error Because it can be "never".
  return useMemo(
    (): Layout => {
      let index = 0;
      for (; index < layouts.length; ++index) {
        const layout = layouts[index]!;
        if (width <= layout) {
          return layout;
        }
      }

      return layouts[index - 1]!;
    },
    [ width ]
  )
}
