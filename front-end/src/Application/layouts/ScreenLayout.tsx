import { ReactNode, useEffect, useMemo, useState } from "react";

import { DimensionsContext } from "Application/contexts";
import { Dimensions } from "Application/types";

export interface ScreenLayoutProps {
  children?: ReactNode,
}

export function ScreenLayout(
    { children }: ScreenLayoutProps
  ): JSX.Element
{
  const [ dimensions, setDimensions ] = (
    useState<Dimensions>(
      useMemo(Dimensions.retrieve, [])
    )
  );

  useEffect(
    () => {
      function windowChanged() {
        setDimensions(Dimensions.retrieve());
      }

      windowChanged();
      window.addEventListener("resize", windowChanged);
      return () => window.removeEventListener("resize", windowChanged);
    }, []
  );

  return (
    <div style={dimensions}>
      <DimensionsContext.Provider value={dimensions}>
        {children}
      </DimensionsContext.Provider>
    </div>
  );
}
