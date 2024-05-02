import React from "react";

import { LogUpdates } from "Application/utils";
import { HomeLayout } from "Application/layouts";
import { useDimensions, useScrollPosition } from "Application/hooks";

import "./Home.scss";
import { KpiValues } from "Application/components";
import { KpiChart } from "Application/components";

export const Home = React.memo(_Home);

// https://tailwindui.com/components/application-ui/page-examples/detail-screens
// https://tailwindui.com/components/application-ui/page-examples/home-screens

function _Home(): JSX.Element {
  return (
    <div>
      <p>Home</p>
      <h1 className="text-3xl font-bold underline text-blue-600">
        Hello world!
      </h1>
      <div className="p-4 flex flex-col gap-4">
        <KpiChart/>

        <hr className=""/>

        <KpiValues
          title={"Lorem Ipsum"}
          value1={12345}
          value2={68767}
          relation
          features={{
            graph: true,
            ranking: true,
            info: true,
          }}
          onPress={(feature) => console.log("press", { feature })}
          onLongPress={() => console.log("long press")}
          onContextMenu={() => console.log("context menu")}
        />

        <KpiValues
          title={"Dada fafa"}
          value1={12345}
          value2={687}
          relation
          features={{
            graph: true,
          }}
          onPress={(feature) => console.log("press", { feature })}
        />

        <KpiValues
          title={"Daafa fa"}
          value1={66}
          value2={66}
          relation
          features={{
            graph: true,
            info: true,
          }}
          onPress={(feature) => console.log("press", { feature })}
        />

        <KpiValues
          title={"Gaga fa"}
          value1={12323}
          value2={10000}
          relation={{
            type: "relative",
          }}
          features={{
            graph: true,
            ranking: true,
          }}
          onPress={(feature) => console.log("press", { feature })}
        />
      </div>
    </div>
  );
}
