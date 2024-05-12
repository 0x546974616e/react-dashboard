import { Outlet } from "react-router-dom";
import { Header } from "Application/components";

import { Col1Fixed1GrowLayout } from "./atoms";

export function NavigationLayout(): JSX.Element {
  return (
    <Col1Fixed1GrowLayout
      topHeight={80}
      topChildren={<Header/>}
      bottomChildren={<Outlet/>}
      id={"navigation-layout"}
      // debug
    />
  );
}
