import { useState } from "react";
import { Tree } from "Application/types";
import { FeedCell } from "./FeedCell";

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
    <div className="h-full bg-white pt-2">
      {/* <div
        className="whitespace-nowrap truncate pr-2 text-stone-400"
        style={{ direction: "rtl"}}
      >
        Chiffre d'affaires / Objectif
      </div> */}
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
      <FeedCell
        first={root}
        last={selected == null}
        onPress={() => setSelected(null)}
      >
        <div className={"flex flex-row text-gray-900"}>
          <div className="grow">
            {label}
          </div>
          <div>
            {Math.ceil(Math.random() * 100)} €
          </div>
        </div>
      </FeedCell>

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

/*

*/


function SelectTree(
    { children, onSelect }: { children: Tree[], onSelect(tree: Tree): void }
  ): JSX.Element
{
  return (
    <div className="h-full overflow-hidden flex flex-col">
      <div className="bg-white text-center">
        Search & filter
      </div>
      <div className="grow overflow-hidden flex flex-col">
        <div className="flex flex-row p-2 text-stone-400 gap-2 justify-between">
          <div className="whitespace-nowrap truncate min-w-[20%]">
            Magasins
          </div>
          <div className="whitespace-nowrap truncate" style={{ direction: "rtl"}}>
            Chiffre d'affaires / Objectif
          </div>
        </div>
        <div className="overflow-y-scroll grow px-2">
          <div className="">
            {children.map(
              (tree) => (
                <div
                  className="cursor-pointer px-2 pb-2"
                  key={tree.label}
                  onClick={
                    () => onSelect(tree)
                  }
                >
                  <div className="flex flex-row">
                    <div className="grow">
                      {tree.label}
                    </div>
                    <div>
                      {Math.ceil(Math.random() * 100)} €
                    </div>
                  </div>

                  <hr className="mt-2"/>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
