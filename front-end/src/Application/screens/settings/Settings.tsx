import React from "react";
import { LogUpdates } from "Application/utils";

export const Settings = React.memo(_Settings);

function _Settings(): JSX.Element {
  return (
    <LogUpdates id="settings">
      <div>Settings</div>
    </LogUpdates>
  );
}
