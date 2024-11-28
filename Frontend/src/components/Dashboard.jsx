import React from "react";
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div class="content">
      <div class="widgets-container">
        <div class="widget">
          <div class="widget-icon blue">
            <i class="fas fa-calendar-check"></i>
          </div>
          <div class="widget-info">
            <h3>Total Events</h3>
            <p class="number">125</p>
            <div class="widget-details">
              <span>Upcoming: 45</span>
              <span>Completed: 80</span>
            </div>
          </div>
        </div>

        <div class="widget">
          <div class="widget-icon green">
            <i class="fas fa-bookmark"></i>
          </div>
          <div class="widget-info">
            <h3>Total Bookings</h3>
            <p class="number">89</p>
            <div class="widget-details">
              <span>Pending: 12</span>
              <span>Confirmed: 72</span>
              <span>Cancelled: 5</span>
            </div>
          </div>
        </div>

        <div class="widget">
          <div class="widget-icon purple">
            <i class="fas fa-door-open"></i>
          </div>
          <div class="widget-info">
            <h3>Available Spaces</h3>
            <p class="number">8</p>
            <div class="widget-details">
              <span>Total Rooms: 12</span>
              <span>Occupied: 4</span>
            </div>
          </div>
        </div>

        <div class="widget">
          <div class="widget-icon orange">
            <i class="fas fa-users"></i>
          </div>
          <div class="widget-info">
            <h3>User Activity</h3>
            <p class="number">256</p>
            <div class="widget-details">
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

      <div class="recent-activity">
        <h3>Recent Activity</h3>
        <div class="activity-container">
          <div class="activity-section">
            <h4>Recent Bookings</h4>
            <ul class="activity-list">
              <li>
                <span class="activity-icon">
                  <i class="fas fa-bookmark"></i>
                </span>
                <div class="activity-details">
                  <p>Conference Room A booked</p>
                  <small data-time="2023-12-25T10:00:00">2 hours ago</small>
                </div>
              </li>
              <li>
                <span class="activity-icon">
                  <i class="fas fa-bookmark"></i>
                </span>
                <div class="activity-details">
                  <p>Meeting Room B reserved</p>
                  <small data-time="2023-12-25T07:00:00">5 hours ago</small>
                </div>
              </li>
            </ul>
          </div>

          <div class="activity-section">
            <h4>Upcoming Events</h4>
            <ul class="activity-list">
              <li>
                <span class="activity-icon">
                  <i class="fas fa-calendar"></i>
                </span>
                <div class="activity-details">
                  <p>Team Building Workshop</p>
                  <small data-time="2023-12-26T10:00:00">
                    Tomorrow, 10:00 AM
                  </small>
                </div>
              </li>
              <li>
                <span class="activity-icon">
                  <i class="fas fa-calendar"></i>
                </span>
                <div class="activity-details">
                  <p>Annual Meeting</p>
                  <small data-time="2023-12-27T14:00:00">In 2 days</small>
                </div>
              </li>
            </ul>
          </div>

          <div class="activity-section">
            <h4>New Users</h4>
            <ul class="activity-list">
              <li>
                <span class="activity-icon">
                  <i class="fas fa-user"></i>
                </span>
                <div class="activity-details">
                  <p>John Doe joined</p>
                  <small data-time="2023-12-24T15:00:00">1 day ago</small>
                </div>
              </li>
              <li>
                <span class="activity-icon">
                  <i class="fas fa-user"></i>
                </span>
                <div class="activity-details">
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
