import { createTheme, defaultBorderRadii, defaultColors, defaultSpacing } from "../utils";

export const blueTheme = createTheme({
  statusBar: "light",
  spacing: defaultSpacing,
  borderRadii: defaultBorderRadii,
  colors: {
    ...defaultColors,

    // Original dark blue.
    primary400: "#818cf4", // rgb(129 140 248)
    primary500: "#6366f1", // rgb(99 102 241)
    primary600: "#4f46e5", // rgb(79 70 229)

    // Original light blue.
    secondary400: "#c7d2fe", // rgb(199 210 254)
    secondary500: "#a5b4fc", // rgb(165 180 252)
    secondary600: "#818cf4", // rgb(129 140 248)

    // Original light gray.
    tertiary400: "#fafaf9", // rgb(250 250 249)
    tertiary500: "#f5f5f4", // rgb(245 245 244)
    tertiary600: "#e7e5e4", // rgb(231 229 228)

    // Original white.
    quaternary400: "#ffffff", // Ligher
    quaternary500: "#fdfdfd", // Default
    quaternary600: "#fbfbfb", // Darker
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
