import React, { useState, useEffect } from "react";
import TimeSlotSelection from "./TimeSlotSelection";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { format } from "date-fns";

const EventBooking = () => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/venues");
        setVenues(response.data);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    };

    fetchVenues();
  }, []);

  const [eventDetails, setEventDetails] = useState({
    eventName: "",
    date: [],
    slotTime: [], // Store selected slots here
    venueName: "",
    participants: 0,
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDateSlots, setCurrentDateSlots] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    // Format the date
    const formattedDate = format(date, "yyyy-MM-dd");
    setSelectedDate(formattedDate);

    // Fetch slots if a venue is selected
    if (eventDetails.venueName) {
      fetchDate(eventDetails.venueName, formattedDate);
    }

    // Find the index of the current date in the existing dates
    const dateIndex = eventDetails.date.indexOf(formattedDate);

    // Reset current date slots
    if (dateIndex !== -1) {
      // If the date exists, get its slots
      setCurrentDateSlots(eventDetails.slotTime[dateIndex] || []);
    } else {
      // If it's a new date, reset slots
      setCurrentDateSlots([]);
    }

    setEventDetails((prevDetails) => {
      // Check if the date is already selected
      const existingDateIndex = prevDetails.date.indexOf(formattedDate);

      if (existingDateIndex === -1) {
        // Date not in the array, add it
        return {
          ...prevDetails,
          date: [...prevDetails.date, formattedDate],
          slotTime: [...prevDetails.slotTime, []], // Add empty slot array for this date
        };
      } else {
        // Date already in the array, remove it
        const updatedDates = prevDetails.date.filter(
          (d) => d !== formattedDate,
        );
        const updatedSlotTimes = prevDetails.slotTime.filter(
          (_, index) => index !== existingDateIndex,
        );

        return {
          ...prevDetails,
          date: updatedDates,
          slotTime: updatedSlotTimes,
        };
      }
    });
  };

  const handleSlotSelection = (slot) => {
    const startTime = slot.split(" - ")[0];

    setEventDetails((prevDetails) => {
      // If no date selected, do nothing
      if (!selectedDate) return prevDetails;

      const formattedDate = format(selectedDate, "yyyy-MM-dd");

      // Find the index of the current date
      const dateIndex = prevDetails.date.indexOf(formattedDate);

      // Create a copy of the current slotTime array
      const updatedSlotTime = [...prevDetails.slotTime];

      // If the date doesn't have any slots yet, add an empty array
      if (dateIndex === -1) return prevDetails;

      // Check if the slot is already selected for this date
      const currentDateSlots = updatedSlotTime[dateIndex] || [];
      const isSelected = currentDateSlots.includes(startTime);

      // Update current date slots state
      let newCurrentDateSlots;

      // Update slots for the specific date
      if (isSelected) {
        // Remove the slot
        newCurrentDateSlots = currentDateSlots.filter((s) => s !== startTime);
        updatedSlotTime[dateIndex] = newCurrentDateSlots;
      } else {
        // Add the slot
        newCurrentDateSlots = [...currentDateSlots, startTime];
        updatedSlotTime[dateIndex] = newCurrentDateSlots;
      }

      // Update current date slots state
      setCurrentDateSlots(newCurrentDateSlots);

      return {
        ...prevDetails,
        slotTime: updatedSlotTime,
      };
    });
  };

  const fetchDate = async (venueName, date) => {
    if (!venueName || !date) return;

    try {
      const response = await axios.get(
        `http://localhost:5000/api/event/slots-by-date_venue`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          params: {
            venueName,
            date,
          },
        },
      );

      console.log("Response data:", response.data);

      // Convert the API response to an array of slot times
      const slotTimes = response.data.map((slot) => slot.slotTime);

      setCurrentDateSlots(slotTimes);
      return response.data;
    } catch (error) {
      console.error("Error fetching date:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any selected dates have no time slots
    const emptySlotDates = eventDetails.date.filter(
      (_, index) => eventDetails.slotTime[index]?.length === 0,
    );

    if (emptySlotDates.length > 0) {
      // Create a readable list of dates without slots
      const datesList = emptySlotDates.join(", ");
      alert(`Please select time slots for the following date(s): ${datesList}`);
      return;
    }

    // Validate that dates and slots match
    const isValid = eventDetails.date.length === eventDetails.slotTime.length;
    if (!isValid) {
      alert("Please ensure each selected date has corresponding time slots.");
      return;
    }

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
        setCurrentDateSlots([]);
        setSelectedDate(null);

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

  const tileClassName = ({ date, view }) => {
    // Only add class to dates in month view
    if (view === "month") {
      // Convert date to ISO string format for comparison
      const formattedDate = format(date, "yyyy-MM-dd");

      // Check if this date is in the selected dates
      if (eventDetails.date.includes(formattedDate)) {
        return "bg-blue-500 text-white font-bold italic"; // Tailwind classes for highlighting
      }
    }
    return null;
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
              <option key={venue.venueId} value={venue.venueName}>
                {venue.venueName}
              </option>
            ))}
          </select>
        </div>

        {/* Calendar and Time Slot Selection */}
        <div className="flex h-80 space-x-8">
          <div className="w-1/2 flex mb-auto justify-center">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileClassName={tileClassName}
            />
          </div>
          <div className="w-1/2">
            <TimeSlotSelection
              selectedDate={selectedDate}
              selectedSlots={currentDateSlots}
              onSlotSelect={handleSlotSelection}
              availableSlots={currentDateSlots} // Add this line
            />
          </div>
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
