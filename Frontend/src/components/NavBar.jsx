import React from "react";
import navLinks from "../constants/index";

const NavBar = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-blue-500 w-80 text-white flex flex-col p-5">
        <div className="flex justify-between items-center mb-10 px-2">
          <h1 className="text-xl font-bold">Event Management</h1>
          <button>X</button>
        </div>
        <ul className="space-y-4">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className="hover:bg-blue-400 px-3 py-2 rounded cursor-pointer"
            >
              {nav.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Top bar */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="bg-blue-400 h-16 text-white flex items-center justify-end px-10 space-x-7">
          <div className="text-lg">
            Welcome, <span className="font-bold">ADMIN</span>
          </div>
          <button className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600">
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="p-5">
          <h1 className="text-2xl font-bold">Events Calendar</h1>
          {/* Your calendar or other components can be placed here */}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
