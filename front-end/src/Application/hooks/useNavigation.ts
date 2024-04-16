import { useContext } from "react";
import { NavigationContext } from "Application/contexts";

export function useNavigation(): NavigationContext {
  return useContext(NavigationContext);
}
