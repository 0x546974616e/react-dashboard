import { useContext } from "react";
import { DimensionsContext } from "@app/contexts";

export function useDimensions() {
  return useContext(DimensionsContext);
}
