import { createTheme, defaultBorderRadii, defaultColors, defaultSpacing } from "../utils";

export const redTheme = createTheme({
  statusBar: "dark",
  spacing: defaultSpacing,
  borderRadii: defaultBorderRadii,
  colors: {
    ...defaultColors,

    // Original dark blue.
    primary400: "#f87171",
    primary500: "#ef4444",
    primary600: "#dc2626",

    // Original light blue.
    secondary400: "#fecaca",
    secondary500: "#fca5a5",
    secondary600: "#f87171",

    // Original light gray.
    tertiary400: "#fafaf9",
    tertiary500: "#f5f5f4",
    tertiary600: "#e7e5e4",

    // Original white.
    quaternary400: "#ffffff",
    quaternary500: "#fdfdfd",
    quaternary600: "#fbfbfb",
  },
  cardVariants: {
    dada: {
      padding: "2",
      backgroundColor: "red",
    },
  },
  textVariants: {
    defaults: {

    },
  },
});
