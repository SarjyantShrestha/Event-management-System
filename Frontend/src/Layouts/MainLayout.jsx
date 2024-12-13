import React, { useState, useEffect, useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../contexts/UserContext";
import navLinks from "../constants/index";

const MainLayout = () => {
  const [userRole, setUserRole] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const { username, logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const path = localStorage.getItem("activeLink");
    if (path) {
      setActiveLink(path);
      navigate(path);
    } else {
      setActiveLink("/");
      navigate("/");
    }
  }, []);

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
  useEffect(() => {
    fetchUserRole();
  }, [navigate]);

  const filteredNavLinks = userRole
    ? navLinks.filter((nav) => nav.roles.includes(userRole))
    : [];

  const handleLinkClick = (path) => {
    setActiveLink(path);
    localStorage.setItem("activeLink", path);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`
          bg-gradient-to-br from-gray-200 to-gray-300
          text-gray-800 
          transition-all 
          duration-300 
          fixed 
          h-screen 
          z-50 
          shadow-lg
          ${isSidebarCollapsed ? "w-20" : "w-64"}
        `}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-300">
          {!isSidebarCollapsed && (
            <h1 className="text-2xl font-bold text-gray-800">EventSpace</h1>
          )}
          <button
            onClick={toggleSidebar}
            className="ml-auto hover:bg-gray-300 p-2 rounded-full transition-all"
          >
            <i
              className={`fas ${isSidebarCollapsed ? "fa-chevron-right" : "fa-chevron-left"} text-gray-700`}
            ></i>
          </button>
        </div>
        <ul className="space-y-2 px-3 mt-4">
          {userRole &&
            filteredNavLinks.map((nav, index) => (
              <li key={index}>
                <Link
                  to={nav.path}
                  onClick={() => handleLinkClick(nav.path)}
                  className={`
                    flex 
                    items-center 
                    hover:bg-gray-300 
                    px-4 
                    py-3 
                    rounded-lg 
                    transition-all 
                    ease-in-out 
                    group
                    ${activeLink === nav.path ? "bg-gray-300 font-semibold" : ""}
                  `}
                  title={nav.name}
                >
                  <i
                    className={`${nav.icon} mr-3 group-hover:scale-110 transition-transform text-gray-700`}
                  ></i>
                  {!isSidebarCollapsed && <span>{nav.name}</span>}
                </Link>
              </li>
            ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div
        className={`
          flex 
          flex-col 
          flex-1 
          transition-all 
          duration-300 
          ${isSidebarCollapsed ? "ml-20" : "ml-64"}
          h-screen 
          overflow-hidden
        `}
      >
        {/* Top Navbar */}
        <div
          className="
            bg-white 
            h-16 
            text-gray-800 
            flex 
            justify-end 
            space-x-10
            items-center 
            px-8 
            shadow-md 
            border-b 
            border-gray-200
            flex-shrink-0
          "
        >
          <div className="flex space-x-2 items-end">
            <i className="fas fa-user text-gray-600 text-xl"></i>
            <div className=" flex justify-center items-center space-x-2">
              <span className="text-sm text-gray-600">Welcome, </span>
              <span className="font-bold text-gray-800">{username}</span>
            </div>
          </div>
          <button
            onClick={logout}
            className="
              bg-red-500 
              hover:bg-red-600 
              px-4 
              py-2 
              rounded-md 
              text-white 
              flex 
              items-center 
              space-x-2 
              transition-all 
              ease-in-out
            "
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            Logout
          </button>
        </div>

        {/* Dynamic Content */}
        <div
          className="
            flex-1 
            overflow-y-auto 
          bg-white
            p-6 
            scrollbar-thin 
            scrollbar-track-gray-200 
            scrollbar-thumb-blue-500
          "
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
