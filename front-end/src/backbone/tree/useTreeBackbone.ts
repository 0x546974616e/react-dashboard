import { useContext } from "react";
import { TreeBackboneContext } from "./TreeBackboneContext";

export function useTreeBackbone(): TreeBackboneContext {
  return useContext(TreeBackboneContext);
}
