import React from "react";
import { LogUpdates } from "Application/utils";

export const Notifications = React.memo(_Notifications);

function _Notifications(): JSX.Element {
  return (
    <LogUpdates id="notifications">
      <div>Notifications</div>
    </LogUpdates>
  );
}
