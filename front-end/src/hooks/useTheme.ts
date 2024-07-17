import { useTheme as _useTheme } from "@shopify/restyle";
import { Theme } from "@app/theme";

export function useTheme(): Theme {
  return _useTheme<Theme>();
}
