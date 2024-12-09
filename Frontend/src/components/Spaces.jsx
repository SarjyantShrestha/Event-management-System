import React, { useState, useEffect } from "react";
import SpaceForm from "./Spaces/SpaceForm";
import axios from "axios";
// import img from "../assets/venue.webp";

const ManageSpaces = () => {
  const [venue, setVenue] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSpace, setEditingSpace] = useState(null);

  const handleDelete = async (venueId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/venues?venueId=${venueId}`,
      );

      if (response.status !== 200) {
        console.error("Couldn't delete venue");
      }

      fetchVenue();
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchVenue = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/venues");

      if (response.status !== 200) {
        throw new Error("Failed to fetch venues.");
      }

      setVenue(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchVenue();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Listed Venues</h1>

      {/* Add Venue Button */}
      <div className="text-right mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Venue
        </button>
      </div>

      {/* Venue Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="table-auto w-full text-left">
          <thead className="bg-gray-200">
            <tr className="text-center">
              <th className="px-6 py-3 font-semibold">Name</th>
              <th className="px-6 py-3 font-semibold">Capacity</th>
              <th className="px-6 py-3 font-semibold">Location</th>
              <th className="px-6 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {venue &&
              venue.map((venue, index) => (
                <tr key={venue.venueId} className="hover:bg-gray-100 border-t">
                  <td className="px-6 py-4 text-center">{venue.venueName}</td>
                  <td className="px-6 py-4 text-center">{venue.capacity}</td>
                  <td className="px-6 py-4 text-center">{venue.location}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex space-x-2 justify-center">
                      <button
                        onClick={() => {
                          setEditingSpace({ ...venue, index });
                          setIsModalOpen(true);
                        }}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(venue.venueId)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {editingSpace ? "Edit Venue" : "Add New Venue"}
            </h2>
            <SpaceForm setVenue={setVenue} venue={venue} />
            <button
              onClick={() => {
                setIsModalOpen(false);
                setEditingSpace(null);
              }}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSpaces;
