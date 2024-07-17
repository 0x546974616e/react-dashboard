import { ReactNode } from "react";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DimensionsProvider } from "@app/contexts";

export function ScreenLayout(
    { children }: { children?: ReactNode }
  ): JSX.Element
{
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  return (
    <DimensionsProvider
      id={"screen"}
      parent={null}
      width={width - insets.left - insets.left}
      height={height - insets.top - insets.bottom}
      // debug={true}
    >
      {children}
    </DimensionsProvider>
  );
}
