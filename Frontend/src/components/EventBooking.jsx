import React, { useState } from "react";
import TimeSlotSelection from "./TimeSlotSelection";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios"; // Make sure Axios is imported
import { format } from "date-fns";

const EventBooking = () => {
  const venues = [
    { id: 1, name: "Hall 1" },
    { id: 2, name: "Hall 2" },
    { id: 3, name: "Hall 3" },
  ];

  const [eventDetails, setEventDetails] = useState({
    eventName: "",
    date: [],
    slotTime: [], // Store selected slots here
    venueName: "",
    participants: 0,
  });

  const [selectedDate, setSelectedDate] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setEventDetails({
      ...eventDetails,
      date: format(date, "yyyy-MM-dd"), // Update the date field
    });
  };

  // Handle time slot selection
  const handleSlotSelection = (slot) => {
    const startTime = slot.split(" - ")[0]; // Extract the starting time
    setEventDetails((prevDetails) => {
      const isSelected = prevDetails.slotTime.includes(startTime);
      const updatedSlots = isSelected
        ? prevDetails.slotTime.filter((s) => s !== startTime) // Remove if already selected
        : [...prevDetails.slotTime, startTime]; // Add if not selected
      return {
        ...prevDetails,
        slotTime: updatedSlots,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/event/booking",
        eventDetails,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      if (response.status === 200 || response.status === 201) {
        setEventDetails({
          eventName: "",
          date: [],
          slotTime: [],
          venueName: "",
          participants: 0,
        });
        console.log(eventDetails);

        alert("Event booked successfully!");
      } else {
        alert(response.data.error || "Booking failed.");
      }
    } catch (error) {
      console.error("Error booking event:", error);
      alert(
        error.response?.data?.error || "An error occurred. Please try again.",
      );
    }
  };

  return (
    <div className="event-booking-container max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Event Booking</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
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

        {/* Venue Selection */}
        <div className="form-group">
          <label htmlFor="venue" className="block text-gray-700">
            Select Venue
          </label>
          <select
            id="venue"
            name="venueName"
            value={eventDetails.venueName}
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

        {/* Calendar and Time Slot Selection */}
        <div className="flex h-80 space-x-8">
          <div className="w-1/2 flex mb-auto justify-center">
            <Calendar onChange={handleDateChange} value={selectedDate} />
          </div>
          <div className="w-1/2">
            <TimeSlotSelection
              selectedDate={selectedDate}
              selectedSlots={eventDetails.slotTime}
              onSlotSelect={handleSlotSelection}
            />
          </div>
        </div>

        {/* Submit Button - Now part of the form and below the calendar/time slot section */}
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
