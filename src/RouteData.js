import React from "react";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";

const RouteData = [
  {
    path: "/onboarding",
    exact: true,
    component: () => <Onboarding />
  },
  {
    path: "/dashboard",
    exact: true,
    component: () => <Dashboard />
  }
];

export default RouteData;