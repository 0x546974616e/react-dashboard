import { createContext, useContext } from "react";
import { Tree } from "Application/types";

export interface TreeContext {
  selectTree(tree: Tree | null): void,
  selectedTree: Tree | null,
  preselectTree(tree: Tree | null): void,
  preselectedTree: Tree | null,
}

export const TreeContext = (
  createContext<TreeContext>({
    selectTree: () => {},
    selectedTree: null,
    preselectTree: () => {},
    preselectedTree: null,
  })
);

export function useTreeContext() {
  return useContext(TreeContext);
}
