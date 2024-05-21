import {  useState } from "react";
import { Tree } from "Application/types";
import { TreeProvider } from "./TreeProvider";
import { TreeChildren } from "./TreeChildren";
import { TreeFeedNode } from "./TreeFeedNode";

export interface TreeSelectorProps {
  onSelect?(tree: Tree | null): void,
  root: Tree | null,
}

export function TreeSelector(
    { root,
      onSelect,
    }: TreeSelectorProps
  ): JSX.Element
{
  return (
    <TreeProvider>
      {root != null && (
        <div className={"w-full h-full pt-4"}>
          <RecursiveTree
            tree={root}
            root={true}
          />
          </div>
      )}

      {root == null && (
        <div>Oops, we didn't see that coming.</div>
      )}
    </TreeProvider>
  );
}

export interface RecursiveTreeProps {
  dada?(tree: Tree | null): void,
  root?: boolean,
  tree: Tree,
}

export function RecursiveTree(
    { tree, root, dada }: RecursiveTreeProps
  ): JSX.Element
{
  const [ subtree, selectSubtree ] = useState<Tree | null>(null);

  return (
    <div className="w-full h-full flex flex-col shrink-0 overflow-hidden">
      <TreeFeedNode
        tree={tree}
        first={root}
        // last={subtree == null}
        // last={!subtree?.children}
        last={subtree == null && !tree.children}
        // onDive={() => subtree == null ? dada?.(tree) : selectSubtree(null)}
        onDive={() => dada ? dada(tree) : selectSubtree(null)}
        // onDive={() => dada?.(tree)}
      />

      <div className="flex-1 overflow-hidden">
        {subtree != null && (
          <RecursiveTree
            tree={subtree}
            dada={() => selectSubtree(null)}
          />
        )}

        {subtree == null && (
          <TreeChildren
            selectSubtree={selectSubtree}
            tree={tree}
          />
        )}
      </div>
    </div>
  );
}
