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
          // Check for specific 404 status for no bookings
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
        console.log("Backend response:", updatedBooking);

        // Update the status in the local state
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
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Manage Events
      </h1>

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        {["All", "pending", "approved", "available"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-6 py-2 rounded-full ${
              filter === status
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-700"
            } hover:bg-blue-500 hover:text-white transition`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Bookings Table */}
      <div className="overflow-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border-collapse border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              {[
                "Event Name",
                "Venue",
                "Start Date & Slot",
                "End Date & Slot",
                "Status",
                "Actions",
              ].map((header) => (
                <th key={header} className="py-4 px-6 text-center border-b">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
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
                    className="hover:bg-gray-100 border-b"
                  >
                    <td className="py-4 px-6 text-center">
                      {booking.eventName}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {booking.slot.venue.venueName || "N/A"}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {booking.slot.date} - {booking.slot.slotTime}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {booking.slot.date} - {formattedEndTime}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`inline-block py-1 px-3 rounded-full text-white 
    ${
      booking.slot.status === "booked"
        ? "bg-green-400"
        : booking.slot.status === "pending"
          ? "bg-yellow-400"
          : booking.slot.status === "denied"
            ? "bg-red-500"
            : "bg-gray-300"
    }`}
                      >
                        {booking.slot.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 flex justify-center space-x-3">
                      <button
                        onClick={() =>
                          updateStatus(booking.bookingId, "approved")
                        }
                        className="text-green-500 hover:text-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          updateStatus(booking.bookingId, "denied")
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        Deny
                      </button>
                      <button
                        onClick={() => deleteBooking(booking.bookingId)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        Delete
                      </button>
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
