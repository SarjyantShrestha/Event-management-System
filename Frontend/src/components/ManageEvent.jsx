// import React, { useState, useEffect } from "react";

// const ManageEvents = () => {
//   const [events, setEvents] = useState([]);
//   const [filter, setFilter] = useState("All");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // // Fetch events from the backend
//   // // useEffect(() => {
//   // //   const fetchEvents = async () => {
//   // //     try {
//   // //       const response = await fetch(
//   // //         "http://localhost:5000/api/event/my-bookings",
//   // //         {
//   // //           headers: {
//   // //             Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//   // //           },
//   // //         }
//   // //       );

//   // //       console.log(localStorage.getItem("authToken"));

//   // //       if (response.status !== 200) {
//   // //         throw new Error("Failed to fetch Bookings.");
//   // //       }

//   // //       const data = response.data;
//   // //       setEvents(data);
//   // //     } catch (error) {
//   // //       setError(error.message);
//   // //     } finally {
//   // //       setLoading(false);
//   // //     }
//   // //   };
//   // //   fetchEvents();
//   // // }, []);

//   // // if (loading) {
//   // //   return <div>Loading...</div>;
//   // // }

//   // // if (error) {
//   // //   return <div>Error: {error}</div>;
//   // // }

//   // useEffect(() => {
//   //   const fetchEvents = async () => {
//   //     try {
//   //       const token = localStorage.getItem("authToken");
//   //       if (!token) {
//   //         setError("Authorization token is missing");
//   //         setLoading(false);
//   //         return;
//   //       }
  
//   //       const response = await fetch("http://localhost:5000/api/event/my-bookings", {
//   //         headers: { Authorization: `Bearer ${token}` },
//   //       });
  
//   //       if (!response.ok) {
//   //         const errorMsg = await response.text();
//   //         throw new Error(errorMsg || "Failed to fetch bookings.");
//   //       }
  
//   //       const data = await response.json(); // Correct parsing
//   //       setEvents(data);
//   //     } catch (error) {
//   //       console.error("Error fetching events:", error);
//   //       setError(error.message);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };
//   //   fetchEvents();
//   // }, []);
  
//   // //update status
//   // const updateStatus = async (calendar_id, status) => {
//   //   try {
//   //     const response = await fetch(
//   //       `http://localhost:5000/api/event-bookings/${calendar_id}`,
//   //       {
//   //         method: "PUT",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //         body: JSON.stringify({ status }), // Sending the status in the body
//   //       }
//   //     );

//   //     if (response.ok) {
//   //       const updatedEvent = await response.json();
//   //       // Update the local events state with the updated status
//   //       const updatedEvents = events.map((event) =>
//   //         event.calendar_id === calendar_id
//   //           ? { ...event, status: updatedEvent.status }
//   //           : event
//   //       );
//   //       setEvents(updatedEvents);
//   //     } else {
//   //       console.error("Failed to update event status");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error updating event status:", error);
//   //   }
//   // };

//   // //delete events

//   // const deleteEvent = async (calendar_id) => {
//   //   try {
//   //     // Send DELETE request to the backend
//   //     const response = await fetch(
//   //       `http://localhost:5000/api/event-bookings/${calendar_id}`,
//   //       {
//   //         method: "DELETE",
//   //       }
//   //     );

//   //     if (response.ok) {
//   //       const data = await response.json();
//   //       console.log("Event deleted:", data);

//   //       // Update UI by removing the deleted event
//   //       const updatedEvents = events.filter(
//   //         (event) => event.calendar_id !== calendar_id
//   //       );
//   //       setEvents(updatedEvents);
//   //     } else {
//   //       console.error("Failed to delete event:", response.statusText);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error deleting event:", error);
//   //   }
//   // };

//   const filteredEvents =
//     filter === "All"
//       ? events
//       : events.filter((event) => event.status === filter);

//   const event = {
//     event_name: "event",
//     venue: "Hall 1",
//     start_datetime: "2015-05-21",
//     end_datetime: "2015-05-23",
//     participants: 100,
//     status: "pending",
//   }

