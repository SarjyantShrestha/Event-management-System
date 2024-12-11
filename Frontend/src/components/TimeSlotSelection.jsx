import React from "react";
import { format } from "date-fns";

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

const TimeSlotSelection = ({ selectedDate, selectedSlots, onSlotSelect }) => {
  return (
    <>
      <h3 className="text-xl font-semibold">
        <div className="text-center">
          <p className="text-lg mb-4">
            {selectedDate
              ? format(selectedDate, "eeee, MMMM d")
              : "Select a date"}
          </p>
        </div>
      </h3>
      <div className="h-[80%] overflow-auto">
        <div className="space-y-2 px-10">
          {timeSlots.map((slot, index) => (
            <button
              key={index}
              onClick={() => onSlotSelect(slot)}
              className={`w-full text-center p-3 rounded-lg ${
                selectedSlots.includes(slot)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-blue-500 hover:text-white"
              }`}
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
