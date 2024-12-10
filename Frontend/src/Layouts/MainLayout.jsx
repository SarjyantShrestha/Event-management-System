import React, { useState, useEffect, useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router";
import navLinks from "../constants/index";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../contexts/UserContext";

const MainLayout = () => {
  const [userRole, setUserRole] = useState(null);
  const { username, logout } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false); // For mobile sidebar
  const [isCollapsed, setIsCollapsed] = useState(false); // For desktop sidebar
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
  }, [navigate]);

  // Filter navLinks based on userRole
  const filteredNavLinks = userRole
    ? navLinks.filter((nav) => nav.roles.includes(userRole))
    : [];

  // Toggle functions
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobileSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 flex md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={toggleMobileSidebar}
        ></div>
        <div className="relative flex w-64 flex-col bg-blue-500 text-white">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-bold">Event Space</h1>
            <button onClick={toggleMobileSidebar}>
              <i className="fa-solid fa-times"></i>
            </button>
          </div>
          <ul className="space-y-4 p-4">
            {filteredNavLinks.map((nav, index) => (
              <li key={index}>
                <Link
                  to={nav.path}
                  className="block px-3 py-2 rounded hover:bg-blue-400"
                  onClick={toggleMobileSidebar}
                >
                  <i className={`${nav.icon} mr-3`}></i>
                  {nav.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex md:flex-col md:fixed md:inset-y-0 ${
          isCollapsed ? "md:w-20" : "md:w-64"
        } bg-blue-500 text-white transition-width duration-300`}
      >
        <div className="flex items-center justify-between p-4">
          {!isCollapsed && <h1 className="text-xl font-bold">Event Space</h1>}
          <button onClick={toggleSidebar}>
            <i
              className={`fa-solid ${
                isCollapsed ? "fa-chevron-right" : "fa-chevron-left"
              }`}
            ></i>
          </button>
        </div>
        <ul className="space-y-4 p-4">
          {filteredNavLinks.map((nav, index) => (
            <li key={index}>
              <Link
                to={nav.path}
                className="flex items-center px-3 py-2 rounded hover:bg-blue-400"
              >
                <i className={`${nav.icon} mr-3`}></i>
                {!isCollapsed && <span>{nav.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-margin duration-300 ${
          isCollapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        {/* Top Navbar */}
        <div className="flex items-center justify-between bg-blue-400 h-16 text-white px-4 md:px-10 relative">
          <button className="md:hidden" onClick={toggleMobileSidebar}>
            <i className="fa-solid fa-bars"></i>
          </button>

          <div className="absolute right-0 flex items-center space-x-7 mr-4">
            <div className="text-lg">
              <span>Welcome, </span>
              <span className="font-bold">{username}</span>
            </div>
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
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
