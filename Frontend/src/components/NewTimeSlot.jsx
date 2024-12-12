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

const NewTimeSlot = ({ selectedDate }) => {
  // Base classes for different statuses
  const statusClasses = {
    pending: "bg-yellow-200 text-yellow-800 cursor-not-allowed",
    booked: "bg-red-200 text-red-800 cursor-not-allowed",
    available: "bg-gray-200 text-gray-700 hover:bg-blue-100",
  };

  return (
    <>
      <h3 className="text-xl font-semibold">
        <div className="text-center">
          <p className="text-lg mb-4 text-blue-500">
            {selectedDate ? (
              format(selectedDate, "eeee, MMMM d")
            ) : (
              <span className="text-red-600">!! Select a date !!</span>
            )}
          </p>
        </div>
      </h3>
      <div className="h-[80%] overflow-auto">
        <div className="space-y-2 px-10">
          {timeSlots.map((slot, index) => (
            <button
              type="button"
              key={index}
              className={
                "w-full text-center p-3 rounded-lg transition-colors duration-200"
              }
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewTimeSlot;
