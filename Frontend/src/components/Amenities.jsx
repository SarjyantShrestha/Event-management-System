import React from "react";

const Amenities = ({ modal, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold text-center mb-4">
          {modal.venueName}
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Location: <span className="font-medium">{modal.location}</span>
        </p>
        <p className="text-gray-600 text-center mb-6">
          Capacity: <span className="font-medium">{modal.capacity}</span>
        </p>
        <h3 className="text-lg font-semibold mb-3">Amenities</h3>
        {modal.amenities && modal.amenities.length > 0 ? (
          <ul className="space-y-2">
            {modal.amenities.map((amenity, index) => (
              <li
                key={index}
                className="px-4 py-2 border rounded bg-gray-100 text-gray-700"
              >
                {amenity}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No amenities listed.</p>
        )}
      </div>
    </div>
  );
};

export default Amenities;