//   return (
//     <div className="p-8 bg-gray-100">
//       <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
//         Manage Events
//       </h1>

//       {/* Filter Buttons */}
//       <div className="flex justify-center space-x-4 mb-6">
//         {["All", "Pending", "Approved", "Denied"].map((status) => (
//           <button
//             key={status}
//             onClick={() => setFilter(status)}
//             className={`px-6 py-2 rounded-full ${
//               filter === status
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-300 text-gray-700"
//             } hover:bg-blue-500 hover:text-white transition`}
//           >
//             {status}
//           </button>
//         ))}
//       </div>

//       {/* Events Table */}
//       <div className="overflow-auto rounded-lg shadow-lg">
//         <table className="min-w-full bg-white border-collapse border border-gray-200">
//           <thead className="bg-blue-600 text-white">
//             <tr>
//               {[
//                 "Event Name",
//                 "Venue",
//                 "Start Date & Time",
//                 "End Date & Time",
//                 "Participants",
//                 "Status",
//                 "Actions",
//               ].map((header) => (
//                 <th key={header} className="py-4 px-6 text-center border-b">
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="text-gray-700">
//             {filteredEvents.map((event) => (
//               <tr
//                 key={event.calendar_id}
//                 className="hover:bg-gray-100 border-b"
//               >
//                 <td className="py-4 px-6 text-center">{event.event_name}</td>
//                 <td className="py-4 px-6 text-center">{event.venue_name}</td>
//                 <td className="py-4 px-6 text-center">
//                   {(() => {
//                     // Format date and time
//                     const formattedStartDate = new Date(
//                       event.start_date
//                     ).toLocaleDateString(); // Formats to 'MM/DD/YYYY' by default
//                     const formattedStartTime = event.start_time.slice(0, 5); // Assuming end_time is 'HH:MM:SS'

//                     return `${formattedStartDate} at ${formattedStartTime}`;
//                   })()}
//                 </td>
//                 <td className="py-4 px-6 text-center">
//                   {(() => {
//                     // Format date and time
//                     const formattedEndDate = new Date(
//                       event.end_date
//                     ).toLocaleDateString(); // Formats to 'MM/DD/YYYY' by default
//                     const formattedEndTime = event.end_time.slice(0, 5); // Assuming end_time is 'HH:MM:SS'

//                     return `${formattedEndDate} at ${formattedEndTime}`;
//                   })()}
//                 </td>

//                 <td className="py-4 px-6 text-center">{event.participants}</td>
//                 <td className="py-4 px-6 text-center">{event.status}</td>
//                 <td className="py-4 px-6 flex justify-center space-x-3">
//                   <button
//                     onClick={() => updateStatus(event.calendar_id, "Approved")}
//                     className="text-green-500 hover:text-green-700"
//                   >
//                     Approve
//                   </button>
//                   <button
//                     onClick={() => updateStatus(event.calendar_id, "Denied")}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Deny
//                   </button>
//                   <button
//                     onClick={() => deleteEvent(event.calendar_id)}
//                     className="text-gray-500 hover:text-gray-700"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageEvents;

// import React, { useState, useEffect } from "react";

// const ManageEvents = () => {
//   const [events, setEvents] = useState([]);
//   const [filter, setFilter] = useState("All");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch events from the backend
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:5000/api/event/my-bookings",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch bookings.");
//         }

//         const data = await response.json();
//         setEvents(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEvents();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   // Update Status
//   const updateStatus = async (calendar_id, status) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/event/my-bookings/${calendar_id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ status }),
//         }
//       );

//       if (response.ok) {
//         const updatedEvent = await response.json();
//         setEvents((prev) =>
//           prev.map((event) =>
//             event.calendar_id === calendar_id
//               ? { ...event, status: updatedEvent.status }
//               : event
//           )
//         );
//       } else {
//         console.error("Failed to update event status");
//       }
//     } catch (error) {
//       console.error("Error updating event status:", error);
//     }
//   };

