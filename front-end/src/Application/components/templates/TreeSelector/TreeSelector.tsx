import { Tree } from "Application/types";
import { useState } from "react";

export interface TreeSelectorProps {
  root: Tree,
}

/**
 * WIP (prototype).
 */
export function TreeSelector(
    { root }: TreeSelectorProps
  ): JSX.Element
{
  return (
    <div className="h-full">
      <RecursiveTree tree={root} root={true}/>
    </div>
  );
}

function RecursiveTree(
    { tree: { label, children }, root }: { tree: Tree, root: boolean }
  ): JSX.Element
{
  const [ selected, setSelected ] = useState<Tree | null>(null);

  return (
    <div className="flex flex-col h-full">
      <div
        className="cursor-pointer relative flex flex-row p-2 gap-2 items-center"
        onClick={
          () => setSelected(null)
        }
      >
        {!root && (
          <div className="absolute top-0 flex w-6 justify-center bottom-1/2">
            <div className="w-px bg-gray-200"></div>
          </div>
        )}

        {selected != null && (
          <div className="absolute top-1/2 flex w-6 justify-center bottom-0">
            <div className="w-px bg-gray-200"></div>
          </div>
        )}

        <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
          <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"></div>
        </div>

        <p className="flex-auto py-0.5 text-gray-500">
          <span className="text-gray-900">{label}</span>
        </p>
      </div>

      <div className="grow overflow-hidden">
        {selected == null && children && (
          <SelectTree onSelect={setSelected}>
            {children}
          </SelectTree>
        )}

        {selected != null && (
          <RecursiveTree tree={selected} root={false}/>
        )}
      </div>
    </div>
  );
}

function SelectTree(
    { children, onSelect }: { children: Tree[], onSelect(tree: Tree): void }
  ): JSX.Element
{
  return (
    <div className="h-full overflow-hidden flex flex-col">
      <div className="bg-stone-100">
        Search & filter
      </div>
      <div className="grow overflow-hidden">
        <div className="h-full overflow-y-scroll">
          <div className="">
            {children.map(
              (tree) => (
                <div
                  className="cursor-pointer"
                  key={tree.label}
                  onClick={
                    () => onSelect(tree)
                  }
                >
                  {tree.label}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
