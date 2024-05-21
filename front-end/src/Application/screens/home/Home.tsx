import React, { useCallback, useMemo } from "react";

import { HomeLayout } from "Application/layouts";

import "./Home.scss";
import { LogUpdates } from "Application/utils";
import { KpiChartExample } from "Application/examples";
import { TreeSelectorExample } from "Application/examples";
import { Breadcrumbs } from "Application/components";
import Example3 from "../settings/with_shared_borders3";
import { useHomeLayoutContext } from "Application/contexts/HomeLayoutContext";

export const Home = React.memo(_Home);

// https://tailwindui.com/components/application-ui/page-examples/detail-screens
// https://tailwindui.com/components/application-ui/page-examples/home-screens


function Dada(): JSX.Element {
  const { openTreeSelector } = useHomeLayoutContext(); // TODO TMP

  return (
    <Breadcrumbs>
      {useMemo(
        () => [
          { label: "Europe", onPress: openTreeSelector },
          { label: "Belgique", onPress: openTreeSelector },
          { label: "Brussels", onPress: openTreeSelector },
          { label: "Foot Locker", onPress: openTreeSelector },
          { label: "Jane Doe", onPress: openTreeSelector },
        ],
        [ openTreeSelector ]
      )}
    </Breadcrumbs>
  );
}

function Fafa(): JSX.Element {
  const { closeTreeSelector } = useHomeLayoutContext(); // TODO TMP

  return (
    // <div className="w-full h-full border-r-2 border-r-white">
    <div className="w-full h-full flex flex-col border-r border-r-stone-200 bg-white">
      {closeTreeSelector && (
        <div className={"shrink-0"}>
          <button
            className={"accent-indigo-600 px-2 py-1 rounded-lg border border-indigo-600 bg-indigo-500 text-white"}
            onClick={closeTreeSelector}
          >
            &lt; Back (WIP)
          </button>
        </div>
      )}
      <div className={"flex-1 min-h-0 overflow-hidden"}>
        <TreeSelectorExample/>
      </div>
    </div>
  );
}

function _Home(): JSX.Element {
  return (
    <HomeLayout
      treeSelector={
        <Fafa/>
      }
      kpiChart={
        <LogUpdates id="kpi-chart">
          <div className="h-full w-full bg-stone-100">
            <div className="px-4 pt-2">
              <Dada/>
            </div>
            {/* <hr className="m-2 mb-4 border"/> */}
            <div className="mx-4 mb-4 mt-2 px-4 py-2 rounded-lg bg-indigo-500 border border-indigo-600">
              <div className="text-white flex flex-col justify-center items-center gap-0">
                <div className="h-4"></div>
                <strong className="text-6xl font-normal">80%</strong>
                <p>From objective</p>
                <div className="h-4"></div>
                <div className="flex flex-row justify-center mt-2 gap-2">
                  <span className="cursor-pointer w-2 h-2 bg-white rounded-full"></span>
                  <span className="cursor-pointer w-2 h-2 border border-white rounded-full bg-[#8888ff88]"></span>
                  <span className="cursor-pointer w-2 h-2 border border-white rounded-full bg-[#8888ff88]"></span>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white p-4 mx-auto max-w-[70%] border">
              <KpiChartExample/>
            </div>
            {/* <Example3/> */}
          </div>
        </LogUpdates>
      }
      ranking={
        <div className="w-full h-full bg-white border-l border-l-stone-200">
          "ranking"
        </div>
      }
    />
  );
}
