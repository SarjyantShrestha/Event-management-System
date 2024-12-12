import React, { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Fetch user profile from the backend
        const response = await fetch("http://localhost:5000/api/users/profile/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Retrieve the token from local storage after login
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

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
  }, []); // Empty dependency array means this effect runs once on component mount

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-8">
        Loading user profile...
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error: {error}
      </div>
    );
  }

  // If no user data is found
  if (!user) {
    return (
      <div className="text-center py-8">
        No user profile found
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          User Profile
        </h2>
        
        <div className="space-y-4">
          <div className="border-b pb-2">
            <strong className="text-gray-600">Name:</strong>
            <p className="text-gray-900">{<>{user.firstName} {user.lastName}</> }</p>
          </div>
          
          <div className="border-b pb-2">
            <strong className="text-gray-600">Email:</strong>
            <p className="text-gray-900">{user.email}</p>
          </div>
          
          <div className="border-b pb-2">
            <strong className="text-gray-600">Role:</strong>
            <p className="text-gray-900">{user.role}</p>
          </div>
          
          {user.createdAt && (
            <div>
              <strong className="text-gray-600">Joined:</strong>
              <p className="text-gray-900">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Profile;