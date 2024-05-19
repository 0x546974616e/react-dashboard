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
      <div>No node TODO</div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className={""}>
        <TreeFeedSearch
          onSearchPattern={setSearch}
          placeholder={children.label}
          first={false}
          last={true}
        />
      </div>

      <div className={"flex flex-row px-2 pt-1 justify-between text-stone-300"}>
        <div>
          {children.label}
        </div>
        <div>
          Chiffre d'affaires
        </div>
      </div>

      <div className="flex-1 px-2 overflow-y-auto">
        {children.nodes.map(
          (tree, index, { length }) => (
            <TreeChildrenNode
              key={tree.id}
              searchPattern={search}
              onDive={selectSubtree}
              last={index + 1 >= length}
              tree={tree}
            />
          )
        )}
      </div>
    </div>
  );
}