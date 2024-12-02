import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router";
import navLinks from "../constants/index";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

const MainLayout = () => {
  const [userRole, setUserRole] = useState(null);
  // const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = () => {
      const token = localStorage.getItem("authToken");

      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setUserRole(decodedToken.role);
        } catch (error) {
          console.error("Invalid token:", error);
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    fetchUserRole();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  // Filter navLinks based on userRole
  const filteredNavLinks = userRole
    ? navLinks.filter((nav) => nav.roles.includes(userRole))
    : [];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-blue-500 w-60 text-white flex flex-col p-5">
        <div className="flex justify-between items-center mb-10 px-2">
          <h1 className="text-xl font-bold">Event Space</h1>
          <button className="text-lg font-bold hover:text-gray-300">
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
        <ul className="space-y-4">
          {userRole &&
            filteredNavLinks.map((nav, index) => (
              <li key={index}>
                <Link
                  to={nav.path}
                  className="block hover:bg-blue-400 px-3 py-2 rounded cursor-pointer"
                >
                  <i className={`${nav.icon} mr-3`}></i>
                  {nav.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>

      {/* Top bar */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="bg-blue-400 h-16 text-white flex items-center justify-end px-10 space-x-7">
          <div className="text-lg">
            Welcome,
            <span className="font-bold">
              {userRole === "admin" ? "Admin" : "User"}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Dynamic Content */}
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
