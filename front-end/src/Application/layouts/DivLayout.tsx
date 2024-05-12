import { ReactNode, useMemo, useState } from "react";

import { DimensionsContext } from "Application/contexts";
import { useDimensions } from "Application/hooks";

export interface DivLayoutProps {
  id?: string,
  children?: ReactNode,

  debug?: boolean,

  width?: number | string,
  height?: number | string,

  minWidth?: number | string,
  minHeight?: number | string,

  maxWidth?: number | string,
  maxHeight?: number | string,

  overflow?: "hidden" | "visible" | "scroll",
  overflowX?: "hidden" | "visible" | "scroll",
  overflowY?: "hidden" | "visible" | "scroll",

  flex?: number | string,
  flexDirection?: "row" | "column",
  flexShrink?: number | string,
  flexBasis?: number | string,
  flexGrow?: number | string,
}

export function DivLayout(
    { id, children, debug, ...style }: DivLayoutProps
  ): JSX.Element
{
  useDimensions();

  const [ layout, setLayout ] = useState<HTMLDivElement | null>(null);
  const { width: w, height: h } = layout?.getBoundingClientRect() ?? {};

  return (
    <div
      id={id}
      ref={setLayout}
      className={debug ? "relative border-2 border-stone-300" : undefined}
      style={style}
    >
      {debug && (
        <code className={"absolute top-0 left-0 bg-stone-300 border-2 border-stone-400 px-1 py-0.5"}>
          {(w ?? 0).toFixed(0)}×{(h ?? 0).toFixed(0)}
        </code>
      )}

      <DimensionsContext.Provider
        value={useMemo(() => ({ width: w ?? 0, height: h ?? 0 }), [ w, h ])}
      >
        {children}
      </DimensionsContext.Provider>
    </div>
  );
}
