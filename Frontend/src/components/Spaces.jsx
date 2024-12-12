import React, { useState, useEffect } from "react";
import axios from "axios";
import Amenities from "./Amenities";

const ManageSpaces = () => {
  const [venue, setVenue] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSpace, setEditingSpace] = useState(null);
  const [modal, setModal] = useState(null);
  const [venueEditId, setVenueEditId] = useState(null);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [newAmenity, setNewAmenity] = useState("");

  const handleAddAmenity = () => {
    if (newAmenity.trim() !== "") {
      setAmenities([...amenities, newAmenity.trim()]);
      setNewAmenity("");
    }
  };

  const handleRemoveAmenity = (index) => {
    setAmenities(amenities.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (venueEditId === null) {
        const response = await axios.post(
          "http://localhost:5000/api/venues/",
          { name, location, capacity, amenities },
          {
            headers: { "Content-Type": "application/json" },
          },
        );

        const data = response.data.data;
        setVenue([...venue, data]);

        if (response.status === 200) {
          alert("Venue added successfully.");
        } else {
          alert(data.message || "Venue failed to add.");
        }
      } else {
        console.log("editmode ");
        const response = await axios.put(
          `http://localhost:5000/api/venues/${venueEditId}`,
          { name, location, capacity, amenities },
          {
            headers: { "Content-Type": "application/json" },
          },
        );

        setVenueEditId(null);

        if (response.status === 200) {
          fetchVenue();
          alert("Venue updated successfully.");
        } else {
          alert(data.message || "venue update failed");
        }
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  const onClose = () => {
    setModal(null);
    setName("");
    setLocation("");
    setCapacity("");
    setAmenities([]);
    setNewAmenity("");
    setEditingSpace(null);
    setIsModalOpen(false);
  };

  const handleEdit = async (index) => {
    const currentVenue = venue[index];
    setName(currentVenue.venueName);
    setLocation(currentVenue.location);
    setCapacity(currentVenue.capacity);
    setAmenities(currentVenue.amenities);
    setEditingSpace({ ...currentVenue, index });
    setIsModalOpen(true);
    setVenueEditId(venue[index].venueId);
  };

  const handleClick = (index) => {
    setModal(venue[index]);
  };

  const handleDelete = async (venueId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/venues/${venueId}`,
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
    <>
      {modal !== null && <Amenities modal={modal} onClose={onClose} />}
      <div className="bg-white shadow-lg rounded-lg p-8">
        {/* Add Venue Button */}
        <div className="text-right mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="
              px-6 
              py-2 
              rounded-full 
              bg-gray-800 
              text-white 
              hover:bg-gray-700 
              transition-colors 
              duration-300
            "
          >
            Add Venue
          </button>
        </div>

        {/* Venue Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {["Name", "Capacity", "Location", "Actions"].map((header) => (
                  <th
                    key={header}
                    className="
                      px-6 
                      py-3 
                      text-center 
                      text-xs 
                      font-medium 
                      text-gray-500 
                      uppercase 
                      tracking-wider
                    "
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {venue &&
                venue.map((venue, index) => (
                  <tr
                    key={venue.venueId}
                    onClick={() => handleClick(index)}
                    className="
                    hover:bg-gray-50 
                    transition-colors 
                    duration-200 
                    cursor-pointer
                  "
                  >
                    <td className="px-6 py-4 text-center text-sm text-gray-900">
                      {venue.venueName}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">
                      {venue.capacity}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">
                      {venue.location}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex space-x-2 justify-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(index);
                          }}
                          className="
                          px-3 
                          py-1 
                          rounded 
                          text-green-600 
                          hover:bg-green-100 
                          transition-colors 
                          duration-300
                        "
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(venue.venueId);
                          }}
                          className="
                          px-3 
                          py-1 
                          rounded 
                          text-red-600 
                          hover:bg-red-100 
                          transition-colors 
                          duration-300
                        "
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
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {editingSpace ? "Edit Venue" : "Add New Venue"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Venue Name:
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="
                      w-full 
                      p-2 
                      border 
                      border-gray-300 
                      rounded-md 
                      focus:outline-none 
                      focus:ring-2 
                      focus:ring-gray-500
                    "
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Location:</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="
                      w-full 
                      p-2 
                      border 
                      border-gray-300 
                      rounded-md 
                      focus:outline-none 
                      focus:ring-2 
                      focus:ring-gray-500
                    "
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Capacity:</label>
                  <input
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="
                      w-full 
                      p-2 
                      border 
                      border-gray-300 
                      rounded-md 
                      focus:outline-none 
                      focus:ring-2 
                      focus:ring-gray-500
                    "
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Amenities:</label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={newAmenity}
                      onChange={(e) => setNewAmenity(e.target.value)}
                      className="
                        flex-grow 
                        p-2 
                        border 
                        border-gray-300 
                        rounded-md 
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-gray-500
                      "
                      placeholder="Add an amenity"
                    />
                    <button
                      type="button"
                      onClick={handleAddAmenity}
                      className="
                        px-4 
                        py-2 
                        bg-gray-800 
                        text-white 
                        rounded-md 
                        hover:bg-gray-700 
                        transition-colors 
                        duration-300
                      "
                    >
                      Add
                    </button>
                  </div>
                  <ul className="space-y-2">
                    {amenities.map((amenity, index) => (
                      <li
                        key={index}
                        className="
                          flex 
                          items-center 
                          justify-between 
                          bg-gray-100 
                          p-2 
                          rounded-md
                        "
                      >
                        <span className="text-gray-800">{amenity}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveAmenity(index)}
                          className="
                            text-red-600 
                            hover:text-red-800 
                            transition-colors 
                            duration-300
                          "
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="
                      flex-grow 
                      px-4 
                      py-2 
                      bg-green-600 
                      text-white 
                      rounded-md 
                      hover:bg-green-700 
                      transition-colors 
                      duration-300
                    "
                  >
                    Save Venue
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="
                      flex-grow 
                      px-4 
                      py-2 
                      bg-gray-200 
                      text-gray-800 
                      rounded-md 
                      hover:bg-gray-300 
                      transition-colors 
                      duration-300
                    "
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageSpaces;
