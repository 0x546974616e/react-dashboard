import { Dimensions } from "Application/types";
import { DimensionsContext } from "./DimensionsContext";
import { ReactNode, useMemo } from "react";

export interface DimensionsProviderProps {
  width?: number,
  height?: number,

  children?: ReactNode,

  debug?: boolean,
  id?: string,
}

export function DimensionsProvider(
    { width,
      height,
      children,
      debug,
      id,
    }: DimensionsProviderProps
  ): JSX.Element
{
  const value = useMemo(
    () => ({
      width: width ?? 0,
      height: height ?? 0,
    }), [
      width,
      height,
    ]
  );

  return (
    <DimensionsContext.Provider value={value}>
      <div id={id} className={debug ? "relative" : undefined}>
        <div style={value} className={"overflow-x-hidden overflow-y-auto"}>
          {children}
        </div>

        {debug && (
          <code className={"absolute top-0 left-0 bg-stone-300 border-2 border-stone-400 px-1 py-0.5"}>
            {value.width.toFixed(0)}×{value.height.toFixed(0)}
          </code>
        )}
      </div>
    </DimensionsContext.Provider>
  );
}
