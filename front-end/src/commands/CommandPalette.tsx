import { Box, Text } from "@app/components";
import { ReactNode, useEffect, useState } from "react";
import { Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { CommandProvider } from "./core/CommandProvider";
import { CommandAction } from "./core/CommandAction";
import { CommandType } from "./core/CommandType";
import { useThemeBackbone } from "@app/backbone";
import { Themes } from "@app/theme";

export function CommandPaletteTest(): JSX.Element {
  const { setTheme } = useThemeBackbone();

  return (
    <Box>
      <Text>Dada</Text>
      <TextInput placeholder="dada"/>

      <CommandProvider>
        <CommandAction
          name={"dada"}
          type={CommandType.ACTION}
          action={() => console.log("dada")}
        />

        <CommandAction
          name={"fafa"}
          type={CommandType.FUNCTION}
          action={() => console.log("fafa")}
        />

        <CommandAction
          name={"Set blue theme"}
          type={CommandType.FUNCTION}
          action={() => setTheme(Themes.blue)}
        />

        <CommandAction
          name={"Set red theme"}
          type={CommandType.FUNCTION}
          action={() => setTheme(Themes.red)}
        />
      </CommandProvider>
    </Box>
  );
}
