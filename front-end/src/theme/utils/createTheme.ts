import { createTheme as _createTheme } from "@shopify/restyle";

import { Theme } from "../Theme";

export function createTheme<T extends Theme>(theme: T): Theme {
  return _createTheme(theme);
}
