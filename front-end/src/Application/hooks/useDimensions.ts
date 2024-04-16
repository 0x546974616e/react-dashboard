import { useContext } from "react";
import { Dimensions } from "Application/types";
import { DimensionsContext } from "Application/contexts";

export function useDimensions(): Dimensions {
  return useContext(DimensionsContext);
}
