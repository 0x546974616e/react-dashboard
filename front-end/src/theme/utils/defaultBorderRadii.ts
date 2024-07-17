import { Theme } from "../Theme";
import { defaultSpacing } from "./defaultSpacing";

export const defaultBorderRadii: Theme["borderRadii"] = {
  ...defaultSpacing,
  default: defaultSpacing["1"],
  full: 9999,
};
