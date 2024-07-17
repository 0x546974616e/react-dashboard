import { useContext } from "react";
import { ThemeBackboneContext } from "./ThemeBackboneContext";

export function useThemeBackbone(): ThemeBackboneContext {
  return useContext(ThemeBackboneContext);
}
