"use client";

import { useState } from "react";
import { Trash2, Pencil, MapPin, Star, Search, FileDown, Download } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type DriverStatus = "On Route" | "Completed" | "Canceled";

interface Driver {
  id: string;
  name: string;
  photo: string;
  status: DriverStatus;
  driverId: string;
  phone: string;
  vehicle: string;
  rating: number;
  trips: number;
  earnings: string;
  location: string;
}

// ─── Dummy Data ───────────────────────────────────────────────────────────────

const DRIVERS: Driver[] = [
  { id: "1", name: "Suresh Kumar", photo: "https://api.dicebear.com/7.x/personas/svg?seed=Suresh", status: "On Route", driverId: "DRV-001", phone: "+91 23456 78923", vehicle: "Tata Ace - MH 01 SB 3645", rating: 4.8, trips: 1240, earnings: "82K", location: "Andheri, Mumbai" },
  { id: "2", name: "Ravi Sharma", photo: "https://api.dicebear.com/7.x/personas/svg?seed=Ravi", status: "Completed", driverId: "DRV-002", phone: "+91 23456 78924", vehicle: "Tata Ace - MH 02 AB 1234", rating: 4.6, trips: 980, earnings: "68K", location: "Bandra, Mumbai" },
  { id: "3", name: "Amit Patil", photo: "https://api.dicebear.com/7.x/personas/svg?seed=Amit", status: "Canceled", driverId: "DRV-003", phone: "+91 23456 78925", vehicle: "Mahindra - MH 03 CD 5678", rating: 4.3, trips: 760, earnings: "54K", location: "Dadar, Mumbai" },
  { id: "4", name: "Vijay Nair", photo: "https://api.dicebear.com/7.x/personas/svg?seed=Vijay", status: "Completed", driverId: "DRV-004", phone: "+91 23456 78926", vehicle: "Tata Ace - MH 04 EF 9012", rating: 4.9, trips: 1560, earnings: "95K", location: "Powai, Mumbai" },
  { id: "5", name: "Deepak Singh", photo: "https://api.dicebear.com/7.x/personas/svg?seed=Deepak", status: "Canceled", driverId: "DRV-005", phone: "+91 23456 78927", vehicle: "Ashok Leyland - MH 05 GH", rating: 4.1, trips: 430, earnings: "31K", location: "Kurla, Mumbai" },
  { id: "6", name: "Manoj Desai", photo: "https://api.dicebear.com/7.x/personas/svg?seed=Manoj", status: "Completed", driverId: "DRV-006", phone: "+91 23456 78928", vehicle: "Tata Ace - MH 06 IJ 3456", rating: 4.7, trips: 1120, earnings: "79K", location: "Thane, Mumbai" },
  { id: "7", name: "Rahul Verma", photo: "https://api.dicebear.com/7.x/personas/svg?seed=Rahul", status: "Completed", driverId: "DRV-007", phone: "+91 23456 78929", vehicle: "Maruti - MH 07 KL 7890", rating: 4.5, trips: 890, earnings: "62K", location: "Borivali, Mumbai" },
  { id: "8", name: "Sanjay Joshi", photo: "https://api.dicebear.com/7.x/personas/svg?seed=Sanjay", status: "Canceled", driverId: "DRV-008", phone: "+91 23456 78930", vehicle: "Tata Ace - MH 08 MN 2345", rating: 3.9, trips: 320, earnings: "23K", location: "Malad, Mumbai" },
  { id: "9", name: "Kiran Rao", photo: "https://api.dicebear.com/7.x/personas/svg?seed=Kiran", status: "Completed", driverId: "DRV-009", phone: "+91 23456 78931", vehicle: "Mahindra - MH 09 OP 6789", rating: 4.8, trips: 1380, earnings: "88K", location: "Goregaon, Mumbai" },
];

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: DriverStatus }) {
  const cfg: Record<DriverStatus, string> = {
    "On Route": "bg-green-500 text-white",
    "Completed": "bg-green-500 text-white",
    "Canceled": "bg-red-500   text-white",
  };
  return (
    <span className={`px-3 py-1 rounded-md text-xs font-semibold ${cfg[status]}`}>
      {status}
    </span>
  );
}

// ─── Driver Card ──────────────────────────────────────────────────────────────

