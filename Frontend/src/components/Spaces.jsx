import React, { useState } from "react";
import SpaceForm from "./Spaces/SpaceForm";
import img from "../assets/venue.webp";

const ManageSpaces = () => {
  const [spaces, setSpaces] = useState([
    {
      name: "Conference Room A",
      location: "Building 1",
      capacity: 20,
      price: 100,
      image: img, // Placeholder image
    },
    {
      name: "Banquet Hall",
      location: "Building 2",
      capacity: 100,
      price: 500,
      image: img,
    },
    {
      name: "Meeting Pod",
      location: "Building 3",
      capacity: 5,
      price: 50,
      image: img,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSpace, setEditingSpace] = useState(null);

  const handleAddSpace = (newSpace) => {
    if (editingSpace !== null) {
      const updatedSpaces = spaces.map((space, index) =>
        index === editingSpace.index ? newSpace : space,
      );
      setSpaces(updatedSpaces);
    } else {
      setSpaces([...spaces, newSpace]);
    }
    setIsModalOpen(false);
    setEditingSpace(null);
  };

  const handleDeleteSpace = (index) => {
    const updatedSpaces = spaces.filter((_, i) => i !== index);
    setSpaces(updatedSpaces);
  };

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
              <th className="px-6 py-3 font-semibold">Image</th>
              <th className="px-6 py-3 font-semibold">Name</th>
              <th className="px-6 py-3 font-semibold">Location</th>
              <th className="px-6 py-3 font-semibold">Capacity</th>
              <th className="px-6 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {spaces.map((space, index) => (
              <tr key={index} className="hover:bg-gray-100 border-t">
                <td className="px-6 py-4 flex justify-center">
                  <img
                    src={space.image}
                    alt={space.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 text-center">{space.name}</td>
                <td className="px-6 py-4 text-center ">{space.location}</td>
                <td className="px-6 py-4 text-center">{space.capacity}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingSpace({ ...space, index });
                        setIsModalOpen(true);
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSpace(index)}
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
            <SpaceForm
              onAddSpace={handleAddSpace}
              initialData={editingSpace || {}}
            />
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
