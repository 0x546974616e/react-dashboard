import React from "react";

import { HomeLayout } from "Application/layouts";

import "./Home.scss";
import { LogUpdates } from "Application/utils";
import { KpiChartExample } from "Application/examples";
import { TreeSelectorExample } from "Application/examples";

export const Home = React.memo(_Home);

// https://tailwindui.com/components/application-ui/page-examples/detail-screens
// https://tailwindui.com/components/application-ui/page-examples/home-screens

function _Home(): JSX.Element {
  return (
    <HomeLayout
      treeSelector={
        <TreeSelectorExample/>
      }
      kpiChart={
        <LogUpdates id="kpi-chart">
          <KpiChartExample/>
        </LogUpdates>
      }
      ranking={
        "ranking"
      }
    />
  );
}
