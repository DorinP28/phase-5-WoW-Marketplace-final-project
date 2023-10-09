import React, { useState, useContext } from "react";
import UserContext from "./UserContext";

function UserProfile() {
  const { user, setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    username: user?.username || "",
    email: user?.email || "",
    contact_details: user?.contact_details || "",
  });

  if (!user) return <p>Please log in to view your profile.</p>;

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      // Check if user.id exists
      if (!user.id) {
        console.error("No user ID found.");
        return;
      }

      const response = await fetch(`/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(editedUser),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setIsEditing(false);
      } else {
        console.error("Update failed with status:", response.status);
      }
    } catch (error) {
      console.error("API Call Error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ borderBottom: "2px solid #ccc", paddingBottom: "10px" }}>User Profile</h1>

      {isEditing ? (
        <div>
          <input
            style={{ padding: "8px", marginBottom: "10px", width: "100%", border: "1px solid #ccc", borderRadius: "5px" }}
            name="username"
            placeholder="Username"
            value={editedUser.username}
            onChange={handleInputChange}
          />
          <input
            style={{ padding: "8px", marginBottom: "10px", width: "100%", border: "1px solid #ccc", borderRadius: "5px" }}
            name="email"
            placeholder="Email"
            value={editedUser.email}
            onChange={handleInputChange}
          />
          <input
            style={{ padding: "8px", marginBottom: "10px", width: "100%", border: "1px solid #ccc", borderRadius: "5px" }}
            name="contact_details"
            placeholder="Contact Details"
            value={editedUser.contact_details}
            onChange={handleInputChange}
          />
          <button onClick={handleUpdate} style={{ padding: "8px 16px", backgroundColor: "#007bff", color: "white", borderRadius: "5px", cursor: "pointer" }}>
            Save Changes
          </button>
        </div>
      ) : (
        <div>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Contact Details:</strong> {user.contact_details}
          </p>
        </div>
      )}

      <button
        onClick={handleEditToggle}
        style={{
          marginTop: "20px",
          padding: "8px 16px",
          backgroundColor: isEditing ? "#dc3545" : "#28a745",
          color: "white",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {isEditing ? "Cancel" : "Edit Profile"}
      </button>
    </div>
  );
}

export default UserProfile;
