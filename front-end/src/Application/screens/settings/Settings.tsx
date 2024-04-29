import React from "react";
import { LogUpdates } from "Application/utils";
import Example from "./with_shared_borders";
import Example2 from "./with_shared_borders2";

export const Settings = React.memo(_Settings);

// https://www.lemonsqueezy.com/

function _Settings(): JSX.Element {
  // throw 41;
  // @ts-ignore
  return (
    <LogUpdates id="settings">
      <div>Settings</div>
      <div
        className={"p-6"}
        style={{ backgroundColor: "rgb(243 244 246" }}
      >
        <Example/>
      </div>
      <div
        className={"p-6 mt-6"}
        style={{ backgroundColor: "rgb(243 244 246" }}
      >
        <Example2/>
      </div>
    </LogUpdates>
  );
}