//   // Delete Event
//   const deleteEvent = async (calendar_id) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/event/my-bookings/${calendar_id}`,
//         { method: "DELETE" }
//       );

//       if (response.ok) {
//         setEvents((prev) =>
//           prev.filter((event) => event.calendar_id !== calendar_id)
//         );
//       } else {
//         console.error("Failed to delete event");
//       }
//     } catch (error) {
//       console.error("Error deleting event:", error);
//     }
//   };

//   const filteredEvents =
//     filter === "All"
//       ? events
//       : events.filter((event) => event.status === filter);

//   return (
//     <div className="p-8 bg-gray-100">
//       <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
//         Manage Events
//       </h1>

//       {/* Filter Buttons */}
//       <div className="flex justify-center space-x-4 mb-6">
//         {["All", "Pending", "Approved", "Denied"].map((status) => (
//           <button
//             key={status}
//             onClick={() => setFilter(status)}
//             className={`px-6 py-2 rounded-full ${
//               filter === status
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-300 text-gray-700"
//             } hover:bg-blue-500 hover:text-white transition`}
//           >
//             {status}
//           </button>
//         ))}
//       </div>

//       {/* Events Table */}
//       <div className="overflow-auto rounded-lg shadow-lg">
//         <table className="min-w-full bg-white border-collapse border border-gray-200">
//           <thead className="bg-blue-600 text-white">
//             <tr>
//               {[
//                 "Event Name",
//                 "Venue",
//                 "Start Date & Time",
//                 "End Date & Time",
//                 "Participants",
//                 "Status",
//                 "Actions",
//               ].map((header) => (
//                 <th key={header} className="py-4 px-6 text-center border-b">
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="text-gray-700">
//             {filteredEvents.map((event) => (
//               <tr key={event.calendar_id} className="hover:bg-gray-100 border-b">
//                 <td className="py-4 px-6 text-center">{event.event_name}</td>
//                 <td className="py-4 px-6 text-center">{event.venue_name}</td>
//                 <td className="py-4 px-6 text-center">
//                   {new Date(event.start_date).toLocaleString()}
//                 </td>
//                 <td className="py-4 px-6 text-center">
//                   {new Date(event.end_date).toLocaleString()}
//                 </td>
//                 <td className="py-4 px-6 text-center">{event.participants}</td>
//                 <td className="py-4 px-6 text-center">{event.status}</td>
//                 <td className="py-4 px-6 flex justify-center space-x-3">
//                   <button
//                     onClick={() => updateStatus(event.calendar_id, "Approved")}
//                     className="text-green-500 hover:text-green-700"
//                   >
//                     Approve
//                   </button>
//                   <button
//                     onClick={() => updateStatus(event.calendar_id, "Denied")}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Deny
//                   </button>
//                   <button
//                     onClick={() => deleteEvent(event.calendar_id)}
//                     className="text-gray-500 hover:text-gray-700"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageEvents;

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

  // Update Status
  const updateStatus = async (bookingId, status) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/event-bookings/${bookingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      if (response.ok) {
        const updatedBooking = await response.json();
        setBookings((prev) =>
          prev.map((booking) =>
            booking.bookingId === bookingId
              ? { ...booking, slot: { ...booking.slot, status: updatedBooking.status } }
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
        `http://localhost:5000/api/event-bookings/${bookingId}`,
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
                <td className="py-4 px-6 text-center">
                  {booking.eventName}
                </td>
                <td className="py-4 px-6 text-center">
                  {booking.slot.venue || "N/A"}
                </td>
                <td className="py-4 px-6 text-center">
                  {booking.slot.date} - {booking.slot.slotTime}
                </td>
                <td className="py-4 px-6 text-center">
                  {booking.slot.date} - {booking.slot.slotTime}
                </td>
                <td className="py-4 px-6 text-center">
                  {booking.slot.status}
                </td>
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
