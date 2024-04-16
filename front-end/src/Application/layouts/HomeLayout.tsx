import React from "react";

import { useLayout } from "Application/hooks";
import { Layout } from "Application/types";

export const HomeLayout = React.memo(_HomeLayout);

const layouts = [
  Layout.PHONE,
  Layout.TABLET,
  Layout.LAPTOP,
  Layout.DESKTOP,
] as const;

function _HomeLayout(
    props: {

    }
  ): JSX.Element
{
  const layout = useLayout(layouts);

  return (
    <div style={{ flexDirection: "row" }}>
      {Layout[layout]}
    </div>
  );
}
