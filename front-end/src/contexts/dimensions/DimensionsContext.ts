import { Size } from "@app/types";
import { createContext } from "react";

/**
 * Do not confuse `Size` with `Dimensions`
 *
 * Dimensions are used for layouts while `Size` represents arbitrary sizes.
 */
export type DimensionsContext = (
  Size & {
    parent: Size | null,
  }
);

export const DimensionsContext = (
  createContext<DimensionsContext>({
    parent: null, width: 0, height: 0,
  })
);
