
export interface Theme {
  statusBar: (
    | "inverted"
    | "light"
    | "dark"
  ),
  spacing: Record<
    | "0" // | "0.5"
    | "1" // | "1.5"
    | "2" // | "2.5"
    , number
  >,
  borderRadii: Record<
    | "0" // | "0.5"
    | "1" // | "1.5"
    | "2" // | "2.5"
    | "default"
    | "full"
    , number
  >,
  colors: Record<
    // Default colors,
    | "red"
    | "green"
    | "blue"
    | "magenta"
    | "yellow"
    | "cyan"
    | "white"
    | "black"

    // Original dark blue.
    | "primary400" // Lighter
    | "primary500" // Default
    | "primary600" // Darker

    // Original light blue.
    | "secondary400" // Lighter
    | "secondary500" // Default
    | "secondary600" // Darker

    // Original light gray.
    | "tertiary400" // Lighter
    | "tertiary500" // Default
    | "tertiary600" // Darker

    // Original white.
    | "quaternary400" // Ligher
    | "quaternary500" // Default
    | "quaternary600" // Darker

    , string
  >,
  cardVariants: Record<
    | "dada"
    , any
  >,
  textVariants: Record<
    | "defaults"
    , any
  >,
}

/**
 * TODO Remove
 */
export const ChartGridRuleTheme = {
  yLegendMarginRight: 24,
  xLegendMarginBottom: 24,
};

// https://github.com/Shopify/restyle/blob/master/fixture/theme.ts
// https://github.com/Shopify/restyle?tab=readme-ov-file
