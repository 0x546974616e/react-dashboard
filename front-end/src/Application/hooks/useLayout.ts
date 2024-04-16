import { useMemo } from "react";

import { useDimensions } from "./useDimensions";
import { Layout } from "Application/types";

/**
 * Return one of the given layout according to the current window dimensions.
 *
 * DEVELOPER NOTE:
 * Generic "const" is for typescript 5 and it seems impossible for react-scripts
 * to be upgraded with this version... So far the caller has to write "as const".
 */
export function useLayout</* const */ Layouts extends readonly Layout[]>(
    // Force given layouts to have at least one element.
    availableLayouts: [] extends Layouts ? never : Layouts
  ): Layouts extends readonly (infer Layouts)[] ? Layouts : never
{
  const { width } = useDimensions();

  const layouts: Layout[] = useMemo(
    // @ts-expect-error Because "availableLayouts" can be "never".
    () => (availableLayouts as Layouts).sort((a, b) => a - b),
    [] // Given available layouts are not supposed to change.
  )

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
