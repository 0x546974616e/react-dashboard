import React, { ReactNode } from "react";

export interface FeedCellProps {
  children?: ReactNode,
  onPress?(): void,
  first?: boolean,
  last?: boolean,
}

export const FeedCell = React.memo(_FeedCell);

function _FeedCell(
    { children,
      onPress,
      first,
      last,
    }: FeedCellProps
  ): JSX.Element
{
  return (
    <div className="px-2 py-1 relative">
      <div className="px-2 py-1 bg-stone-50 border rounded-lg cursor-pointer hover:border-indigo-300" onClick={onPress}>
        <div className={"flex flex-row"}>
          <div className={""}>
            {!first && (
              <div className={"absolute top-0 flex w-6 h-6 justify-center"}>
                <div className={"w-[2px] bg-indigo-600"}/>
              </div>
            )}

            {!last && (
              <div className={"absolute top-6 flex w-6 justify-center bottom-0"}>
                <div className={"w-[2px] bg-indigo-600"}/>
              </div>
            )}

            <div className={"relative flex h-6 w-6 flex-none items-center justify-center bg-inherit"}>
              <div className={"h-1.5 w-1.5 rounded-full bg-indigo-100 ring-[2px] ring-indigo-600"}/>
            </div>
          </div>
          <div className={"grow"}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
