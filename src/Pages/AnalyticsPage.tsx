import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar,
} from "recharts";
import PageHeader from "../Component/ui/PageHeader";
import { trafficSources, visitData } from "../Data/mockdata";





const AnalyticsPage: React.FC = () => {
  return (
    <div>
      <PageHeader title="Website Analytics" subtitle="Track your site performance" />

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {[
          { label: "Total Visits", value: "84,231", change: "+12.4%" },
          { label: "Unique Users", value: "31,024", change: "+8.1%" },
          { label: "Bounce Rate", value: "38.2%", change: "-2.3%" },
          { label: "Avg Session", value: "4m 12s", change: "+0.5%" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{s.value}</p>
            <p className="text-xs text-emerald-600 mt-0.5">{s.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Line chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-900 text-sm mb-4">Monthly Visits</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
                <Line type="monotone" dataKey="visits" stroke="#1e293b" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar chart */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-900 text-sm mb-4">Traffic Sources</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficSources} layout="vertical" margin={{ top: 0, right: 5, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis dataKey="source" type="category" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="value" fill="#1e293b" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-900 text-sm mb-4">Visitors by Location</h3>
        <div className="relative rounded-xl overflow-hidden" style={{ height: 320 }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Blue_Marble_2002.png/1200px-Blue_Marble_2002.png"
            alt="World map"
            className="w-full h-full object-cover opacity-20"
          />
          {/* Map overlay with dots */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/0 to-slate-50/60" />
          {/* Visitor dots */}
          {[
            { top: "28%", left: "22%", label: "USA", value: "32k" },
            { top: "32%", left: "46%", label: "UK", value: "12k" },
            { top: "35%", left: "52%", label: "EU", value: "18k" },
            { top: "42%", left: "72%", label: "India", value: "24k" },
            { top: "55%", left: "80%", label: "SE Asia", value: "8k" },
          ].map((dot) => (
            <div key={dot.label} className="absolute flex flex-col items-center" style={{ top: dot.top, left: dot.left, transform: "translate(-50%, -50%)" }}>
              <div className="w-3 h-3 bg-gray-900 rounded-full animate-ping opacity-75" />
              <div className="absolute w-3 h-3 bg-gray-900 rounded-full" />
              <div className="mt-1 bg-gray-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap">
                {dot.label}: {dot.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;