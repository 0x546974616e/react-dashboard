import React from "react";

import { HomeLayout } from "Application/layouts";

import "./Home.scss";

export const Home = React.memo(_Home);

// https://tailwindui.com/components/application-ui/page-examples/detail-screens
// https://tailwindui.com/components/application-ui/page-examples/home-screens

function _Home(): JSX.Element {
  return (
    <HomeLayout></HomeLayout>
  );
}
