import React, { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/profile/me",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const userData = await response.json();
        setUser(userData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-gray-600 flex items-center space-x-3">
          <i className="fas fa-spinner animate-spin text-2xl"></i>
          <span>Loading user profile...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
        <i className="fas fa-exclamation-circle mr-2"></i>
        Error: {error}
      </div>
    );
  }

  // If no user data is found
  if (!user) {
    return (
      <div className="bg-gray-100 border border-gray-200 text-gray-700 px-4 py-3 rounded-lg text-center">
        <i className="fas fa-user-slash mr-2"></i>
        No user profile found
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <i className="fas fa-user-circle mr-3 text-gray-600"></i>
          User Profile
        </h2>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
              <i className="fas fa-id-card mr-2 text-gray-500"></i>
              Personal Details
            </h3>
            <div className="space-y-2">
              <div>
                <span className="text-gray-600 font-medium">Name:</span>
                <p className="text-gray-900 font-medium">
                  {user.firstName} {user.lastName}
                </p>
              </div>
              <div>
                <span className="text-gray-600 font-medium">Email:</span>
                <p className="text-gray-900 font-medium">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
              <i className="fas fa-user-tag mr-2 text-gray-500"></i>
              Account Information
            </h3>
            <div className="space-y-2">
              <div className="flex space-x-2 items-center">
                <span className="text-gray-600 font-medium ">Role:</span>
                <p
                  className={`text-gray-900 capitalize px-2 py-1 rounded border ${
                    user.role === "user"
                      ? "bg-yellow-100 text-yellow-600 border-yellow-100"
                      : "bg-red-100 text-red-600 border-red-100"
                  }`}
                >
                  {user.role}
                </p>
              </div>
              {user.createdAt && (
                <div>
                  <span className="text-gray-600 font-medium">Joined:</span>
                  <p className="text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Optional: Additional Actions
        <div className="flex justify-end space-x-3 mt-6 border-t pt-4">
          <button
            className="
              bg-blue-500 
              hover:bg-blue-600 
              text-white 
              px-4 
              py-2 
              rounded-md 
              transition-all 
              flex 
              items-center 
              space-x-2
            "
          >
            <i className="fas fa-edit mr-2"></i>
            Edit Profile
          </button>
          </div>
         */}
      </div>
    </div>
  );
};

export default Profile;

