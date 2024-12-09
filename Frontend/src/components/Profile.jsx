import React from "react";

const Profile = ({ user }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <h2>User Profile</h2>
      <div style={{ marginBottom: "10px" }}>
        <strong>Name:</strong> {user.name}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <strong>Email:</strong> {user.email}
      </div>
      <div style={{ marginBottom: "10px" }}>
        <strong>Role:</strong> {user.role}
      </div>
      <div>
        <strong>Joined:</strong> {new Date(user.joinedAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default Profile;
