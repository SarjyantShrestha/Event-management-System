import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
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
            <div className="widget-details">
              <span>Upcoming: 45</span>
              <span>Completed: 80</span>
            </div>
          </div>
        </div>

        <div className="widget">
          <div className="widget-icon green">
            <i className="fas fa-bookmark"></i>
          </div>
          <div className="widget-info">
            <h3>Total Bookings</h3>
            <p className="number">89</p>
            <div className="widget-details">
              <span>Pending: 12</span>
              <span>Confirmed: 72</span>
              <span>Cancelled: 5</span>
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
            <div className="widget-details">
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
            <div className="widget-details">
              <span>New Users: 15</span>
              <span>Active: 180</span>
            </div>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-btn">
            <i className="fas fa-plus"></i> Create Event
          </button>
          <button className="action-btn">
            <i className="fas fa-calendar"></i> View Calendar
          </button>
          <button className="action-btn">
            <i className="fas fa-users-cog"></i> Manage Users
          </button>
          <button className="action-btn">
            <i className="fas fa-cog"></i> Settings
          </button>
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

export default Dashboard;
