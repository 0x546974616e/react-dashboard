import { ReactNode } from "react";

import { useLayout } from "@app/hooks";
import { Header } from "@app/components";
import { Layout } from "@app/types";

import { Col1f1gLayout, Col1g1fLayout } from "./base";

export function NavigationLayout(
    { children }: { children?: ReactNode }
  ): JSX.Element
{
  const debug = false;
  const layout = useLayout([ Layout.PHONE, Layout.DESKTOP ]);

  switch (layout) {
    case Layout.PHONE:
      return (
        <Col1g1fLayout
          bottomHeight={50}
          bottomChildren={<Header/>}
          topChildren={children}
          id={"navigation-layout"}
          debug={debug}
        />
      );

    case Layout.DESKTOP:
      return (
        <Col1f1gLayout
          topHeight={50}
          topChildren={<Header/>}
          bottomChildren={children}
          id={"navigation-layout"}
          debug={debug}
        />
      );
  }
}
