import React from "react";
import { CgAdd } from "react-icons/cg";
import { BsCardChecklist, BsBagCheckFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[120px] sm:w-[220px] md:w-[250px] lg:w-[280px] border-r border-gray-200 bg-white shadow-md min-h-screen">
      <div className="flex flex-col items-center sm:items-start gap-2 sm:gap-4 p-2 sm:pt-8 sm:px-4  sm:justify-start">
        {/* Add */}
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 py-2 px-4 rounded-lg w-full transition ${
              isActive
                ? "bg-red-100 text-red-600 font-semibold"
                : "hover:bg-gray-100 text-gray-700"
            }`
          }
        >
          <CgAdd className="text-2xl" />
          <span className="hidden sm:inline">Add</span>
        </NavLink>

        {/* List */}
        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-3 py-2 px-4 rounded-lg w-full transition ${
              isActive
                ? "bg-red-100 text-red-600 font-semibold"
                : "hover:bg-gray-100 text-gray-700"
            }`
          }
        >
          <BsCardChecklist className="text-2xl" />
          <span className="hidden sm:inline">List</span>
        </NavLink>

        {/* Orders */}
        <NavLink
          to="/order"
          className={({ isActive }) =>
            `flex items-center gap-3 py-2 px-4 rounded-lg w-full transition ${
              isActive
                ? "bg-red-100 text-red-600 font-semibold"
                : "hover:bg-gray-100 text-gray-700"
            }`
          }
        >
          <BsBagCheckFill className="text-2xl" />
          <span className="hidden sm:inline">Orders</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
