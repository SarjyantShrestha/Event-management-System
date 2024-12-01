// import { Navigate, Outlet } from "react-router";
//
// const ProtectedLayout = () => {
//   const isLoggedIn = localStorage.getItem("authToken"); // Check login state
//   return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
// };
//
// export default ProtectedLayout;

import { Navigate, Outlet } from "react-router";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ requiredRole }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    // If no token is found, redirect to login page
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;

    if (requiredRole && userRole !== requiredRole) {
      // If the user does not have the required role, redirect to an error page
      return <Navigate to="/error" replace />;
    }

    return <Outlet />;
  } catch (error) {
    // If the token is invalid or expired, redirect to login
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
