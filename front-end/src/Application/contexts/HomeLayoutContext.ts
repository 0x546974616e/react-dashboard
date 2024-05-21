import { createContext, useContext } from "react";

export interface HomeLayoutContext {
  openTreeSelector?(): void,
  openRanking?(): void,
}

export const HomeLayoutContext = (
  createContext<HomeLayoutContext>({
    openTreeSelector: undefined,
    openRanking: undefined,
  })
);

export function useHomeLayoutContext() {
  return useContext(HomeLayoutContext);
}
