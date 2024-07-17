import { ReactNode, useMemo, useState } from "react";
import { ThemeProvider } from "@shopify/restyle";

import { Theme, Themes } from "@app/theme";
import { ThemeBackboneContext } from "./ThemeBackboneContext";

export interface ThemeBackboneProviderProps {
  children?: ReactNode,
}

export function ThemeBackboneProvider(
    { children }: ThemeBackboneProviderProps
  ): JSX.Element
{
  const [ theme, setTheme ] = useState<Theme>(Themes.blue);

  return (
    <ThemeBackboneContext.Provider
      value={
        useMemo(
          () => ({
            setTheme,
            getTheme: () => theme,
          }),
          [ theme ]
        )
      }
    >
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeBackboneContext.Provider>
  );
}
