import React, { useState, useEffect } from "react";
import moment from "moment";

const ManageEvents = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noBookings, setNoBookings] = useState(false);

  // Fetch bookings from the backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/event/allbookings",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          },
        );

        if (!response.ok) {
          if (response.status === 404) {
            setNoBookings(true);
            setBookings([]);
          } else {
            throw new Error("Failed to fetch bookings.");
          }
        } else {
          const data = await response.json();
          setBookings(data);
          setNoBookings(false);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading)
    return <div className="text-center text-gray-600 mt-8">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-8">Error: {error}</div>;

  // Update status
  const updateStatus = async (bookingId, status) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/event/approvebooking`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({
            status: status,
            bookingId: bookingId,
          }),
        },
      );

      if (response.ok) {
        const updatedBooking = await response.json();
        setBookings((prev) =>
          prev.map((booking) =>
            booking.bookingId === bookingId
              ? {
                  ...booking,
                  slot: {
                    ...booking.slot,
                    status: updatedBooking?.status || status,
                  },
                }
              : booking,
          ),
        );
      } else {
        console.error(
          "Failed to update booking status, status code:",
          response.status,
        );
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  // Delete booking
  const deleteBooking = async (bookingId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/event/deletebooking?bookingId=${bookingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );

      if (response.ok) {
        setBookings((prev) =>
          prev.filter((booking) => booking.bookingId !== bookingId),
        );
        console.log("Booking deleted successfully");
      } else {
        console.error("Failed to delete booking");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const filteredBookings =
    filter === "All"
      ? bookings
      : bookings.filter((booking) => booking.slot.status === filter);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Manage Events
      </h1>

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        {["All", "pending", "approved", "available"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`
              px-6 
              py-2 
              rounded-full 
              text-sm 
              font-medium 
              transition-all 
              duration-300 
              ${
                filter === status
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }
            `}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Bookings Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Event Name",
                "Venue",
                "Start Date & Slot",
                "End Date & Slot",
                "Status",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="
                    px-6 
                    py-3 
                    text-left 
                    text-xs 
                    font-medium 
                    text-gray-500 
                    uppercase 
                    tracking-wider
                  "
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {noBookings ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-8 text-gray-500 text-xl"
                >
                  No bookings found
                </td>
              </tr>
            ) : filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => {
                const slotTime = booking.slot.slotTime;
                const startTime = moment(slotTime, "hh:mm a");
                const endTime = startTime.clone().add(45, "minutes");
                const formattedEndTime = endTime.format("hh:mm a");

                return (
                  <tr
                    key={booking.bookingId}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.eventName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.slot.venue.venueName || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.slot.date} - {booking.slot.slotTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.slot.date} - {formattedEndTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`
                          inline-block 
                          px-3 
                          py-1 
                          rounded-full 
                          text-xs 
                          font-semibold 
                          ${
                            booking.slot.status === "booked"
                              ? "bg-green-100 text-green-800"
                              : booking.slot.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : booking.slot.status === "denied"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                          }
                        `}
                      >
                        {booking.slot.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={() =>
                            updateStatus(booking.bookingId, "approved")
                          }
                          className="
                            text-green-600 
                            hover:text-green-800 
                            transition-colors 
                            duration-300
                          "
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            updateStatus(booking.bookingId, "denied")
                          }
                          className="
                            text-red-600 
                            hover:text-red-800 
                            transition-colors 
                            duration-300
                          "
                        >
                          Deny
                        </button>
                        <button
                          onClick={() => deleteBooking(booking.bookingId)}
                          className="
                            text-gray-600 
                            hover:text-gray-800 
                            transition-colors 
                            duration-300
                          "
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-8 text-gray-500 text-xl"
                >
                  No bookings match the current filter
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageEvents;
