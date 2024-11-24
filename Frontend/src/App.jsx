import { BrowserRouter, Routes, Route } from "react-router"; // Updated import
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import MainLayout from "./Layouts/MainLayout";
import Dashboard from "./components/Dashboard";
import EventsCalendar from "./components/EventCalendar";
import EventBooking from "./components/EventBooking";
import UserDetails from "./components/UserDetails";
import Holidays from "./components/Holidays";
import "./App.css";

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
          <Route path="holidays" element={<Holidays />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
