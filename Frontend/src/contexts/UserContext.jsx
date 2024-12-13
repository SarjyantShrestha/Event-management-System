import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [userrole, setUserrole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username);
        setUserrole(decodedToken.role);
        // setLoading(false);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("authToken"); // Clear invalid token
      }
    }
  }, []);

  const logout = () => {
    // Clear all user data on logout
    setUsername(null);
    setUserrole(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("activeLink");
  };

  return (
    <UserContext.Provider
      value={{ username, setUsername, userrole, setUserrole, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
