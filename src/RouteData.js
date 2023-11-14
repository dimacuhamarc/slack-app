import React from "react";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import MessageDashboard from "./pages/MessageDashboard";
import Messages from "./components/DirectMessages/Messages";
import Channels from "./pages/Channels";

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
    component: () => <MessageDashboard />
  },
  {
    path: "/messages/:id",
    exact: true,
    component: () => <Messages />
  },
  {
    path: "/channel/:id",
    exact: true,
    component: () => <Channels />
  },
];

export default RouteData;