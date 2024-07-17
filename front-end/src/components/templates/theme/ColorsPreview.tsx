import { Box, Text } from "@app/components/atoms";
import { useLayout, useTheme } from "@app/hooks";
import { Theme } from "@app/theme";
import { Layout } from "@app/types";

export interface ColorsPreviewProps {
  colors: (keyof Theme["colors"])[];
}

export function ColorsPreview(
    { colors }: ColorsPreviewProps
  ): JSX.Element
{
  const codes = useTheme().colors;

  return (
    <Box
      gap={"2"}
      flexDirection={"row"}
    >
      {colors.map(
        (color) => (
          <Box
            key={color}
            gap={"1"}
            flexGrow={1}
            flexShrink={0}
            flexDirection={"column"}
            justifyContent={"space-between"}
          >
            <Box>
              <Text fontWeight={"bold"}>{color}</Text>
              <Text>{codes[color] ?? "??"}</Text>
            </Box>

            <Box
              height={100}
              borderWidth={1}
              borderRadius={"2"}
              borderColor={"black"}
              backgroundColor={color}
            />
          </Box>
        )
      )}
    </Box>
  );
}
