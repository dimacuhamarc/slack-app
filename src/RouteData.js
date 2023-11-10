import React from "react";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Messages from "./pages/Messages";

const RouteData = [
  {
    path: "/onboarding",
    exact: true,
    component: () => <Onboarding />
  },
  {
    path: "/",
    exact: true,
    component: () => <Dashboard />
  },
  {
    path: "/messages",
    exact: true,
    component: () => <Messages />
  },
];

export default RouteData;