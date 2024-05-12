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
  const layout = useLayout(layouts);

  const debug = true;

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
          leftPercentage={0.6}
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
      leftWidth={300}
      middlePercentage={0.6}
      leftChildren={props.treeSelector}
      middleChildren={props.kpiChart}
      rightChildren={props.ranking}
      debug={debug}
      id={"home-layout"}
    />
  );
}
