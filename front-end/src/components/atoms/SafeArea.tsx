import { Fragment, ReactNode } from "react";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@shopify/restyle";

import {
  SafeAreaProvider,
  initialWindowMetrics,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Box } from "./Box";
import { Theme } from "@app/theme";

export function SafeArea(
    props: { children: ReactNode }
  ): JSX.Element
{
  const insets = useSafeAreaInsets();
  const { statusBar, colors: { primary500 }} = useTheme<Theme>();

  return (
    <Fragment>
      <StatusBar
        style={statusBar}
        backgroundColor={primary500}
      />
      <SafeAreaProvider
        // Apparently, "initialWindowMetrics" cannot be used with react-native-navigation.
        initialMetrics={initialWindowMetrics}
      >
        <Box
          width={"100%"}
          height={"100%"}
          backgroundColor={"primary500"}
          style={{
            paddingTop: insets.top,
            paddingRight: insets.right,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
          }}
        >
          <Box
            width={"100%"}
            height={"100%"}
            backgroundColor={"white"}
          >
            {props.children}
          </Box>
        </Box>
      </SafeAreaProvider>
    </Fragment>
  );
}
