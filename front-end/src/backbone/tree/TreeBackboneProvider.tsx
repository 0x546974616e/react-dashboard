import { ReactNode, useCallback, useMemo, useRef, useState } from "react";
import { TreeBackboneContext } from "./TreeBackboneContext";
import { Company, Tree } from "@app/types";

export interface TreeBackboneProviderProps {
  children?: ReactNode,
}

export function TreeBackboneProvider(
    { children }: TreeBackboneProviderProps
  ): JSX.Element
{
  const [ treeBB, setTreeBB ] = useState<Tree | null>(null);

  const [ loading, setLoading ] = useState(false);
  const loadingRef = useRef(loading);
  loadingRef.current = loading;

  const setTree = useCallback(
    (tree: Tree | null) => {
      if (!loadingRef.current) {
        setTreeBB(tree);
      }
    }, []
  );

  const resetTree = useCallback(
    () => {
      if (!loadingRef.current) {
        setTreeBB(null);
      }
    }, []
  );

  const fetchTree = useCallback(
    (company: Company) => {
      if (!loadingRef.current) {
        setLoading(true);
        console.log("TODO fetch tree", company);
        setLoading(false);
      }
    }, []
  );

  return (
    <TreeBackboneContext.Provider
      value={
        useMemo(
          () => ({
            tree: treeBB, // BB stands for "BackBone".
            isTreeLoading: loading,
            setTree,
            fetchTree,
            resetTree,
          }),
          [ treeBB, loading ]
        )
      }
    >
      {children}
    </TreeBackboneContext.Provider>
  );
}
