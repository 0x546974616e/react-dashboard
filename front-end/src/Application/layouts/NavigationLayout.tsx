import { Header } from "Application/components";
import { Outlet } from "react-router-dom";
import { DivLayout } from "./DivLayout";

export function NavigationLayout(): JSX.Element {
  return (
    <div className={"w-full h-full flex flex-col overflow-hidden"}>
      <Header/>
      <div className={"grow overflow-hidden"}>
        <Outlet/>
      </div>
    </div>
  );
}