function DriverCard({ driver, onDelete }: { driver: Driver; onDelete: (id: string) => void }) {
  return (
    <div className="relative rounded-2xl border p-4 flex flex-col gap-3
                    bg-white border-gray-200 shadow-sm
                    dark:bg-[#141414] dark:border-[#242424]
                    hover:shadow-md transition-shadow duration-200">

      {/* Delete btn */}
      <button
        onClick={() => onDelete(driver.id)}
        className="absolute top-3 right-3 p-1.5 rounded-lg transition-colors
                   text-gray-400 hover:text-red-500 hover:bg-red-50
                   dark:text-zinc-600 dark:hover:text-red-400 dark:hover:bg-red-950/30"
      >
        <Trash2 size={14} />
      </button>

      {/* Avatar + name + status */}
      <div className="flex items-center gap-3">
        <img
          src={driver.photo}
          alt={driver.name}
          className="w-14 h-14 rounded-full object-cover border-2 border-gray-100 dark:border-zinc-700 shrink-0"
          onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/thumbs/svg?seed=${driver.id}`; }}
        />
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-sm text-gray-900 dark:text-zinc-100 leading-tight">{driver.name}</span>
          <StatusBadge status={driver.status} />
        </div>
      </div>

      {/* ID + phone */}
      <p className="text-xs text-gray-500 dark:text-zinc-500 font-mono">
        {driver.driverId} · {driver.phone}
      </p>

      {/* Vehicle */}
      <div className="px-3 py-2 rounded-lg text-xs text-gray-600 dark:text-zinc-400
                      bg-gray-100 dark:bg-[#1e1e1e]">
        {driver.vehicle}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="flex items-center justify-center gap-1">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-bold text-gray-900 dark:text-zinc-100">{driver.rating}</span>
          </div>
          <p className="text-[10px] text-gray-400 dark:text-zinc-600 uppercase tracking-wide mt-0.5">Rating</p>
        </div>
        <div>
          <span className="text-sm font-bold text-gray-900 dark:text-zinc-100">{driver.trips.toLocaleString()}</span>
          <p className="text-[10px] text-gray-400 dark:text-zinc-600 uppercase tracking-wide mt-0.5">Trips</p>
        </div>
        <div>
          <span className="text-sm font-bold text-gray-900 dark:text-zinc-100">₹{driver.earnings}</span>
          <p className="text-[10px] text-gray-400 dark:text-zinc-600 uppercase tracking-wide mt-0.5">Earnings</p>
        </div>
      </div>

      {/* Location + edit */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-zinc-500">
          <MapPin size={12} className="text-red-400 shrink-0" />
          {driver.location}
        </div>
        <button className="p-1.5 rounded-lg transition-colors
                           text-gray-400 hover:text-gray-700 hover:bg-gray-100
                           dark:text-zinc-600 dark:hover:text-zinc-300 dark:hover:bg-zinc-800">
          <Pencil size={13} />
        </button>
      </div>
    </div>
  );
}

// ─── Mini Line Chart (SVG) ────────────────────────────────────────────────────

function ShipmentChart() {
  const data = [0, 8, 18, 35, 28, 55, 72, 85, 95, 100];
  const w = 320, h = 100;
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - (v / 100) * h,
  }));
  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaPath = `${linePath} L${w},${h} L0,${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-20" preserveAspectRatio="none">
      <defs>
        <linearGradient id="shipGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#84cc16" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#84cc16" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#shipGrad)" />
      <path d={linePath} fill="none" stroke="#84cc16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="#84cc16" />
      ))}
    </svg>
  );
}

// ─── Donut / Pie Chart (SVG) ──────────────────────────────────────────────────

