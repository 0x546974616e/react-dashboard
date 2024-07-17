import { createContext } from "react";
import { Company, Tree } from "@app/types";

export interface TreeBackboneContext {
  tree: Tree | null,
  isTreeLoading: boolean,

  setTree(tree: Tree | null): void,
  fetchTree(company?: Company): void,
  resetTree(): void,
}

export const TreeBackboneContext = (
  createContext<TreeBackboneContext>({
    tree: null,
    isTreeLoading: false,
    setTree: () => {},
    fetchTree: () => {},
    resetTree: () => {},
  })
);
