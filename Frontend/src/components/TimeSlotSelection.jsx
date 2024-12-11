import { useState, useEffect } from "react";
import { format } from "date-fns"; // Importing date-fns for date formatting

const timeSlots = [
  "10:15am - 11:00am",
  "11:00am - 11:45am",
  "11:45am - 12:30pm",
  "12:30pm - 1:15pm",
  "1:15pm - 2:00pm",
  "2:00pm - 2:45pm",
  "2:45pm - 3:30pm",
  "3:30pm - 4:15pm",
  "4:15pm - 5:00pm",
];

const TimeSlotSelection = ({ selectedDate }) => {
  const [displayDate, setDisplayDate] = useState(new Date()); // Default to today's date

  // Update the displayed date whenever selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      setDisplayDate(selectedDate);
    }
  }, [selectedDate]);

  return (
    <>
      <h3 className="text-xl font-semibold">
        <div className="text-center">
          <p className="text-lg mb-4">{format(displayDate, "eeee, MMMM d")}</p>
        </div>
      </h3>
      <div className="h-[80%] overflow-auto">
        <div className="space-y-2 px-10">
          {timeSlots.map((slot, index) => (
            <button
              key={index}
              className="w-full text-center p-3 bg-gray-200 hover:bg-blue-500 hover:text-white rounded-lg"
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default TimeSlotSelection;
