import React, { useState } from "react";
import {
  RiSearchLine, RiNotification3Line, RiSettings4Line, RiMenuLine,
} from "react-icons/ri";
import { useSidebar } from "./SidebarContext";
import { useTheme } from "./darkmode";

const Topbar: React.FC = () => {
  const { toggleCollapsed } = useSidebar();
  const { theme, toggleTheme } = useTheme()


  return (
    <header className="h-[60px] dark:bg-[#09090b] bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleCollapsed}
          className="p-2 rounded-md hover:bg-gray-100 text-gray-500 md:hidden"
        >
          <RiMenuLine size={18} />
        </button>

        {/* Search */}
        <div className="hidden dark:bg-[#1a1a1d] sm:flex items-center gap-2 bg-gray-50 border border-gray-600 rounded-lg px-3 py-2 min-w-[200px] md:min-w-[320px]">
          <RiSearchLine size={15} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by user id and User name..."
            className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none w-full"
          />
          {/* <span className="text-[11px] text-gray-300 border border-gray-200 rounded px-1 py-0.5 hidden md:block">⌘K</span> */}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Mobile search */}
        <button
          onClick={toggleTheme}
          className={`w-10 h-5 flex items-center rounded-full p-0.5 border transition
    ${theme === "dark"
              ? "bg-[#09090b] border-white"
              : "bg-gray-300 border-gray-400"
            }`}
        >
          <div
            className={`w-3.5 h-4 rounded-full shadow transform transition
      ${theme === "dark"
                ? "translate-x-5 bg-white"
                : "translate-x-0 bg-white"
              }`}
          />
        </button>

        {/* Notifications */}
        <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-white relative transition-colors">
          <RiNotification3Line size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>
        {/* Settings */}
        <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-white transition-colors">
          <RiSettings4Line size={18} />
        </button>

        {/* Avatar */}
        <button className="flex items-center gap-2 ml-1">
          <img
            src="https://i.pravatar.cc/32?img=8"
            alt="User"
            className="w-8 h-8 rounded-full object-cover border-2 dark:border-gray-500 border-gray-100"
          />
        </button>
      </div>
    </header>
  );
};

export default Topbar;