// import React from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';  // CSS for the calendar

// // Set up the localizer
// const localizer = momentLocalizer(moment);

// const EventCalendar = () => {
//   // Example event data
//   const events = [
//     {
//       id: 1,
//       title: "Holiday - New Year's Day",
//       start: new Date(2024, 0, 1),  // January 1st, 2024
//       end: new Date(2024, 0, 1),    // Same day
//       color: "#FF5733",             // Red color for holiday
//       allDay: true,
//     },
//     {
//       id: 2,
//       title: "Team Building Event",
//       start: new Date(2024, 4, 15, 10, 0),  // May 15th, 2024, 10:00 AM
//       end: new Date(2024, 4, 15, 12, 0),    // May 15th, 2024, 12:00 PM
//       color: "#3498DB",                   // Blue color for event
//       allDay: false,
//     }
//   ];

//   return (
//     <div style={{ height: '600px' }}>
//       <Calendar
//         localizer={localizer}
//         events={events}  // Pass the events array
//         startAccessor="start"
//         endAccessor="end"
//         defaultDate={new Date()} // Set default date to today's date
//         eventPropGetter={(event) => ({
//           style: {
//             backgroundColor: event.color || "#3182CE",  // Use the custom event color or default to blue
//             color: "#fff",  // Text color inside the event box
//             borderRadius: "5px",  // Rounded corners
//             padding: "5px",  // Padding inside the event box
//           }
//         })}
//       />
//     </div>
//   );
// };

// export default EventCalendar;

import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Set up the localizer with Moment.js
const localizer = momentLocalizer(moment);

const EventCalendar = () => {
  const [events, setEvents] = useState([]); // State to hold the events

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/event-bookings/approved');
        const data = await response.json();
        
        console.log('Fetched events:', data); // Log the fetched events to check the structure
        
        // Map the data to the format required by react-big-calendar
        const formattedEvents = data.map(event => {
          // Check if the event has the necessary properties
          if (!event.start_date || !event.start_time || !event.end_date || !event.end_time) {
            console.error('Event missing date/time:', event); // Log events missing required data
            return null; // Skip events that are missing necessary data
          }

          // Use Moment.js to parse and format the combined date-time strings
          const startDateTime = moment(`${event.start_date} ${event.start_time}`, 'YYYY-MM-DD HH:mm:ss').toDate();
          const endDateTime = moment(`${event.end_date} ${event.end_time}`, 'YYYY-MM-DD HH:mm:ss').toDate();

          return {
            id: event.calendar_id,
            title: event.event_name,
            start: startDateTime,
            end: endDateTime,
            color: "#3182CE",  
            allDay: false,     
          };
        }).filter(event => event !== null); 

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div style={{ height: '600px' }}>
      <Calendar
        localizer={localizer}
        events={events}  // Pass the fetched events
        startAccessor="start"
        endAccessor="end"
        defaultDate={new Date()} // Set default date to today's date
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.color || "#3182CE",  
            color: "#fff",  
            borderRadius: "5px",  
            padding: "5px",  
          }
        })}
      />
    </div>
  );
};

export default EventCalendar;

