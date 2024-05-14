import React, { ReactNode } from "react";

import { useLayout } from "Application/hooks";
import { Layout } from "Application/types";

import {
  Row1Fixed1Percentage1AutoLayout,
  Row1Percentage1AutoLayout,
} from "./atoms";

export const HomeLayout = React.memo(_HomeLayout);

const layouts = [
  Layout.PHONE,
  Layout.LAPTOP,
  Layout.DESKTOP,
] as const;

function _HomeLayout(
    props: {
      kpiChart?: ReactNode,
      treeSelector?: ReactNode,
      ranking?: ReactNode,
    }
  ): JSX.Element
{
  const debug = false;
  const layout = useLayout(layouts);

  switch (layout) {
    case Layout.PHONE: {
      return (
        <div>
          {props.kpiChart}
        </div>
      );
    }

    case Layout.LAPTOP: {
      return (
        <Row1Percentage1AutoLayout
          leftPercentage={0.65}
          leftChildren={props.kpiChart }
          rightChildren={props.ranking}
          id={"home-layout"}
          debug={debug}
        />
      );
    }
  }

  return (
    <Row1Fixed1Percentage1AutoLayout
      leftWidth={350}
      middlePercentage={0.65}
      leftChildren={props.treeSelector}
      middleChildren={props.kpiChart}
      rightChildren={props.ranking}
      id={"home-layout"}
      debug={debug}
    />
  );
}
