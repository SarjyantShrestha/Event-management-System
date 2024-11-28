import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';  // CSS for the calendar

// Set up the localizer
const localizer = momentLocalizer(moment);

const EventCalendar = () => {
  // Example event data
  const events = [
    {
      id: 1,
      title: "Holiday - New Year's Day",
      start: new Date(2024, 10, 27),  // January 1st, 2024
      end: new Date(2024, 10, 28),    // Same day
      color: "#FF5733",             // Red color for holiday
      allDay: true,
    },
    {
      id: 2,
      title: "Team Building Event",
      start: new Date(2024, 10, 15, 10, 0),  // May 15th, 2024, 10:00 AM
      end: new Date(2024, 10, 15, 12, 0),    // May 15th, 2024, 12:00 PM
      color: "#3498DB",                   // Blue color for event
      allDay: false,
    }
  ];

  return (
    <div style={{ height: '600px' }}>
      <Calendar
        localizer={localizer}
        events={events}  // Pass the events array
        startAccessor="start"
        endAccessor="end"
        defaultDate={new Date()} // Set default date to today's date
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.color || "#3182CE",  // Use the custom event color or default to blue
            color: "#fff",  // Text color inside the event box
            borderRadius: "5px",  // Rounded corners
            padding: "5px",  // Padding inside the event box
          }
        })}
      />
    </div>
  );
};

export default EventCalendar;
