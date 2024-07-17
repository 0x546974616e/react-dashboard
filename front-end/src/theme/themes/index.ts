import { Theme } from "../Theme";

import { blueTheme } from "./blueTheme";
import { redTheme } from "./redTheme";

/**
 * DEVELOPER NOTE: Easier to name it `Themes` instead of `Theme`.
 */
export const Themes = {
  blue: blueTheme,
  red: redTheme,
} satisfies {
  [theme: string]: Readonly<Theme>
};
