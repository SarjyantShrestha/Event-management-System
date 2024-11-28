import React from "react";

const SpaceList = ({ spaces }) => {
  return (
    <div className="space-y-4 bg-gray-100 p-4 rounded">
      {spaces.map((space, index) => (
        <div key={index} className="p-4 bg-white rounded shadow-md">
          <h3 className="text-xl font-bold">{space.name}</h3>
          <p className="text-gray-600">Location: {space.location}</p>
          <p className="text-gray-600">Capacity: {space.capacity}</p>
          <p className="text-gray-600">Price: ${space.price}</p>
        </div>
      ))}
    </div>
  );
};

export default SpaceList;
