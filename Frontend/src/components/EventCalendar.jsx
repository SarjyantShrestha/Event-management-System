import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Set up the localizer with Moment.js
const localizer = momentLocalizer(moment);

const EventCalendar = ({ userrole }) => {
  const [events, setEvents] = useState([]); // State to hold the events

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let url;
        if (userrole === "admin")
          url = "http://localhost:5000/api/event/approvedbookings";
        else url = "http://localhost:5000/api/event/my-bookings";
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        const data = await response.json();
        console.log("Fetched events:", data); // Log the fetched events to check the structure

        // Map the data to the format required by react-big-calendar
        const formattedEvents = data
          .map((event) => {
            // Check if the event has the necessary properties
            if (
              !event.slot ||
              !event.slot.date ||
              !event.slot.slotTime ||
              !event.slot.venue ||
              !event.slot.venue.venueName
            ) {
              console.error("Event missing necessary data:", event); // Log events missing required data
              return null; // Skip events that are missing necessary data
            }

            // Combine event details into a single string for the event title
            const eventTitle = `${event.eventName} - ${event.slot.venue.venueName}`;

            // Use Moment.js to parse and format the date-time
            const startDateTime = moment(
              `${event.slot.date} ${event.slot.slotTime}`,
              "YYYY-MM-DD hh:mm a",
            );
            const endDateTime = startDateTime.clone().add(45, "minutes"); // Add 45 minutes to start time for end time

            return {
              id: event.bookingId, // Use unique identifier
              title: eventTitle, // Display event name, date, time, and venue
              start: startDateTime.toDate(), // Start time
              end: endDateTime.toDate(), // End time (45 minutes after start time)
              color: "#3182CE", // Optional color
              allDay: false, // Set to false if not an all-day event
            };
          })
          .filter((event) => event !== null); // Remove any null entries

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []); // Empty dependency array to run only once after component mount

  return (
    <div style={{ height: "600px" }}>
      <Calendar
        localizer={localizer}
        events={events} // Pass the fetched events
        startAccessor="start"
        endAccessor="end"
        defaultDate={new Date()} // Set default date to today's date
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.color || "#3182CE",
            color: "#fff",
            borderRadius: "5px",
            padding: "5px",
          },
        })}
      />
    </div>
  );
};

export default EventCalendar;
