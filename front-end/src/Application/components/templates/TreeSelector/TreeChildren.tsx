import { useState } from "react";
import { Tree } from "Application/types";
import { TreeChildrenNode } from "./TreeChildrenNode";
import { TreeFeedSearch } from "./TreeFeedSearch";

export interface TreeChildrenProps {
  selectSubtree?(tree: Tree | null): void,
  tree: Tree,
}

export function TreeChildren(
    { tree: { children },
      selectSubtree,
    }: TreeChildrenProps
  ): JSX.Element
{
  const [ search, setSearch ] = useState<RegExp | null>(null);

  if (!children) {
    return (
      // <div>Click to TODO</div>
      <div></div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className={"bg-indigo-300"}>
        <TreeFeedSearch
          onSearchPattern={setSearch}
          placeholder={children.label}
        />
      </div>

      <div className={"flex flex-row justify-between text-stone-300"}>
        <div>
          {children.label}
        </div>
        <div>
          Chiffre d'affaires
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {children.nodes.map(
          (tree) => (
            <TreeChildrenNode
              key={tree.id}
              searchPattern={search}
              onDive={selectSubtree}
              tree={tree}
            />
          )
        )}
      </div>
    </div>
  );
}