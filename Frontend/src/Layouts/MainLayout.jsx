import React, { useState, useEffect, useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router";
import navLinks from "../constants/index";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../contexts/UserContext";

const MainLayout = () => {
  const [userRole, setUserRole] = useState(null);
  const { username } = useContext(UserContext);
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

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  // Filter navLinks based on userRole
  const filteredNavLinks = userRole
    ? navLinks.filter((nav) => nav.roles.includes(userRole))
    : [];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="bg-blue-500 w-60 text-white flex flex-col p-5 fixed h-screen">
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

      <div className="flex-1 flex flex-col ml-60">
        {/* Top Navbar */}
        <div className="bg-blue-400 h-16 text-white flex items-center justify-end px-10  relative w-full z-10">
          <div className="absolute flex flex-row items-center space-x-7">
            <div className="text-lg">
              <span>Welcome, </span>
              <span className="font-bold">{username}</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="pt-5 px-5 overflow-y-auto h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
