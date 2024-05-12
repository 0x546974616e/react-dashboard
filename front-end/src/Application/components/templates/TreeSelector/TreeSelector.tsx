import { Tree } from "Application/types";
import { useState } from "react";

export interface TreeSelectorProps {
  root: Tree,
}

export function TreeSelector(
    { root }: TreeSelectorProps
  ): JSX.Element
{
  return (
    <div className="h-full overflow-y-scroll">
      <RecursiveTree root={root}/>
    </div>
  );
}

function RecursiveTree(
    { root: { label, children } }: { root: Tree }
  ): JSX.Element
{
  const [ selected, setSelected ] = useState<Tree | null>(null);

  return (
    <div>
      <div
        className="border-4 border-red text-center cursor-pointer"
        onClick={
          () => setSelected(null)
        }
      >
        {label}
      </div>
      {selected == null && (
        children?.map(
          (tree) => (
            <div
              className="cursor-pointer"
              key={tree.label}
              onClick={
                () => setSelected(tree)
              }
            >
              {tree.label}
            </div>
          )
        )
      )}

      {selected != null && (
        <RecursiveTree root={selected}/>
      )}
    </div>
  );
}
