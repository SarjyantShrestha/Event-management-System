import React, { useState } from 'react';

const initialEvents = [
  {
    id: 1,
    name: 'Music Concert',
    venue: 'Hall A',
    date: '2024-08-01',
    time: '18:00',
    participants: 150,
    status: 'Pending',
  },
  {
    id: 2,
    name: 'Tech Meetup',
    venue: 'Conference Room 3',
    date: '2024-08-05',
    time: '10:00',
    participants: 50,
    status: 'Approved',
  },
  {
    id: 3,
    name: 'Art Workshop',
    venue: 'Studio 2',
    date: '2024-08-10',
    time: '14:00',
    participants: 30,
    status: 'Denied',
  },
];

const ManageEvents = () => {
  const [events, setEvents] = useState(initialEvents);
  const [filter, setFilter] = useState('All');

  const updateStatus = (id, status) => {
    const updatedEvents = events.map(event =>
      event.id === id ? { ...event, status } : event
    );
    setEvents(updatedEvents);
  };

  const deleteEvent = (id) => {
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
  };

  const filteredEvents = filter === 'All'
    ? events
    : events.filter(event => event.status === filter);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Manage Events</h1>

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        {['All', 'Pending', 'Approved', 'Denied'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-6 py-2 rounded-full ${
              filter === status ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'
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
              {['Event Name', 'Venue', 'Start Date & Time', 'Participants', 'Status', 'Actions'].map((header) => (
                <th key={header} className="py-4 px-6 text-center border-b">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredEvents.map(event => (
              <tr key={event.id} className="hover:bg-gray-100 border-b">
                <td className="py-4 px-6 text-center">{event.name}</td>
                <td className="py-4 px-6 text-center">{event.venue}</td>
                <td className="py-4 px-6 text-center">{event.date} at {event.time}</td>
                <td className="py-4 px-6 text-center">{event.participants}</td>
                <td className="py-4 px-6 text-center">{event.status}</td>
                <td className="py-4 px-6 flex justify-center space-x-3">
                  <button onClick={() => updateStatus(event.id, 'Approved')} className="text-green-500 hover:text-green-700">Approve</button>
                  <button onClick={() => updateStatus(event.id, 'Denied')} className="text-red-500 hover:text-red-700">Deny</button>
                  <button onClick={() => deleteEvent(event.id)} className="text-gray-500 hover:text-gray-700">Delete</button>
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
