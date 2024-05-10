import React from "react";
import { LogUpdates } from "Application/utils";
import Example from "./with_shared_borders";
import Example2 from "./with_shared_borders2";
import { KpiChart } from "Application/components";

export const Settings = React.memo(_Settings);

// https://www.lemonsqueezy.com/

function _Settings(): JSX.Element {
  // throw 41;
  // @ts-ignore
  return (
    <LogUpdates id="settings">
      <div>Settings</div>
      <div className="bg-stone-100 p-4">
        <div className="bg-white rounded-lg shadow p-4 w-full">
          <KpiChart/>
        </div>

        <div className="mt-6">
          <Example/>
        </div>
        <div className="mt-6">
          <Example2/>
        </div>
      </div>
    </LogUpdates>
  );
}
