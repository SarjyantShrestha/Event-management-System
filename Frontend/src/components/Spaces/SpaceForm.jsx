import React, { useState } from "react";
import axios from "axios";

const SpaceForm = ({ setVenue, venue }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/venues/",
        { name, location, capacity },
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      const data = response.data.data;
      setVenue([...venue, data]);

      if (response.status === 200) {
        alert("Venue added Successfully.");
      } else {
        alert(data.message || "Venue failed to add");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Venue Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Capacity:</label>
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Save Venue
      </button>
    </form>
  );
};

export default SpaceForm;
