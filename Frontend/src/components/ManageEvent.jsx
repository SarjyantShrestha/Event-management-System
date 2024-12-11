import React, { useState, useEffect } from "react";

const ManageEvents = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bookings from the backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/event/my-bookings",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch bookings.");
        }

        const data = await response.json();
        setBookings(data);
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

 // update status
  const updateStatus = async (bookingId, status) => {

    try {
       const response = await fetch(
        `http://localhost:5000/api/event/approvebooking`,
        // Same endpoint, no need for status or bookingId in the URL
        {
          method: "PUT", // or POST if needed
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({
            status: status, // status to be updated
            bookingId: bookingId, // the booking ID to identify the booking
          }),
          
        },

      );


      if (response.ok) {
        const updatedBooking = await response.json();
        // Update the status in the local state
        setBookings((prev) =>
          prev.map((booking) =>
            booking.bookingId === bookingId
              ? {
                  ...booking,
                  slot: { ...booking.slot, status: updatedBooking.status },
                }
              : booking
          )
        );
      } else {
        console.error("Failed to update booking status");
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  // Delete Booking
  const deleteBooking = async (bookingId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/event/approvebooking`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setBookings((prev) =>
          prev.filter((booking) => booking.bookingId !== bookingId)
        );
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
    <div className="p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Manage Events
      </h1>

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        {["All", "pending", "approved", "denied"].map((status) => (
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
            {filteredBookings.map((booking) => (
              <tr
                key={booking.bookingId}
                className="hover:bg-gray-100 border-b"
              >
                <td className="py-4 px-6 text-center">{booking.eventName}</td>
                <td className="py-4 px-6 text-center">
                  {booking.slot.venue.venueName || "N/A"}
                </td>
                <td className="py-4 px-6 text-center">
                  {booking.slot.date} - {booking.slot.slotTime}
                </td>
                <td className="py-4 px-6 text-center">
                  {booking.slot.date} - {booking.slot.slotTime}
                </td>
                <td className="py-4 px-6 text-center">{booking.slot.status}</td>
                <td className="py-4 px-6 flex justify-center space-x-3">
                  <button
                    onClick={() => updateStatus(booking.bookingId, "approved")}
                    className="text-green-500 hover:text-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(booking.bookingId, "denied")}
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageEvents;
