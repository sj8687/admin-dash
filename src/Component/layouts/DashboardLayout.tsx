import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarContext, useSidebarState } from "./SidebarContext";
import Sidebar from "../dashboards/Sidebar";
import Topbar from "./Topbar";
import {ThemeContext, useThemeState } from "./darkmode";


const DashboardLayout: React.FC = () => {
  const sidebarState = useSidebarState();
  const themeState = useThemeState();

  return (
        <ThemeContext.Provider value={themeState}>

    <SidebarContext.Provider value={sidebarState}>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Mobile overlay */}
        {!sidebarState.collapsed && (
          <div
            className="fixed inset-0 bg-black/20 z-30 md:hidden"
            onClick={sidebarState.toggleCollapsed}
          />
        )}

        {/* Main content */}
        <div
          className={`
            flex-1 flex flex-col overflow-hidden transition-all duration-300
            ${sidebarState.collapsed ? "ml-[64px]" : "ml-[220px]"}
          `}
        >
          <Topbar />
          <main className="flex-1 dark:bg-[#0f0f12]  overflow-y-auto p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
        </ThemeContext.Provider>

  );
};

export default DashboardLayout;