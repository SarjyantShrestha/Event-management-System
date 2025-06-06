import { useContext } from "react";
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
import { UserContext } from "./contexts/UserContext";
import Profile from "./components/Profile";
import "./App.css";

function App() {
  const { userrole } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute
              allowedRoles={["admin", "user"]}
              userRole={userrole}
            />
          }
        >
          <Route element={<MainLayout />}>
            {/* Role-Based Dashboard */}
            <Route
              path="/"
              element={
                userrole === "admin" ? <DashboardAdmin /> : <DashboardUser />
              }
            />

            {/* Shared Routes */}
            <Route
              path="events-calendar"
              element={<EventsCalendar userrole={userrole} />}
            />
            <Route path="event-booking" element={<EventBooking />} />
            <Route path="profile" element={<Profile />} />

            {/* Admin-Only Routes */}
            <Route
              element={
                <ProtectedRoute allowedRoles={["admin"]} userRole={userrole} />
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
