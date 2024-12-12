import React, { useState, useEffect } from "react";
import axios from "axios";
import Amenities from "./Amenities";

const ManageSpaces = () => {
  const [venue, setVenue] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSpace, setEditingSpace] = useState(null);
  const [modal, setModal] = useState(null);
  //Passing id to isEditMode
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

        // const data = response.data.data;
        // setVenue([...venue, data]);

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
      <div className="w-full mx-auto p-8 rounded-lg ">
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
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Capacity
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Location
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="m-5">
              {venue &&
                venue.map((venue, index) => (
                  <tr
                    key={venue.venueId}
                    onClick={() => handleClick(index)}
                    className="hover:bg-blue-100 border-t"
                  >
                    <td className="px-6 py-4 text-center">{venue.venueName}</td>
                    <td className="px-6 py-4 text-center">{venue.capacity}</td>
                    <td className="px-6 py-4 text-center">{venue.location}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex space-x-2 justify-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(index);
                          }}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(venue.venueId);
                          }}
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

              {/*CREATE/EDIT FORM*/}
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
                <div>
                  <label className="block text-gray-700">Amenities:</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newAmenity}
                      onChange={(e) => setNewAmenity(e.target.value)}
                      className="flex-grow p-2 border rounded"
                      placeholder="Add an amenity"
                    />
                    <button
                      type="button"
                      onClick={handleAddAmenity}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Add
                    </button>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {amenities.map((amenity, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between bg-gray-100 p-2 rounded"
                      >
                        {amenity}
                        <button
                          type="button"
                          onClick={() => handleRemoveAmenity(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save Venue
                </button>
              </form>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageSpaces;
