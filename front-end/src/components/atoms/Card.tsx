import { Theme } from "@app/theme";

import {
  VariantProps,
  createRestyleComponent,
  createVariant,
} from "@shopify/restyle";

import { Box } from "./Box";

export const Card = createRestyleComponent<
  & VariantProps<Theme, "cardVariants">
  & React.ComponentProps<typeof Box>
  , Theme
>(
  [
    createVariant({
      themeKey: "cardVariants",
      // defaults: {
      //   margin: {
      //     phone: "s",
      //     tablet: "m",
      //   },
      // },
    }),
  ],
  Box,
);
