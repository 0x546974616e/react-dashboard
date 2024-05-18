import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Tree } from "Application/types";
import { TreeContext } from "./TreeContext";

export interface TreeProviderProps {
  onSelect?(tree: Tree | null): void,
  children?: ReactNode,
}

export function TreeProvider(
    { onSelect,
      children,
    }: TreeProviderProps
  ): JSX.Element
{
  const [ selectedTree, _selectTree ] = useState<Tree | null>(null);
  const [ preselectedTree, preselectTree ] = useState<Tree | null>(null);

  useEffect(
    () => {
      function onChange() {
        preselectTree(null);
      }

      // Simple support (https://stackoverflow.com/a/1060034).
      document.addEventListener("visibilitychange", onChange);
      return () => document.removeEventListener("visibilitychange", onChange);
    }, []
  );

  const selectTree = useCallback(
    (tree: Tree | null) => {
      _selectTree(tree);
      onSelect?.(tree);
    },
    [ onSelect, _selectTree ]
  );

  return (
    <TreeContext.Provider
      value={
        useMemo(
          () => ({
            selectTree,
            selectedTree,
            preselectTree,
            preselectedTree,
          }), [
            selectedTree,
            preselectedTree,
          ]
        )
      }
    >
      {children}
    </TreeContext.Provider>
  );
}