function DelayPieChart() {
  const slices = [
    { label: "Misrouted Shipment", value: 40, color: "#4d7c0f" },
    { label: "Vehicle Breakdown", value: 40, color: "#84cc16" },
    { label: "Accident/Collision", value: 12, color: "#a3e635" },
    { label: "Other", value: 8, color: "#bef264" },
  ];
  const total = slices.reduce((s, d) => s + d.value, 0);
  const cx = 90, cy = 90, r = 75;
  let angle = -90;

  const paths = slices.map((s) => {
    const sweep = (s.value / total) * 360;
    const start = (angle * Math.PI) / 180;
    angle += sweep;
    const end = (angle * Math.PI) / 180;
    const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end), y2 = cy + r * Math.sin(end);
    const large = sweep > 180 ? 1 : 0;
    return { ...s, d: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z` };
  });

  return (
    <div className="flex flex-col gap-3">
      <svg viewBox="0 0 180 180" className="w-44 h-44 mx-auto">
        {paths.map((p, i) => (
          <path key={i} d={p.d} fill={p.color} stroke="white" strokeWidth="1.5" className="dark:[stroke:#0f0f0f]" />
        ))}
        {/* 16 Delays label */}
        <text x="130" y="78" fontSize="9" fill="#374151" fontWeight="600" className="dark:fill-zinc-300">16 Delays</text>
      </svg>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
        {slices.map((s) => (
          <div key={s.label} className="flex items-start gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm mt-0.5 shrink-0" style={{ background: s.color }} />
            <span className="text-[10px] text-gray-600 dark:text-zinc-400 leading-tight">
              {s.label}: <strong>{s.value}</strong>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function DriverSidebar() {
  return (
    <div className="flex flex-col gap-4 w-full">

      {/* Shipment Statistics */}
      <div className="rounded-2xl border p-4 bg-white border-gray-200 dark:bg-[#141414] dark:border-[#242424]">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100">Shipment Statistics</h3>
          <span className="text-[10px] text-gray-400 dark:text-zinc-600 border border-gray-200 dark:border-zinc-700 px-2 py-0.5 rounded-md">
            This Weekly
          </span>
        </div>
        <div className="mb-2">
          <span className="text-2xl font-bold text-gray-900 dark:text-zinc-100">980</span>
          <span className="text-xs text-gray-400 dark:text-zinc-500 ml-2">Completed Deliveries</span>
        </div>
        <ShipmentChart />
        <div className="flex justify-between text-[9px] text-gray-400 dark:text-zinc-600 mt-1 px-1">
          {["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"].map((y) => (
            <span key={y}>{y}</span>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="rounded-2xl border p-4 bg-white border-gray-200 dark:bg-[#141414] dark:border-[#242424]">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 mb-3">Performance Metrics</h3>
        <p className="text-xs text-gray-500 dark:text-zinc-500 mb-2">On-Time Delivery Rate:</p>
        <div className="w-full h-3 rounded-full bg-gray-100 dark:bg-zinc-800 overflow-hidden mb-2">
          <div className="h-full rounded-full bg-green-500" style={{ width: "93%" }} />
        </div>
        <p className="text-sm text-gray-700 dark:text-zinc-300">
          <span className="font-bold">912</span>
          <span className="text-gray-400 dark:text-zinc-600"> / 980 Deliveries</span>
        </p>
      </div>

      {/* Delay Reasons */}
      <div className="rounded-2xl border p-4 bg-white border-gray-200 dark:bg-[#141414] dark:border-[#242424]">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 mb-1">Delay Reasons Breakdown</h3>
        <p className="text-xs text-gray-400 dark:text-zinc-600 mb-3">Delay Cases</p>
        <DelayPieChart />
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DeliveryPartnerPage() {
  const [drivers, setDrivers] = useState<Driver[]>(DRIVERS);
  const [search, setSearch] = useState("");

  const handleDelete = (id: string) => {
    setDrivers((prev) => prev.filter((d) => d.id !== id));
  };

  // Live search — filters by name, driverId, vehicle, location, phone
  const filtered = drivers.filter((d) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      d.name.toLowerCase().includes(q) ||
      d.driverId.toLowerCase().includes(q) ||
      d.vehicle.toLowerCase().includes(q) ||
      d.location.toLowerCase().includes(q) ||
      d.phone.includes(q)
    );
  });

  // Export to Excel (.xlsx-compatible CSV that Excel opens natively)
  const handleExport = () => {
    const headers = ["#", "Driver ID", "Name", "Status", "Phone", "Vehicle", "Rating", "Trips", "Earnings", "Location"];
    const rows = drivers.map((d, i) => [
      i + 1,
      d.driverId,
      d.name,
      d.status,
      d.phone,
      d.vehicle,
      d.rating,
      d.trips,
      `₹${d.earnings}`,
      d.location,
    ]);

    // Build CSV with BOM so Excel shows ₹ correctly
    const bom = "\uFEFF";
    const csv = bom + [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "application/vnd.ms-excel;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "delivery_partners.xls";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full" >

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Delivery Partner</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">List of all driver partners</p>
        </div>

        {/* Search + Export */}
        <div className="flex items-center gap-2.5">
          {/* Search bar */}
          <div className="relative ">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-600 pointer-events-none" />
            <input
              type="text"
              placeholder="Search drivers…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[300px] pl-8 pr-4 py-2.5 rounded-[9px] text-xs outline-none
                         bg-white border border-gray-400 text-gray-800 placeholder-gray-400
                         focus:ring-1 focus:ring-gray-300
                         dark:bg-[#181818] dark:border-[#9b8b8b] dark:text-zinc-100
                         dark:placeholder-zinc-600 dark:focus:ring-zinc-700"
            />
          </div>

          {/* Export button */}
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold
                       border transition-all duration-150 hover:scale-105 active:scale-95 whitespace-nowrap
                       bg-white border-gray-300 text-gray-700 hover:bg-gray-50
                       dark:bg-[#181818] dark:border-[#9e8f8f] dark:text-zinc-300 dark:hover:bg-[#222]"
          >
            <Download size={14} />  Export
          </button>
        </div>
      </div>

      {/* ── Layout: cards + sidebar ── */}
      <div className="flex gap-5 items-start">

        {/* Driver cards grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="flex items-center justify-center h-48 rounded-2xl border border-dashed
                            border-gray-200 dark:border-zinc-800 text-gray-400 dark:text-zinc-600 text-sm">
              No drivers found{search ? ` for "${search}"` : ""}.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((driver) => (
                <DriverCard key={driver.id} driver={driver} onDelete={handleDelete} />
              ))}
            </div>
          )}
          {/* Result count */}
          {search && (
            <p className="mt-3 text-xs text-gray-400 dark:text-zinc-600">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{search}&rdquo;
            </p>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-72 shrink-0 hidden lg:block">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 mb-3">Driver Details</h2>
          <DriverSidebar />
        </div>
      </div>
    </div>
  );
}