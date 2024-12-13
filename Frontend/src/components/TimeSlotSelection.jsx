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

const TimeSlotSelection = ({
  calendarSelectedDate,
  selectedDate,
  selectedSlots,
  setSelectedSlots,
}) => {
  // Function to handle selecting/deselecting a time slot
  const handleSlotClick = (slot) => {
    if (selectedSlots.includes(slot)) {
      // Deselect the slot if already selected
      setSelectedSlots(
        selectedSlots.filter((selectedSlot) => selectedSlot !== slot),
      );
    } else {
      // Select the slot if not already selected
      setSelectedSlots([...selectedSlots, slot]);
    }
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
          {timeSlots.map((time, index) => (
            <button
              type="button"
              key={index}
              onClick={() => handleSlotClick(time)}
              disabled={calendarSelectedDate.length === 0}
              className={`w-full text-center p-3 rounded-lg transition-colors duration-200
                ${
                  selectedSlots.includes(time)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-blue-200"
                }
                ${calendarSelectedDate.length === 0 ? "cursor-not-allowed opacity-50" : ""}
              `}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default TimeSlotSelection;
