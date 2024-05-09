// import React from "react";

import { NavigationLayout } from "Application/layouts";
import { Home, Notifications, Settings } from "Application/screens";

import {
  // BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Routes,
  // Link,
  // NavLink,
  // Outlet,
  Navigate,
  // useRouteError,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <div>Page not found.</div>,
    // errorElement: <ErrorBoundary></ErrorBoundary>,
    // ErrorBoundary: <ErrorBoundary/>,
    element: <NavigationLayout/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/home",
        element: <Navigate replace to={"/"}/>
      },
      {
        path: "/index",
        element: <Navigate replace to={"/"}/>
      },
      {
        path: "/records",
        element: <Settings/>
      },
      {
        path: "/messages",
        element: <Notifications/>
      },
      {
        path: "/settings",
        element: <Settings/>
      },
    ]
  },
]);

export function Navigation() {
  return (
    <div id="navigation">
      <RouterProvider router={router}/>
    </div>
  );
}
