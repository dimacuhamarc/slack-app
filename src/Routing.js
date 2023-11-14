import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import RouteData from "./RouteData";

const Routing = () => {
  const user = JSON.parse(localStorage.getItem('user') || null)
  
  return (
    <>
      {!user && <Navigate to="/onboarding" />}
      {/* {user && fetchUsers} */}
      <Routes>
        {RouteData.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.component()}
            exact={route.exact}
          />
        ))}
      </Routes>
    </>
  );
}

export default Routing;