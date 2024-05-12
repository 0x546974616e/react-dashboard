import React, { ReactNode } from "react";

import { useLayout } from "Application/hooks";
import { Layout } from "Application/types";
import { DivLayout } from "./DivLayout";

export const HomeLayout = React.memo(_HomeLayout);

const layouts = [
  Layout.PHONE,
  Layout.LAPTOP,
  Layout.DESKTOP,
] as const;

function _HomeLayout(
    props: {
      chart: ReactNode,
      kpis: ReactNode,
      tree: ReactNode,
    }
  ): JSX.Element
{
  const layout = useLayout(layouts);

  const debug = true;

  switch (layout) {
    case Layout.PHONE: {
      return (
        <DivLayout width={"100%"} height={"100%"} debug={debug}>
          <p className={"text-center"}>
            {Layout[layout]}
          </p>
          {props.chart}
        </DivLayout>
      );
    }

    case Layout.LAPTOP: {
      return (
        <div className={"w-full h-full flex flex-row"}>
          <div className={"w-[60%]"}>
            <DivLayout
              id={"home-chart"}
              width={"100%"}
              height={"100%"}
              overflowX={"hidden"}
              overflowY={"scroll"}
              debug={debug}
            >
              <p className={"text-center"}>
                {Layout[layout]}
              </p>
              {props.chart}
            </DivLayout>
          </div>
          <div className={"grow"}>2</div>
        </div>
      );
    }
  }

  return (
    <div className={"w-full h-full flex flex-row overflow-hidden"}>
      <div className={"grow overflow-hidden"}>
        <DivLayout
          id={"home-tree"}
          width={"100%"}
          height={"100%"}
          overflowX={"hidden"}
          overflowY={"hidden"}
          // debug={debug}
        >
          {props.tree}
        </DivLayout>
      </div>
      <div className={"w-[50%]"}>
        <DivLayout
          id={"home-chart"}
          width={"100%"}
          height={"100%"}
          overflowX={"hidden"}
          overflowY={"scroll"}
          debug={debug}
        >
          <p className={"text-center"}>
            {Layout[layout]}
          </p>
          {props.chart}
        </DivLayout>
      </div>
      <div className={"w-[30%]"}>
        <DivLayout
          id={"home-ranking"}
          width={"100%"}
          height={"100%"}
          overflowX={"hidden"}
          overflowY={"hidden"}
          debug={debug}
        >
          Ranking
        </DivLayout>
      </div>
    </div>
  );
}
