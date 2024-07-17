import { ReactNode } from "react";

import { ThemeBackboneProvider } from "./theme";
import { TreeBackboneProvider } from "./tree"

export interface BackboneProps {
  children?: ReactNode,
}

export function Backbone(
    { children }: BackboneProps
  ): JSX.Element
{
  return (
    <ThemeBackboneProvider>
      <TreeBackboneProvider>
        {children}
      </TreeBackboneProvider>
    </ThemeBackboneProvider>
  );
}
