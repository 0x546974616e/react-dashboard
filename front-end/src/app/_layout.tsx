import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Backbone } from "@app/backbone";
import { SafeArea } from "@app/components";
import { NavigationLayout, ScreenLayout } from "@app/layouts";
import { LogUpdates } from "@app/utils";

export default function() {
  return (
    <GestureHandlerRootView style={{ flex : 1 }}>
      <Backbone>
        <SafeArea>
          <ScreenLayout>
            <NavigationLayout>
              <LogUpdates id={"_layout"}>
                <Slot/>
              </LogUpdates>
            </NavigationLayout>
          </ScreenLayout>
        </SafeArea>
      </Backbone>
    </GestureHandlerRootView>
  );
}
