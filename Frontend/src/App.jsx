import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import MainLayout from "./Layouts/MainLayout";
import DashboardAdmin from "./components/DashboardAdmin";
import DashboardUser from "./components/DashboardUser";
import EventsCalendar from "./components/EventCalendar";
import EventBooking from "./components/EventBooking";
import UserDetails from "./components/UserDetails";
import ManageSpaces from "./components/Spaces";
import ManageEvent from "./components/ManageEvent";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorPage from "./components/ErrorPage";
import { jwtDecode } from "jwt-decode";
import "./App.css";

function App() {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.role); // Set the user role
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="login"
          element={<LoginPage setUserRole={setUserRole} userRole={userRole} />}
        />
        <Route path="register" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute
              allowedRoles={["admin", "user"]}
              userRole={userRole}
            />
          }
        >
          <Route element={<MainLayout />}>
            {/* Role-Based Dashboard */}
            <Route
              path="/"
              element={
                userRole === "admin" ? <DashboardAdmin /> : <DashboardUser />
              }
            />

            {/* Shared Routes */}
            <Route path="events-calendar" element={<EventsCalendar />} />
            <Route path="event-booking" element={<EventBooking />} />

            {/* Admin-Only Routes */}
            <Route
              element={
                <ProtectedRoute allowedRoles={["admin"]} userRole={userRole} />
              }
            >
              <Route path="user-details" element={<UserDetails />} />
              <Route path="spaces" element={<ManageSpaces />} />
              <Route path="manage-events" element={<ManageEvent />} />
            </Route>
          </Route>
        </Route>

        {/* Catch-All for Errors */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
