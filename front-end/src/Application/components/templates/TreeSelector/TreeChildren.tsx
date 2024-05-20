import { useState } from "react";
import { Tree } from "Application/types";
import { TreeChildrenNode } from "./TreeChildrenNode";
import { TreeFeedSearch } from "./TreeFeedSearch";
import { join } from "Application/utils";

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
      <div className={"px-2 py-1 h-full flex flex-col items-center justify-center text-stone-300"}>
        TODO Tips
      </div>
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

      <div
        className={
          join(
            "flex flex-row mx-4 py-2 justify-between",
            "border-b border-b-stone-200 text-stone-300",
          )
        }
      >
        <div>
          {children.label}
        </div>
        <div>
          Turnover
        </div>
      </div>

      <div className="flex-1 px-4 pb-2 overflow-y-auto">
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