import React, { useState } from "react";
import SpaceForm from "./Spaces/SpaceForm";

const ManageSpaces = () => {
  const [spaces, setSpaces] = useState([
    { 
      name: "Conference Room A", 
      location: "Building 1", 
      capacity: 20, 
      price: 100, 
      image: "https://unsplash.com/photos/a-living-room-filled-with-furniture-and-a-staircase-PuTKvRO7Fjs" // Placeholder image
    },
    { 
      name: "Banquet Hall", 
      location: "Building 2", 
      capacity: 100, 
      price: 500, 
      image: "https://unsplash.com/photos/a-living-room-filled-with-furniture-and-a-staircase-PuTKvRO7Fjs" 
    },
    { 
      name: "Meeting Pod", 
      location: "Building 3", 
      capacity: 5, 
      price: 50, 
      image: "https://unsplash.com/photos/a-living-room-filled-with-furniture-and-a-staircase-PuTKvRO7Fjs" 
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddSpace = (newSpace) => {
    setSpaces([...spaces, newSpace]);
    setIsModalOpen(false); // Close modal after adding
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Listed Venue</h1>
      {/* Add Venue Button */}
      <div className="text-right mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Venue
        </button>
      </div>

      {/* Space Table */}
      <div className="space-y-6">
        {spaces.map((space, index) => (
          <div key={index} className="flex bg-white rounded-lg shadow-md overflow-hidden">
            <img src={space.image} alt={space.name} className="w-1/3 object-cover" />
            <div className="w-2/3 p-6">
              <h2 className="text-2xl font-bold mb-2">{space.name}</h2>
              <p className="text-gray-700 mb-2"><strong>Location:</strong> {space.location}</p>
              <p className="text-gray-700 mb-2"><strong>Capacity:</strong> {space.capacity}</p>
              <p className="text-gray-700 mb-2"><strong>Price:</strong> ${space.price}</p>
            </div>
          </div>
        ))}
      </div>


      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Add New Venue</h2>
            <SpaceForm onAddSpace={handleAddSpace} />
            <button
              onClick={() => setIsModalOpen(false)}
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

