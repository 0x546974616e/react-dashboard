import { DimensionsProvider } from "./contexts";
import { Navigation } from "./navigation";
import { LogUpdates } from "./utils";

import "./theme";

export function Main(): JSX.Element {

  return (
    <LogUpdates id="main">
      <DimensionsProvider>
        <Navigation/>
      </DimensionsProvider>
    </LogUpdates>
  );
}
