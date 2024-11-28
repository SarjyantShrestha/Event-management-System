// import React, { useState } from "react";

// const SpaceForm = ({ onAddSpace }) => {
//   const [name, setName] = useState("");
//   const [location, setLocation] = useState("");
//   const [capacity, setCapacity] = useState("");
//   const [price, setPrice] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newSpace = { name, location, capacity, price };
//     onAddSpace(newSpace); // Pass data to parent
//     setName("");
//     setLocation("");
//     setCapacity("");
//     setPrice("");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white shadow-md rounded">
//       <div>
//         <label className="block text-gray-700">Space Name:</label>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-gray-700">Location:</label>
//         <input
//           type="text"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-gray-700">Capacity:</label>
//         <input
//           type="number"
//           value={capacity}
//           onChange={(e) => setCapacity(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-gray-700">Price ($):</label>
//         <input
//           type="number"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />
//       </div>
//       <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
//         Add Space
//       </button>
//     </form>
//   );
// };

// export default SpaceForm;


import React, { useState } from "react";

const SpaceForm = ({ onAddSpace }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSpace = { name, location, capacity, price };
    onAddSpace(newSpace); // Pass data to parent
    setName("");
    setLocation("");
    setCapacity("");
    setPrice("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Space Name:</label>
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
      <div>
        <label className="block text-gray-700">Price ($):</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Save Venue
      </button>
    </form>
  );
};

export default SpaceForm;
