import React from "react";
import { Outlet, Link } from "react-router";
import navLinks from "../constants/index";

const MainLayout = () => {
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
          {navLinks.map((nav, index) => (
            <li key={index}>
              <Link
                to={nav.path}
                className="block hover:bg-blue-400 px-3 py-2 rounded cursor-pointer"
              >
                {/* Render icon */}
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
            Welcome, <span className="font-bold">ADMIN</span>
          </div>
          <button className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600">
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
