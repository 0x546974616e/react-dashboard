import React from "react";

import { useLayout } from "Application/hooks";
import { Layout } from "Application/types";
import { DivLayout } from "./DivLayout";

export const HomeLayout = React.memo(_HomeLayout);

const layouts = [
  Layout.PHONE,
  Layout.TABLET,
  Layout.LAPTOP,
  Layout.DESKTOP,
] as const;

function _HomeLayout(
    props: {

    }
  ): JSX.Element
{
  const layout = useLayout(layouts);

  switch (layout) {
    case Layout.PHONE: {
      return (
        <DivLayout width={"100%"} height={"100%"} debug>
          <p className={"text-center"}>
            {Layout[layout]}
          </p>
        </DivLayout>
      );
    }
  }

  return (
    <div className={"w-full h-full flex flex-row"}>
      <div className={"grow"}>1</div>
      <div className={"grow"}>
        <DivLayout height={"100%"} debug>
          <p className={"text-center"}>
            {Layout[layout]}
          </p>
        </DivLayout>
      </div>
      <div className={"grow"}>2</div>
    </div>
  );
}
