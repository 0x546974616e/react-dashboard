import React from "react";

import { LogUpdates } from "Application/utils";
import { HomeLayout } from "Application/layouts";
import { useDimensions, useScrollPosition } from "Application/hooks";

import "./Home.scss";
import { KpiGraph, KpiValues } from "Application/components";

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
        <KpiGraph
        />

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

function _Home2(): JSX.Element {
  const { width, height } = useDimensions();

  const { y, yp } = useScrollPosition(
    ({ yp }) => {
      // console.log(yp);
    }
  );

  /*
    <div>Home</div>
    <HomeLayout/>
  */

  return (
    <div
      id="home"
      style={{
        position: "relative",
        // backgroundColor: "red",
      }}
    >


      <div
        style={{
          backgroundColor: "blue",
          height: 0.75 * height,
          opacity: Math.max(1 - y / (0.75 * height), 0),
        }}
      >
        dada
      </div>

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          backgroundColor: "green",
          height: Math.max(Math.max(1 - y / (0.75 * height), 0) * (0.75 * height), 100),
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flexGrow: 1
          }}
        >
          Dada
        </div>
        {/* <div
          style={{
            backgroundColor: "white",
            borderRadius: "20px 20px 0 0",
            height: 20,
            flexShrink: 0
          }}
        >
        </div> */}
      </div>


      <div
        onScroll={() => console.log("scroll")}
        onResize={() => console.log("resize")}
        style={{
          // backgroundColor: "red",
          // overflowY: "scroll",
          // overflowX: "hidden",
          // height: 100,
          paddingInline: 20,
          // borderRadius: "20px 20px 0 0",
        }}
      >
        <div>
          {[...Array(100)].map(
            (_, i) => (
              <div key={i}>Home {i} {yp.toFixed(2)}</div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
