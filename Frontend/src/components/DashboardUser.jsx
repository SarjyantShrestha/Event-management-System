import React from "react";
import { Link } from "react-router";

const DashboardUser = () => {
  return (
    <div className="content">
      <div className="widgets-container">
        <div className="widget">
          <div className="widget-icon blue">
            <i className="fas fa-calendar-check"></i>
          </div>
          <div className="widget-info">
            <h3>Total Events</h3>
            <p className="number">125</p>
            <div className="widget-details flex flex-col">
              <span>Upcoming: 45</span>
              <span>Completed: 80</span>
            </div>
          </div>
        </div>

        <div className="widget">
          <div className="widget-icon purple">
            <i className="fas fa-door-open"></i>
          </div>
          <div className="widget-info">
            <h3>Available Spaces</h3>
            <p className="number">8</p>
            <div className="widget-details flex flex-col">
              <span>Total Rooms: 12</span>
              <span>Occupied: 4</span>
            </div>
          </div>
        </div>

        <div className="widget">
          <div className="widget-icon orange">
            <i className="fas fa-users"></i>
          </div>
          <div className="widget-info">
            <h3>User Activity</h3>
            <p className="number">256</p>
            <div className="widget-details flex flex-col">
              <span>New Users: 15</span>
              <span>Active: 180</span>
            </div>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          {/* Link to Event Booking (for Create Event) */}
          <Link to="/event-booking" className="action-btn">
            <i className="fas fa-plus"></i> Book an Event
          </Link>

          {/* Link to Events Calendar */}
          <Link to="/events-calendar" className="action-btn">
            <i className="fas fa-calendar"></i> View Calendar
          </Link>

          {/* Link to Settings (Optional: link to a settings page if created) */}
          <Link to="/profile" className="action-btn">
            <i className="fas fa-cog"></i> Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
