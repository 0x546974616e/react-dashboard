import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Dimensions, Layout } from "Application/types";

export const DimensionsContext = (
  createContext<Dimensions>({
    // Fallback but it should never happen.
    width: Layout.LAPTOP,
    height: Layout.LAPTOP,
  })
);

export function DimensionsProvider(
    props: { children?: React.ReactNode }
  ): React.ReactElement
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
    <DimensionsContext.Provider value={dimensions}>
      {props.children}
    </DimensionsContext.Provider>
  );
}
