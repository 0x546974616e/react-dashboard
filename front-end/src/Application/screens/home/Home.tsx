import React from "react";
import { LogUpdates } from "Application/utils";

export const Home = React.memo(_Home);

function _Home(): JSX.Element {
  return (
    <LogUpdates id="home">
      <div>Home</div>
    </LogUpdates>
  );
}
