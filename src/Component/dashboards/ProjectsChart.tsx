import React from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import { chartData } from "../../Data/mockdata";

const ProjectsChart: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 col-span-1 lg:col-span-2">
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">Dash Overview</h3>
          <p className="text-xs text-gray-400 mt-0.5">Showing total visitors for the last 3 months</p>
        </div>
        <select className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 outline-none">
          <option>Last 3 months</option>
          <option>Last 6 months</option>
          <option>Last year</option>
        </select>
      </div>

      <div className="h-[220px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#90EE90" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#90EE90" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#90EE90" stopOpacity={0.2} />
                <stop offset="95%" stopColor="##90EE90" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 12 }}
              itemStyle={{ color: "#374151" }}
            />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
            <Area type="monotone" dataKey="mobile" stroke="#6366f1" strokeWidth={2} fill="url(#colorMobile)" dot={false} activeDot={{ r: 4 }} />
            {/* <Area type="monotone" dataKey="desktop" stroke="#94a3b8" strokeWidth={2} fill="url(#colorDesktop)" dot={false} activeDot={{ r: 4 }} /> */}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProjectsChart;