import React, { ReactNode, useMemo, useState } from "react";

import { HomeLayoutContext } from "Application/contexts";
import { useLayout } from "Application/hooks";
import { Layout } from "Application/types";

import {
  Row1f1p1gLayout,
  Row1g1gmLayout,
  Row1p1pm1gLayout,
} from "./base";

const layouts = [
  Layout.PHONE,
  Layout.LAPTOP,
  Layout.DESKTOP,
] as const;

export const HomeLayout = React.memo(_HomeLayout);

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

  const [ showTreeSelectorModal, setTreeSelectorModal ] = useState(false);

  const layoutContext = useMemo(
    (): HomeLayoutContext => ({
      openTreeSelector() {
        setTreeSelectorModal(true);
      },
      closeTreeSelector() {
        setTreeSelectorModal(false);
      },
    }), []
  );

  switch (layout) {
    case Layout.PHONE: {
      return (
        <HomeLayoutContext.Provider value={layoutContext}>
          <Row1g1gmLayout
            modal={props.treeSelector}
            children={props.kpiChart}
            showModal={showTreeSelectorModal}
            onModalDismiss={layoutContext.closeTreeSelector}
            id={"home-layout"}
            debug={debug}
          />
          {props.kpiChart}
        </HomeLayoutContext.Provider>
      );
    }

    case Layout.LAPTOP: {
      return (
        <HomeLayoutContext.Provider value={layoutContext}>
          <Row1p1pm1gLayout
            leftPercentage={0.65}
            leftChildren={props.kpiChart}
            rightChildren={props.ranking}
            leftModal={props.treeSelector}
            showLeftModal={showTreeSelectorModal}
            onLeftModalDismiss={layoutContext.closeTreeSelector}
            id={"home-layout"}
            debug={debug}
          />
        </HomeLayoutContext.Provider>
      );
    }
  }

  return (
    <Row1f1p1gLayout
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
