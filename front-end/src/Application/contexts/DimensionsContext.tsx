import { createContext } from "react";

import { Dimensions, Layout } from "Application/types";

export const DimensionsContext = (
  createContext<Dimensions>({
    // Fallback but it should never happen.
    width: Layout.LAPTOP,
    height: Layout.LAPTOP,
  })
);
