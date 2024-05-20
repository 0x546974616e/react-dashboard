import { useMemo } from "react";
import { Tree } from "Application/types";
import { join } from "Application/utils";
import { useOnChildBlur } from "Application/hooks";
import { useTreeContext } from "./TreeContext";

import "./TreeChildrenNode.scss";

export interface TreeChildrenNodeProps {
  searchPattern?: RegExp | null,
  onDive?(tree: Tree | null): void,
  last?: boolean,
  tree: Tree,
}

export function TreeChildrenNode(
    { tree,
      last,
      onDive,
      searchPattern,
    }: TreeChildrenNodeProps
  ): JSX.Element | null
{
  const {
    selectTree,
    selectedTree,
    preselectTree,
    preselectedTree,
  } = useTreeContext();

  const onBlur = useOnChildBlur(() => preselectTree(null));
  const amount = useMemo(() => Math.floor(Math.random() * 100), []);

  const label = useMemo(
    () => {
      if (!searchPattern) {
        return [ tree.label ];
      }

      const matches = tree.label.match(searchPattern);
      if (!matches || matches.length <= 0) {
        return null;
      }

      const parts = tree.label.split(searchPattern);
      if (matches.length + 1 != parts.length) {
        return null;
      }

      return parts.flatMap(
        // TODO: Improve zipping.
        (part, index) => [ part, matches[index] ]
      );
    },
    [ searchPattern ]
  );

  if (label == null) {
    return null;
  }

  return (
    <div
      onBlur={onBlur}
      className={
        join(
          "tree-children-node",
          selectedTree == tree ? "selected" : null,
          preselectedTree == tree ? "preselected" : null,
          "relative flex flex-row gap-2 w-full",
        )
      }
    >
      <button
        className={
          join(
            "cursor-pointer",
            "flex flex-row gap-2 grow",
            "px-2 py-1 min-w-0",
            "border rounded-lg",
            selectedTree == tree ||
            preselectedTree == tree
              ? "border-indigo-300"
              : "border-white",
            selectedTree == tree
              ? "bg-indigo-100"
              : "",
            "accent-blue-600",
            "hover:border-indigo-600",
          )
        }
        onDoubleClick={
          () => {
            preselectTree(null);
            onDive?.(tree);
          }
        }
        onClick={
          () => {
            preselectTree(preselectedTree == tree ? null : tree);
          }
        }
      >
        <div className={"grow text-left truncate"}>
          {label.map(
            (label, index) => (
              label && (
                <span
                  key={index}
                  className={index % 2 == 1 ? "text-indigo-600 font-semibold" : undefined}
                >
                  {label}
                </span>
              )
            )
          )}
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
              "hover:border-indigo-700",
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

      {/* {!last && <hr/>} */}
    </div>
  );
}