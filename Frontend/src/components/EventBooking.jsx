import React, { useState } from 'react';

const EventBooking = () => {
  // State to manage form fields
  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    eventDate: '',
    eventTime: '',
    participants: 1,
  });

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate a booking submission (in a real app, you can send this to a server)
    console.log('Event Booking Submitted:', eventDetails);

    // Optionally, reset the form after submission
    setEventDetails({
      eventName: '',
      eventDate: '',
      eventTime: '',
      participants: 1,
    });

    alert('Event booked successfully!');
  };

  return (
    <div className="event-booking-container">
      <h1>Event Booking</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="eventName">Event Name</label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={eventDetails.eventName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventDate">Event Date</label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            value={eventDetails.eventDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventTime">Event Time</label>
          <input
            type="time"
            id="eventTime"
            name="eventTime"
            value={eventDetails.eventTime}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="participants">Number of Participants</label>
          <input
            type="number"
            id="participants"
            name="participants"
            value={eventDetails.participants}
            onChange={handleInputChange}
            min="1"
            max="100"
            required
          />
        </div>

        <button type="submit" className="submit-btn">Book Event</button>
      </form>
    </div>
  );
};

export default EventBooking;
