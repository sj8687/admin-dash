import React, { useEffect, useState } from "react";
import { RiCalendarLine, RiDownloadLine } from "react-icons/ri";
import { statCards } from "../Data/mockdata";
import StatCardComponent from "../Component/dashboards/StatCard";
import ProjectsChart from "../Component/dashboards/ProjectsChart";
import ProfessionalsCard from "../Component/dashboards/ProfessionalsCard";
import RecentProjectsTable from "@/Component/dashboards/OrdersSummary";
import DeliveryPartnerPage from "./KanbanPage";



const ProjectManagementPage: React.FC = () => {

  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "long",
        year: "numeric",
        // hour: "2-digit",
        // minute: "2-digit",
        hour12: true,
      });
      setDateTime(formatted);
    };

    updateDateTime(); // initial call

    // const interval = setInterval(updateDateTime, 60000); // every 1 min

    // return () => clearInterval(interval);
  }, []);



  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

        {/* Left section */}
        <div className="flex flex-col  ">
          <h1 className="text-2xl  font-medium dark:text-white text-gray-900">Dashboard</h1>
          <span className="text-gray-500 dark:text-gray-300 text-sm">
            Welcome back! Here's today's snapshot.
          </span>
        </div>

        {/* Right section */}
        <div className="flex dark:bg-[#1d1d22] items-center gap-3">
          <button className="flex dark:text-gray-300 font-medium items-center gap-2 text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors">
            <RiCalendarLine size={14} />
            <span className="hidden sm:inline">{dateTime}</span>
          </button>
        </div>

      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2  lg:grid-cols-5 gap-4">
        {statCards.map((card) => (
          <StatCardComponent key={card.id} card={card} />
        ))}
      </div>

      {/* Chart + Professionals row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ProjectsChart />
        </div>
        <ProfessionalsCard />
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1">
        {/* <RemindersWidget />
        <AchievementWidget />
        <ProjectEfficiency /> */}
        <RecentProjectsTable />
        {/* <DeliveryPartnerPage /> */}
      </div>
    </div>
  );
};

export default ProjectManagementPage;