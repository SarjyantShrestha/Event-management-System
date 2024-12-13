import React, { useState, useEffect } from "react";
import TimeSlotSelection from "./TimeSlotSelection";
import Calendar from "react-calendar";
import "./customCss/calendar.css";
import axios from "axios";
import { format } from "date-fns";

const EventBooking = () => {
  const today = new Date();
  const [venues, setVenues] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // calender date used to display date above slots
  const [calendarSelectedDate, setCalendarSelectedDate] = useState([]); //selected calendar date in array
  const [selectedSlots, setSelectedSlots] = useState([]);

  const [eventDetails, setEventDetails] = useState({
    eventName: "",
    date: [],
    slotTime: [],
    venueName: "",
    participants: 0,
  });

  const handleDateChange = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setSelectedDate(formattedDate);
  };

  //form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const fetchVenues = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/venues", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setVenues(response.data);
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };

  const fetchSlots = async (venueName, date) => {
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
      // const slotTimes = response.data.map((slot) => slot.slotTime);
      // setCurrentDateSlots(slotTimes);

      return response.data;
    } catch (error) {
      console.error("Error fetching date:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  //CALENDAR COMPONENT FUNCTIONS
  //calendar date select and deselect
  const handleDateClick = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");

    if (calendarSelectedDate.includes(formattedDate)) {
      // Remove the date if it's already selected
      setCalendarSelectedDate(
        calendarSelectedDate.filter((d) => d !== formattedDate),
      );
    } else {
      // Add the date if it's not selected
      setCalendarSelectedDate([...calendarSelectedDate, formattedDate]);
    }
  };

  //Change tile color for selected date
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = format(date, "yyyy-MM-dd");
      if (calendarSelectedDate.includes(formattedDate)) {
        return "bg-blue-500 text-white font-bold";
      }
    }
    return null;
  };

  return (
    <div className="event-booking-container max-w-4xl mx-auto p-6 bg-white rounded-lg">
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
          <div className="w-1/2 flex mb-auto justify-center my-auto">
            <Calendar
              onChange={handleDateChange} //set current date
              minDetail="month"
              minDate={today}
              calendarType="gregory"
              onClickDay={handleDateClick} //add dates to array for tile highlight
              tileClassName={tileClassName} //for tile highlight
            />
          </div>
          <div className="w-1/2">
            <TimeSlotSelection
              selectedDate={selectedDate}
              calendarSelectedDate={calendarSelectedDate}
              selectedSlots={selectedSlots}
              setSelectedSlots={setSelectedSlots}
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
