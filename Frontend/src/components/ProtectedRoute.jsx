import React from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = ({ allowedRoles, userRole }) => {
  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/error" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
