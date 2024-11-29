import { BrowserRouter, Routes, Route } from "react-router"; // Updated import
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import MainLayout from "./Layouts/MainLayout";
import Dashboard from "./components/Dashboard";
import EventsCalendar from "./components/EventCalendar";
import EventBooking from "./components/EventBooking";
import UserDetails from "./components/UserDetails";
import ManageSpaces from "./components/Spaces";
import ManageEvent from "./components/ManageEvent";

import "./App.css";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="events-calendar" element={<EventsCalendar />} />
          <Route path="event-booking" element={<EventBooking />} />
          <Route path="user-details" element={<UserDetails />} />
          <Route path="spaces" element={<ManageSpaces />} />
          <Route path="manage-events" element={<ManageEvent />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
