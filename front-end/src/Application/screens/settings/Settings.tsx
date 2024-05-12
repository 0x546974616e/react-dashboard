import React from "react";
import { LogUpdates } from "Application/utils";
import Example from "./with_shared_borders";
import Example2 from "./with_shared_borders2";
import { KpiChartExample } from "Application/examples";
import Example3 from "./with_shared_borders3";

export const Settings = React.memo(_Settings);

// https://www.lemonsqueezy.com/

function _Settings(): JSX.Element {
  // throw 41;
  // @ts-ignore
  return (
    <LogUpdates id="settings">
      <div className="h-full overflow-scroll">
        <div>Settings</div>
        <div className="bg-stone-100 p-4">
          <div className="bg-white rounded-lg shadow p-4 w-full">
            <KpiChartExample />
          </div>

          <div className="mt-6">
            <Example/>
          </div>
          <div className="mt-6">
            <Example2/>
          </div>
          <div className="mt-6">
            <Example3/>
          </div>
        </div>
      </div>
    </LogUpdates>
  );
}
