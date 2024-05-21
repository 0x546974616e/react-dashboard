import { createContext, useContext } from "react";

export interface HomeLayoutContext {
  openTreeSelector?(): void,
  closeTreeSelector?(): void,
  openRanking?(): void,
  closeRanking?(): void,
}

export const HomeLayoutContext = (
  createContext<HomeLayoutContext>({
    openTreeSelector: undefined,
    closeTreeSelector: undefined,
    openRanking: undefined,
    closeRanking: undefined,
  })
);

export function useHomeLayoutContext() {
  return useContext(HomeLayoutContext);
}
