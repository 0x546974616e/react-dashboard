import { useContext } from "react";
import { NavigationContext } from "./NavigationContext";

export function useNavigation(): NavigationContext {
  return useContext(NavigationContext);
}
