import React, { useState, useEffect } from "react";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("All");

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/event-bookings"
        );
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const updateStatus = (calendar_id, status) => {
    // Update status logic (can be expanded to interact with the backend)
    const updatedEvents = events.map((event) =>
      event.calendar_id === calendar_id ? { ...event, status } : event
    );
    setEvents(updatedEvents);
  };
  
  const deleteEvent = (calendar_id) => {
    // Delete event logic (can be expanded to interact with the backend)
    const updatedEvents = events.filter((event) => event.calendar_id !== calendar_id);
    setEvents(updatedEvents);
  };
  
  const filteredEvents =
    filter === "All"
      ? events
      : events.filter((event) => event.status === filter);

  return (
    <div className="p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Manage Events
      </h1>

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        {["All", "Pending", "Approved", "Denied"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-6 py-2 rounded-full ${
              filter === status
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-700"
            } hover:bg-blue-500 hover:text-white transition`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Events Table */}
      <div className="overflow-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border-collapse border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              {[
                "Event Name",
                "Venue",
                "Start Date & Time",
                "End Date & Time",
                "Participants",
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
            {filteredEvents.map((event) => (
              <tr key={event.calendar_id} className="hover:bg-gray-100 border-b">
                <td className="py-4 px-6 text-center">{event.event_name}</td>
                <td className="py-4 px-6 text-center">{event.venue_name}</td>
                <td className="py-4 px-6 text-center">
                  {(() => {
                    // Format date and time
                    const formattedStartDate = new Date(
                      event.start_date
                    ).toLocaleDateString(); // Formats to 'MM/DD/YYYY' by default
                    const formattedStartTime = event.start_time.slice(0, 5); // Assuming end_time is 'HH:MM:SS'

                    return `${formattedStartDate} at ${formattedStartTime}`;
                  })()}
                </td>
                <td className="py-4 px-6 text-center">
                  {(() => {
                    // Format date and time
                    const formattedEndDate = new Date(
                      event.end_date
                    ).toLocaleDateString(); // Formats to 'MM/DD/YYYY' by default
                    const formattedEndTime = event.end_time.slice(0, 5); // Assuming end_time is 'HH:MM:SS'

                    return `${formattedEndDate} at ${formattedEndTime}`;
                  })()}
                </td>

                <td className="py-4 px-6 text-center">{event.participants}</td>
                <td className="py-4 px-6 text-center">{event.status}</td>
                <td className="py-4 px-6 flex justify-center space-x-3">
                  <button
                    onClick={() => updateStatus(event.calendar_id, "Approved")}
                    className="text-green-500 hover:text-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(event.calendar_id, "Denied")}
                    className="text-red-500 hover:text-red-700"
                  >
                    Deny
                  </button>
                  <button
                    onClick={() => deleteEvent(event.calendar_id)}
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