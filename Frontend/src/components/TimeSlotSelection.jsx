import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import axios from "axios";

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
  venueId,
}) => {
  const [slotStatuses, setSlotStatuses] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  //
  // Fetch slot statuses when a venue and date are selected
  useEffect(() => {
    if (venueId && selectedDate) {
      const fetchSlotStatuses = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/event/slots-status",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
              params: {
                venueId: venueId,
                date: selectedDate,
              },
            },
          );
          setSlotStatuses(response.data);
        } catch (error) {
          console.error("Error fetching slot statuses:", error);
          setSlotStatuses({});
        } finally {
          setIsLoading(false);
        }
      };
      fetchSlotStatuses();
    }
  }, [venueId, selectedDate]);

  // Handle selecting/deselecting a time slot
  const handleSlotClick = (slot) => {
    const updatedSlots = { ...selectedSlots };
    const currentDateSlots = updatedSlots[selectedDate] || [];

    if (currentDateSlots.includes(slot)) {
      updatedSlots[selectedDate] = currentDateSlots.filter(
        (selectedSlot) => selectedSlot !== slot,
      );
    } else {
      updatedSlots[selectedDate] = [...currentDateSlots, slot];
    }
    setSelectedSlots(updatedSlots);
  };

  // Determine slot button styles based on status
  // const getSlotButtonClasses = (time) => {
  //   const isSelected = selectedSlots[selectedDate]?.includes(time);
  //   const status = slotStatuses[time] || "unavailable"; // Fallback to unavailable
  //   let classes =
  //     "w-full text-center p-3 rounded-lg transition-colors duration-200";
  //
  //   // Treat 'pending' the same as 'unavailable'
  //   if (status === "pending" || status === "booked") {
  //     return `${classes} bg-red-100 text-red-600 cursor-not-allowed opacity-50`;
  //   }
  //
  //   if (status === "available") {
  //     return `${classes} ${
  //       isSelected ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-blue-200"
  //     }`;
  //   }
  //
  //   return `${classes} bg-gray-100 opacity-50 cursor-not-allowed`;
  // };

  const getSlotStatus = (selectedDate, slotStatuses) => {
    // If no date selected or no slot statuses, return an object with all slots as 'available'
    if (!selectedDate || !slotStatuses) {
      return timeSlots.reduce((acc, time) => {
        acc[time] = "available";
        return acc;
      }, {});
    }

    // Create a status map for the selected date
    const dateStatuses = slotStatuses[selectedDate] || {};

    // Map through time slots and assign appropriate status
    return timeSlots.reduce((acc, time) => {
      // If the time exists in the response statuses, use that status
      // Otherwise, default to 'available'
      acc[time] = dateStatuses[time] || "available";
      return acc;
    }, {});
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
        {isLoading ? (
          <div className="text-center text-gray-500">Loading slots...</div>
        ) : (
          <div className="space-y-2 px-10">
            {timeSlots.map((time, index) => {
              const slotStatus = getSlotStatus(selectedDate, slotStatuses)[
                time
              ];

              return (
                <button
                  type="button"
                  key={index}
                  onClick={() => handleSlotClick(time)}
                  disabled={
                    (calendarSelectedDate.length === 0 && venueId === null) ||
                    slotStatus !== "available"
                  }
                  className={`w-full text-center p-3 rounded-lg transition-colors duration-200
                  ${
                    selectedSlots[selectedDate]?.includes(time)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-blue-200"
                  }
                  ${slotStatus !== "available" ? "bg-red-100 text-red-600 cursor-not-allowed opacity-50" : ""}
                  ${calendarSelectedDate.length === 0 ? "cursor-not-allowed opacity-50" : ""}
      `}
                >
                  {time}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default TimeSlotSelection;
