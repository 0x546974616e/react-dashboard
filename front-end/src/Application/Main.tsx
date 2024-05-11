import { ScreenLayout } from "./layouts";
import { Navigation } from "./navigation";
import { LogUpdates } from "./utils";

import "./theme";

export function Main(): JSX.Element {

  return (
    <LogUpdates id="main">
      <ScreenLayout>
        <Navigation/>
      </ScreenLayout>
    </LogUpdates>
  );
}
