import { createContext } from "react";
import { Theme, Themes } from "@app/theme";

export interface ThemeBackboneContext {
  setTheme(theme: Theme): void,
  getTheme(): Theme,
}

export const ThemeBackboneContext = (
  createContext<ThemeBackboneContext>({
    getTheme: () => Themes.blue,
    setTheme: () => {},
  })
);
