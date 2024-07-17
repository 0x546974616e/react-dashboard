import { Theme } from "../Theme";

type DefaultColors = (
  Pick<Theme["colors"],
    | "red"
    | "green"
    | "blue"
    | "magenta"
    | "yellow"
    | "cyan"
    | "white"
    | "black"
  >
);

export const defaultColors: DefaultColors = {
  red: "#ff0000",
  green: "#00ff00",
  blue: "#0000ff",
  magenta: "#ff00ff",
  yellow: "#ffff00",
  cyan: "#00ffff",
  white: "#ffffff",
  black: "#000000",
};
