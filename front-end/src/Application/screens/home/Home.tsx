import React from "react";

import { LogUpdates } from "Application/utils";
import { HomeLayout } from "Application/layouts";

export const Home = React.memo(_Home);

function _Home(): JSX.Element {
  return (
    <LogUpdates id="home">
      <div>Home</div>
      <HomeLayout/>
    </LogUpdates>
  );
}
