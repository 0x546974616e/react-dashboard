import { Outlet } from "react-router-dom";
import { Header } from "Application/components";

import { Col1f1gLayout } from "./base";

export function NavigationLayout(): JSX.Element {
  return (
    <Col1f1gLayout
      topHeight={50}
      topChildren={<Header/>}
      bottomChildren={<Outlet/>}
      id={"navigation-layout"}
      // debug
    />
  );
}
