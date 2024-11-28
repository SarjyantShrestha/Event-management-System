// import React, { useState } from "react";
// import SpaceForm from "./Spaces/SpaceForm";
// import SpaceList from "./Spaces/SpaceLists";

// const ManageSpaces = () => {
//   // Sample spaces data
//   const [spaces, setSpaces] = useState([
//     { name: "Conference Room A", location: "Building 1", capacity: 20, price: 100 },
//     { name: "Banquet Hall", location: "Building 2", capacity: 100, price: 500 },
//     { name: "Meeting Pod", location: "Building 3", capacity: 5, price: 50 },
//   ]);

//   // Add new space
//   const handleAddSpace = (newSpace) => {
//     setSpaces([...spaces, newSpace]);
//   };

//   return (
//     <div className="bg-gray-200 min-h-screen flex items-center justify-center">
//     <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen rounded-lg shadow-lg">
//       <h1 className="text-3xl font-bold mb-6 text-center">Manage Spaces</h1>
//       <SpaceForm onAddSpace={handleAddSpace} />
//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold mb-4">Available Spaces</h2>
//         <SpaceList spaces={spaces} />
//       </div>
//     </div>
//     </div>
//   );
// };

// export default ManageSpaces;



import React, { useState } from "react";
import SpaceForm from "./Spaces/SpaceForm";

const ManageSpaces = () => {
  const [spaces, setSpaces] = useState([
    { name: "Conference Room A", location: "Building 1", capacity: 20, price: 100 },
    { name: "Banquet Hall", location: "Building 2", capacity: 100, price: 500 },
    { name: "Meeting Pod", location: "Building 3", capacity: 5, price: 50 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddSpace = (newSpace) => {
    setSpaces([...spaces, newSpace]);
    setIsModalOpen(false); // Close modal after adding
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Spaces</h1>
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
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-6 py-3 text-left uppercase">Name</th>
              <th className="px-6 py-3 text-left uppercase">Location</th>
              <th className="px-6 py-3 text-left uppercase">Capacity</th>
              <th className="px-6 py-3 text-left uppercase">Price ($)</th>
            </tr>
          </thead>
          <tbody>
            {spaces.map((space, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4 border">{space.name}</td>
                <td className="px-6 py-4 border">{space.location}</td>
                <td className="px-6 py-4 border">{space.capacity}</td>
                <td className="px-6 py-4 border">{space.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
