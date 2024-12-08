import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Create a localizer using moment.js
const localizer = momentLocalizer(moment);

const CustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(moment().toDate()); // Initialize with today's date

  const handleSelectDate = (date) => {
    setSelectedDate(date); // Update the selected date when a user clicks on a date
    console.log(selectedDate);
  };

  // Format the selected date to display in "Day, Month Date" format
  const formattedDate = moment(selectedDate).format("dddd, MMMM D");

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold">{formattedDate}</h3>{" "}
      {/* Display formatted date */}
      <Calendar
        localizer={localizer}
        views={["month"]} // Only show the month view
        onSelectSlot={handleSelectDate} // Set the selected date on click
        style={{ height: 500 }}
      />
    </div>
  );
};

export default CustomCalendar;
