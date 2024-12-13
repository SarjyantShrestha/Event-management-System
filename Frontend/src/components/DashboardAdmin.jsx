import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";

const DashboardAdmin = () => {
  const [TotalEvents, setTotalEvents] = useState("");
  const [TotalBookings, setTotalBookings] = useState("");
  const [TotalVenues, setTotalVenues] = useState("");
  const [totalUsers, setTotalUsers] = useState("");

  const fetchTotalBookings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/event/totalbookings",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );
      setTotalBookings(response.data.totalBookings);
    } catch (error) {
      console.error("Error getting total bookings", error);
    }
  };

  const fetchTotalEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/event/totalevents",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );
      setTotalEvents(response.data.uniqueEventNames);
    } catch (error) {
      console.error("Error getting total bookings", error);
    }
  };

  const fetchTotalVenues = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/venues/totalvenues",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );
      setTotalVenues(response.data.totalVenues);
    } catch (error) {
      console.error("Error getting total venues", error);
    }
  };

  const fetchTotalUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/totalusers",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );
      setTotalUsers(response.data.totalUsers);
    } catch (error) {
      console.error("Error getting total bookings", error);
    }
  };

  useEffect(() => {
    fetchTotalBookings();
    fetchTotalEvents();
    fetchTotalVenues();
    fetchTotalUsers();
  }, []);

  return (
    <div className="content">
      <div className="widgets-container">
        <div className="widget">
          <div className="widget-icon blue">
            <i className="fas fa-calendar-check"></i>
          </div>
          <div className="widget-info flex  items-center space-x-10">
            <div>
              <h3>Total Events</h3>
              <p className="number">{TotalEvents}</p>
            </div>
          </div>
        </div>

        <div className="widget">
          <div className="widget-icon green">
            <i className="fas fa-bookmark"></i>
          </div>
          <div className="widget-info">
            <h3>Total Bookings</h3>
            <p className="number">{TotalBookings}</p>
          </div>
        </div>

        <div className="widget">
          <div className="widget-icon purple">
            <i className="fas fa-door-open"></i>
          </div>
          <div className="widget-info">
            <h3>Total Venues</h3>
            <p className="number">{TotalVenues}</p>
          </div>
        </div>

        <div className="widget">
          <div className="widget-icon orange">
            <i className="fas fa-users"></i>
          </div>
          <div className="widget-info">
            <h3>Total Users</h3>
            <p className="number">{totalUsers}</p>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          {/* Link to Event Booking (for Create Event) */}
          <Link to="/event-booking" className="action-btn">
            <i className="fas fa-plus"></i> Create Event
          </Link>

          {/* Link to Events Calendar */}
          <Link to="/events-calendar" className="action-btn">
            <i className="fas fa-calendar"></i> View Calendar
          </Link>

          {/* Link to User Details */}
          <Link to="/user-details" className="action-btn">
            <i className="fas fa-users-cog"></i> Manage Users
          </Link>

          {/* Link to Settings (Optional: link to a settings page if created) */}
          <Link to="/spaces" className="action-btn">
            <i className="fas fa-cog"></i> Settings
          </Link>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-container">
          <div className="activity-section">
            <h4>Recent Bookings</h4>
            <ul className="activity-list">
              <li>
                <span className="activity-icon">
                  <i className="fas fa-bookmark"></i>
                </span>
                <div className="activity-details">
                  <p>Conference Room A booked</p>
                  <small data-time="2023-12-25T10:00:00">2 hours ago</small>
                </div>
              </li>
              <li>
                <span className="activity-icon">
                  <i className="fas fa-bookmark"></i>
                </span>
                <div className="activity-details">
                  <p>Meeting Room B reserved</p>
                  <small data-time="2023-12-25T07:00:00">5 hours ago</small>
                </div>
              </li>
            </ul>
          </div>

          <div className="activity-section">
            <h4>Upcoming Events</h4>
            <ul className="activity-list">
              <li>
                <span className="activity-icon">
                  <i className="fas fa-calendar"></i>
                </span>
                <div className="activity-details">
                  <p>Team Building Workshop</p>
                  <small data-time="2023-12-26T10:00:00">
                    Tomorrow, 10:00 AM
                  </small>
                </div>
              </li>
              <li>
                <span className="activity-icon">
                  <i className="fas fa-calendar"></i>
                </span>
                <div className="activity-details">
                  <p>Annual Meeting</p>
                  <small data-time="2023-12-27T14:00:00">In 2 days</small>
                </div>
              </li>
            </ul>
          </div>

          <div className="activity-section">
            <h4>New Users</h4>
            <ul className="activity-list">
              <li>
                <span className="activity-icon">
                  <i className="fas fa-user"></i>
                </span>
                <div className="activity-details">
                  <p>John Doe joined</p>
                  <small data-time="2023-12-24T15:00:00">1 day ago</small>
                </div>
              </li>
              <li>
                <span className="activity-icon">
                  <i className="fas fa-user"></i>
                </span>
                <div className="activity-details">
                  <p>Jane Smith joined</p>
                  <small data-time="2023-12-23T10:00:00">2 days ago</small>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
