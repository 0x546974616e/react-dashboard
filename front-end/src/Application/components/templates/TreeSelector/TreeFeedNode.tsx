import { useMemo } from "react";

import { join } from "Application/utils";
import { Tree } from "Application/types";
import { useOnChildBlur } from "Application/hooks";

import { useTreeContext } from "./TreeContext";

export interface TreeFeedNodeProps {
  onDive?(tree: Tree | null): void,
  first?: boolean,
  last?: boolean,
  tree: Tree,
}

export function TreeFeedNode(
    { tree,
      onDive,
      first, last,
    }: TreeFeedNodeProps
  ): JSX.Element
{
  const {
    selectTree,
    selectedTree,
    preselectTree,
    preselectedTree,
  } = useTreeContext();

  const amount = useMemo(() => Math.floor(Math.random() * 100), []);
  const hasChildren = tree.children && tree.children.nodes.length > 0;

  return (
    <div
      className={"relative flex flex-row gap-2 px-2 py-1 w-full"}
      onBlur={useOnChildBlur(() => preselectTree(null))}
    >
      <button
        className={
          join(
            "cursor-pointer",
            "px-2 py-1 min-w-0 grow",
            "flex flex-row gap-2",
            "border rounded-lg",
            selectedTree == tree ||
            preselectedTree == tree
              ? "border-indigo-300"
              : "border-stone-200",
            selectedTree == tree
              ? "bg-indigo-100"
              : "bg-stone-50",
            "accent-blue-600",
            "hover:border-indigo-600",
          )
        }
        onDoubleClick={
          () => {
            preselectTree(null);
            if (hasChildren) {
              onDive?.(tree);
            }
            else {
              selectTree(tree);
            }
          }
        }
        onClick={
          () => {
            if (preselectedTree == tree) {
              preselectTree(null);
            }
            else {
              preselectTree(tree);
            }
          }
        }
      >
        <div className={"shrink-0"}>
          {!first && (
            <div className={"absolute flex top-0 bottom-1/2 w-6 justify-center"}>
              <div className={"w-[2px] bg-indigo-600"}/>
            </div>
          )}

          {!last && (
            <div className={"absolute flex top-1/2 bottom-0 w-6 justify-center"}>
              <div className={"w-[2px] bg-indigo-600"}/>
            </div>
          )}

          <div className={"relative flex w-6 h-full items-center justify-center"}>
            <div className={"h-1.5 w-1.5 rounded-full bg-indigo-50 ring-[2px] ring-indigo-600"}/>
          </div>
        </div>

        <div className={"grow text-left truncate"}>
          {tree.label}
        </div>

        {preselectedTree != tree && (
          <div className={"shrink-0"}>
            {amount}&nbsp;€
          </div>
        )}
      </button>

      {preselectedTree == tree && (
        <button
          className={
            join(
              "px-4 py-1 shrink-0",
              "text-white",
              "border rounded-lg",
              "border-indigo-600",
              "accent-blue-600",
              "bg-indigo-500",
            )
          }
          onClick={
            () => {
              preselectTree(null);
              selectTree(tree);
            }
          }
        >
          Select
        </button>
      )}
    </div>
  );
}
