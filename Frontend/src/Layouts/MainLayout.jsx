import React, { useState, useEffect, useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router";
import navLinks from "../constants/index";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../contexts/UserContext";

const MainLayout = () => {
  const [userRole, setUserRole] = useState(null);
  const { username, logout } = useContext(UserContext);
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
  }, [userRole]);

  const filteredNavLinks = userRole
    ? navLinks.filter((nav) => nav.roles.includes(userRole))
    : [];
  const [activeLink, setActiveLink] = useState(null);

  // Handle link click
  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="bg-blue-800 w-60 text-white flex flex-col p-6 fixed h-screen">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-2xl font-bold text-white">EventSpace</h1>
          <button className="text-xl font-bold hover:text-gray-300">
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
        <ul className="space-y-6">
          {userRole &&
            filteredNavLinks.map((nav, index) => (
              <li key={index}>
                <Link
                  to={nav.path}
                  onClick={() => handleLinkClick(nav.path)}
                  className={`block hover:bg-blue-600 px-4 py-3 rounded-lg transition-all ease-in-out ${
                    activeLink === nav.path ? "bg-blue-600" : ""
                  }`}
                >
                  <i className={`${nav.icon} mr-3`}></i>
                  {nav.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-60">
        {/* Top Navbar */}
        <div className="bg-blue-600 h-16 text-white flex justify-between items-center px-8 shadow-lg">
          <div className="text-xl font-semibold">
            <span>Welcome, </span>
            <span className="font-bold">{username}</span>
          </div>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-md text-white transition-all ease-in-out"
          >
            Logout
          </button>
        </div>

        {/* Dynamic Content */}
        <div className="bg-white p-6 overflow-y-auto h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
