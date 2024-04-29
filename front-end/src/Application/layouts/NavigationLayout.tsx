import { Header } from "Application/components";
import { Outlet } from "react-router-dom";

export function NavigationLayout(): JSX.Element {
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  );
}
