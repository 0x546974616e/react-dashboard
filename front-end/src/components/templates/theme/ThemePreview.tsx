import { useTheme } from "@shopify/restyle";

import { Box } from "@app/components/atoms";
import { Theme } from "@app/theme";
import { ColorsPreview } from "./ColorsPreview";

export function ThemePreview(): JSX.Element {
  const theme = useTheme<Theme>();

  return (
    <Box
      width={"100%"}
      padding={"2"}
      gap={"2"}
    >
      <ColorsPreview
        colors={[
          "primary400",
          "primary500",
          "primary600",
        ]}
      />

      <ColorsPreview
        colors={[
          "secondary400",
          "secondary500",
          "secondary600",
        ]}
      />

      <ColorsPreview
        colors={[
          "tertiary400",
          "tertiary500",
          "tertiary600",
        ]}
      />

      <ColorsPreview
        colors={[
          "quaternary400",
          "quaternary500",
          "quaternary600",
        ]}
      />
    </Box>
  );
}
