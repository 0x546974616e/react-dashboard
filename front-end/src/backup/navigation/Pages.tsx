import { Pages } from "./Page";

export const pages: Pages = [
  {
    index: true,
    path: "home",
    i18nLabel: "Page_Home",
    content: () => <div>Home</div>,
  },
  {
    path: "notifications",
    i18nLabel: "Page_Notifications",
    content: () => <div>Notifications</div>,
  },
  {
    path: "settings",
    i18nLabel: "Page_Settings",
    content: () => <div>Settings</div>,
  },
];
