import React, { useEffect } from "react";
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
  selectedDate,
  selectedSlots,
  onSlotSelect,
  availableSlots = [],
}) => {
  console.log("DAMN:" + selectedSlots);

  // Determine slot status based on available slots
  const getSlotStatus = (time) => {
    // Extract the start time from the slot

    const startTime = time.split(" - ")[0].split(" ")[0];
    // Find the matching slot in availableSlots
    const matchingSlot = availableSlots.find(
      (availSlot) => availSlot === startTime,
    );

    if (!matchingSlot) {
      return "available";
    } // Default if no match found

    return "pending"; // Adjust based on your API response
  };

  // Check if the current slot is selected for the current date
  // const isSlotSelected = (time) => {
  //   if (!selectedDate) return false;
  //   const startTime = time.split(" - ")[0];
  //   return selectedSlots.includes(startTime);
  // };

  // Determine button classes based on slot status and selection
  // const getSlotButtonClasses = (slot) => {
  //   const status = getSlotStatus(slot);
  //   const isSelected = isSlotSelected(slot);

  //   // Base classes for different statuses
  //   const statusClasses = {
  //     pending: "bg-yellow-200 text-yellow-800 cursor-not-allowed",
  //     booked: "bg-red-200 text-red-800 cursor-not-allowed",
  //     available: "bg-gray-200 text-gray-700 hover:bg-blue-100",
  //   };

  //   // If slot is selected, override with blue
  //   if (isSelected) {
  //     return "bg-blue-500 text-white";
  //   }

  //   // Return status-based classes
  //   return statusClasses[status] || statusClasses["available"];
  // };

  const getButtonColor = (time) => {
    const status = getSlotStatus(time);

    if (status === "available") return " bg-white-600";
    else return " bg-blue-600";
  };

  return (
    <>
      <h3 className="text-xl font-semibold">
        <div className="text-center">
          <p className="text-lg mb-4 text-blue-50000">
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
              onClick={() => {
                const status = getSlotStatus(time);
                if (status !== "pending") {
                  onSlotSelect(time);
                }
              }}
              disabled={
                getSlotStatus(time) === "booked" ||
                getSlotStatus(time) === "pending"
              }
              className={`w-full text-center p-3 rounded-lg transition-colors duration-200 ${getButtonColor(time)}`}
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
