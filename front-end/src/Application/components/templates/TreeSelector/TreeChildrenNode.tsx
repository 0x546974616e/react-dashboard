import { useMemo } from "react";
import { Tree } from "Application/types";
import { useOnChildBlur } from "Application/hooks";
import { useTreeContext } from "./TreeContext";

export interface TreeChildrenNodeProps {
  searchPattern?: RegExp | null,
  onDive?(tree: Tree | null): void,
  tree: Tree,
}

export function TreeChildrenNode(
    { tree,
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

  const amount = useMemo(() => Math.floor(Math.random() * 100), []);
  const hasChildren = tree.children && tree.children.nodes.length > 0;

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

  const onBlur = useOnChildBlur(
    () => preselectTree(null)
  );

  if (label == null) {
    return null;
  }

  return (
    <div onBlur={onBlur}>
      <button
        className={
          "accent-indigo-600 " + (
            selectedTree == tree
              ? "bg-indigo-600"
              : preselectedTree == tree
                  ? "border border-indigo-600"
                  : undefined
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
        <div className={"flex flex-row gap-2 justify-between"}>
          <div className={"grow"}>
            {label.map(
              (label, index) => (
                label && (
                  <span
                    key={index}
                    className={index % 2 == 1 ? "text-red-500" : undefined}
                  >
                    {label}
                  </span>
                )
              )
            )}
          </div>
          <div>
            {amount} €
          </div>
        </div>
      </button>

      {preselectedTree == tree && (
        <button
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