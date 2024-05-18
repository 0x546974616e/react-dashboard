import React from "react";

import {
  ChartWithGridExample,
  ChartWithNestedTransformsExample,
  ChartWithPolylinesExamples,
  KpiChartExample,
} from "Application/examples";

import "./Example.scss";

export const Example = React.memo(_Example);

// https://tailwindui.com/components/application-ui/page-examples/detail-screens
// https://tailwindui.com/components/application-ui/page-examples/home-screens

function _Example(): JSX.Element {
  return (
    <div className="bg-stone-100 h-full overflow-auto">
      <p>Example</p>

      <h1 className="text-3xl font-bold underline text-blue-600">
        Hello world!
      </h1>

      <div className="p-4 flex flex-col gap-4">
        <div className="bg-white rounded-lg shadow p-4 w-full">
          <KpiChartExample/>
        </div>

        <ChartWithPolylinesExamples/>
        <ChartWithGridExample/>
        <ChartWithNestedTransformsExample/>

        <hr className=""/>
      </div>
    </div>
  );
}
