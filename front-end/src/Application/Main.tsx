import { NavigationProvider } from "./contexts";
import { Navigation } from "./navigation";
import { Pages } from "./types";

import "./theme";

const pages: Pages = [
  {
    path: "home",
    i18nLabel: "Page_Home",
    content: () => <div>Dada</div>
  },
  {
    path: "notifications",
    i18nLabel: "Page_Notifications",
    content: () => <div>Dada</div>
  },
  {
    path: "settings",
    i18nLabel: "Page_Settings",
    content: () => <div>Dada</div>
  },
];

export function Main(): JSX.Element {

  return (
    <NavigationProvider>
      <Navigation pages={pages}/>
    </NavigationProvider>
  );
}
