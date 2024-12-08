import React, { useState } from "react";
import EventBookingCalendar from "./EventBC";
import TimeSlotSelection from "./TimeSlotSelection";

const EventBooking = () => {
  const venues = [
    { id: 1, name: "Conference Room A" },
    { id: 2, name: "Banquet Hall" },
    { id: 3, name: "Outdoor Garden" },
  ];

  // State to manage form fields
  const [eventDetails, setEventDetails] = useState({
    eventName: "",
    venue: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/book-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventDetails),
      });
      const data = await response.json();
      if (response.ok) {
        // Reset the form after successful submission
        setEventDetails({
          eventName: "",
          venue: "",
          startDate: "",
          endDate: "",
          startTime: "",
          endTime: "",
          participants: 1,
        });

        alert("Event booked successfully!");
      } else {
        alert(data.message || "Booking failed.");
      }
    } catch (error) {
      console.error("Error booking event:", error);
    }
  };

  return (
    <div className="event-booking-container max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Event Booking</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Event Name */}
        <div className="form-group">
          <label htmlFor="eventName" className="block text-gray-700">
            Event Name
          </label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={eventDetails.eventName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Venue Selection */}
        <div className="form-group">
          <label htmlFor="venue" className="block text-gray-700">
            Select Venue
          </label>
          <select
            id="venue"
            name="venue"
            value={eventDetails.venue}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a Venue</option>
            {venues.map((venue) => (
              <option key={venue.id} value={venue.name}>
                {venue.name}
              </option>
            ))}
          </select>
        </div>

        {/* Start Date and Time
        <div className="flex gap-4">
          <div className="form-group w-1/2">
            <label htmlFor="startDate" className="block text-gray-700 w-1/2">
              Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={eventDetails.startDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
 */}
        <div className="flex space-x-8">
          <div className="w-1/2">
            <EventBookingCalendar />
          </div>
          <div className="w-1/2">
            <TimeSlotSelection />
          </div>
        </div>
        {/* Number of Participants */}
        <div className="form-group">
          <label htmlFor="participants" className="block text-gray-700">
            Number of Participants
          </label>
          <input
            type="number"
            id="participants"
            name="participants"
            value={eventDetails.participants}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            min="1"
            max="100"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Book Event
        </button>
      </form>
    </div>
  );
};

export default EventBooking;
