import { Button } from "react-native";
import { router, useSegments } from "expo-router";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@app/theme";
import { Box, Text } from "../atoms";

const routes = [
  {
    title: "Dada",
    segment: "dada",
  },
  {
    title: "Fafa",
    segment: "fafa",
  },
  {
    title: "Gaga",
    segment: "gaga",
  },
  {
    title: "Haha",
    segment: "haha",
  },
];

export function Header(): JSX.Element {
  const [ root ] = useSegments();
  const { colors } = useTheme<Theme>();

  return (
    <Box
      width={"100%"}
      height={"100%"}
      backgroundColor={"primary500"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"row"}
      gap={"2"}
    >
      <Text>
        Header
      </Text>
      {routes.map(
        ({ title, segment }) => (
          <Button
            key={title}
            title={title}
            color={
              segment == root
                ? colors.primary600
                : colors.secondary600
            }
            onPress={
              () => {
                if (segment != root) {
                  router.push("/" + segment);
                }
              }
            }
          />
        )
      )}
    </Box>
  );
}
