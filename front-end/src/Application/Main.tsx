import { Home, Notifications, Settings } from "./screens";
import { NavigationProvider } from "./contexts";
import { Navigation } from "./navigation";
import { Pages } from "./types";
import { LogUpdates } from "./utils";

import "./theme";

const pages: Pages = [
  {
    index: true,
    path: "home",
    i18nLabel: "Page_Home",
    content: () => <Home/>,
  },
  {
    path: "notifications",
    i18nLabel: "Page_Notifications",
    content: () => <Notifications/>,
  },
  {
    path: "settings",
    i18nLabel: "Page_Settings",
    content: () => <Settings/>
  },
];

export function Main(): JSX.Element {

  return (
    <LogUpdates id="main">
      <NavigationProvider>
        <Navigation pages={pages}/>
      </NavigationProvider>
    </LogUpdates>
  );
}
