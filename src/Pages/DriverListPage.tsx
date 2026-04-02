"use client";

import { useState, useEffect, useMemo, use } from "react";
import { Trash2, MapPin, Star, Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Download } from "lucide-react";
import { Driver, DriverStatus, StatCard } from "@/Types/types";
import { DRIVERS, DriverstatCards } from "@/Data/mockdata";
import StatCardComponent from "@/Component/dashboards/StatCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import { fetchDriverStatsRequest } from "@/Redux/PostSlice";
import SkeletonCard from "@/Component/ui/StatsSkelton";





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

  const [blocked, setBlocked] = useState(false);

  return (
    <div className="relative rounded-[10px] border p-4 flex flex-col gap-3
                    bg-white border-gray-200 shadow-sm
                    dark:bg-[#141414] dark:border-gray-600
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

        <div className="flex items-center gap-2">
          <p className="text-[12px]">
            {blocked ? "Blocked" : "Active"}
          </p>

          <button
            onClick={() => setBlocked(!blocked)}
            className={`w-10 h-5 flex items-center rounded-full p-0.5 border transition
      ${blocked ? "bg-red-500 border-red-500" : "bg-gray-100 border-gray-400"}
    `}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white shadow transform transition
        ${blocked ? "translate-x-5" : "translate-x-0"}
      `}
            />
          </button>
        </div>


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
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-30" preserveAspectRatio="none">
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
    <div className="flex flex-col gap-4">
      <svg viewBox="0 0 180 180" className="w-44 h-50 mx-auto">
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
    <div className="flex flex-col gap-5 w-full">

      {/* Shipment Statistics */}
      <div className="rounded-2xl border p-2.5 bg-white border-gray-200 dark:bg-[#141414] dark:border-gray-600">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100">Driver Statistics</h3>
          <span className="text-[10px] text-gray-400 dark:text-zinc-600 border border-gray-200 dark:border-zinc-700 px-2 py-0.5 rounded-md">
            This Weekly
          </span>
        </div>
        <div className="mb-2">
          <span className="text-2xl font-bold text-gray-900 dark:text-zinc-100">980</span>
          <span className="text-xs text-gray-400 dark:text-zinc-500 ml-2">New Drivers</span>
        </div>
        <ShipmentChart />
        <div className="flex justify-between text-[9px] text-gray-400 dark:text-zinc-600 mt-1 px-1">
          {["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"].map((y) => (
            <span key={y}>{y}</span>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="rounded-[9px] border p-4 bg-white border-gray-200 dark:bg-[#141414] dark:border-gray-600">
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
      <div className="rounded-2xl border p-3 bg-white border-gray-200 dark:bg-[#141414] dark:border-gray-600">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-100 mb-1">Delay Reasons Breakdown</h3>
        <p className="text-xs text-gray-400 dark:text-zinc-600 mb-3">Delay Cases</p>
        <DelayPieChart />
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

// cols × rows per page:
//  < 1280px  (up to ~14" laptops)  → 3 cols × 3 rows = 9
//  ≥ 1280px  (15"+ / large screens) → 4 cols × 3 rows = 12
function useColsPerPage() {
  const getCols = () => {
    if (typeof window === "undefined") return 3;

    if (window.innerWidth >= 1024) return 3; // lg
    if (window.innerWidth >= 640) return 2;  // sm
    return 1; // mobile
  };
  const [cols, setCols] = useState<number>(getCols);

  useEffect(() => {
    const onResize = () => setCols(getCols());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return cols;
}

export default function DeliveryPartnerPage() {
  const [drivers, setDrivers] = useState<Driver[]>(DRIVERS);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // const [cardss, setCards] = useState<StatCard[]>([]);


  const cols = useColsPerPage();
  const pageSize = cols * 3; // always 3 rows

  const handleDelete = (id: string) => {
    setDrivers((prev) => prev.filter((d) => d.id !== id));
  };

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

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleExport = () => {
    const headers = ["#", "Driver ID", "Name", "Status", "Phone", "Vehicle", "Rating", "Trips", "Earnings", "Location"];
    const rows = drivers.map((d, i) => [
      i + 1, d.driverId, d.name, d.status, d.phone,
      d.vehicle, d.rating, d.trips, `₹${d.earnings}`, d.location,
    ]);
    const bom = "\uFEFF";
    const csv = bom + [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "application/vnd.ms-excel;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "delivery_partners.xls"; a.click();
    URL.revokeObjectURL(url);
  };

  // Grid class: 3 cols default, 4 cols on xl (≥1280px)
  const gridClass = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4";




  const calculatePercent = (value: number, total: number) => {
    if (!total || total === 0) return { percent: 0, label: "0%" };

    const percent = (value / total) * 100;

    return {
      percent,
      label: `${percent.toFixed(1)}%`,
    };
  };

  const getChangeType = (percent: number) => {
    if (percent > 60) return "positive";   // green
    if (percent < 20) return "negative";   // red
    return "neutral";                      // gray/yellow
  };

  const dispatch = useDispatch();
  const { driverStats, statsLoading } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchDriverStatsRequest());
  }, [dispatch]);


  const cards = useMemo(() => {
    if (!driverStats) return [];

    const total = driverStats.totaldrivers;

    const newDrivers = calculatePercent(driverStats.newdrivers, total);
    const online = calculatePercent(driverStats.online_drivers, total);
    const offline = calculatePercent(driverStats.offline_drivers, total);
    const blocked = calculatePercent(driverStats.blocked_drivers, total);

    return [
      {
        id: "total",
        title: "Total Drivers",
        value: total.toString(),
        change: `${newDrivers.label} new drivers`,
        changeType: getChangeType(newDrivers.percent),
        icon: "FaTruckMoving",
      },
      {
        id: "online",
        title: "Online Drivers",
        value: driverStats.online_drivers.toString(),
        change: `${online.label} of total`,
        changeType: getChangeType(online.percent),
        icon: "MdOutlineDirectionsBike",
      },
      {
        id: "offline",
        title: "Offline Drivers",
        value: driverStats.offline_drivers.toString(),
        change: `${offline.label} of total`,
        changeType: getChangeType(offline.percent),
        icon: "MdOutlineAirplanemodeInactive",
      },
      {
        id: "blocked",
        title: "Blocked Drivers",
        value: driverStats.blocked_drivers.toString(),
        change: `${blocked.label} of total`,
        changeType: getChangeType(blocked.percent),
        icon: "MdOutlinePendingActions",
      },
    ];
  }, [driverStats]);



async function handleFetchDriverStats() {
  try {
    const response = await axios.get(
      "https://bar-lawyer-owned-brilliant.trycloudflare.com/api/v1/super-admin/partner/all"
    );

    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

handleFetchDriverStats();


  return (
    <div className="w-full">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="text-[22px] font-semibold text-gray-900 dark:text-white">Delivery Partner</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">List of all driver partners</p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative w-60">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-600 pointer-events-none" />
            <input
              type="text"
              placeholder="Search drivers…"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-8 pr-4 py-2 rounded-[9px] text-[13px] outline-none
                         bg-white border border-gray-400 text-gray-800 placeholder-gray-400 focus:ring-1 focus:ring-gray-300
                         dark:bg-[#181818] dark:border-gray-600 dark:text-zinc-300 dark:placeholder-zinc-600 dark:focus:ring-zinc-700"
            />
          </div>
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[9px] text-[13px] font-semibold
                       border transition-all duration-150 hover:scale-105 active:scale-95 whitespace-nowrap
                       bg-white border-gray-400 text-gray-700 hover:bg-gray-50
                       dark:bg-[#181818] dark:border-gray-600 dark:text-zinc-300 dark:hover:bg-[#222]"
          >
            <Download size={14} />
            Export
          </button>
        </div>
      </div>



      <div className="grid grid-cols-2 mb-5 lg:grid-cols-4 gap-4">
        {statsLoading
          ? [...Array(4)].map((_, index) => (
            <SkeletonCard key={index} />
          ))
          : cards.map((card) => (
            <StatCardComponent key={card.id} card={card} />
          ))}
      </div>

      <br />


      {/* ── Layout: cards + sidebar ── */}
      <div className="flex gap-5 items-start">

        {/* Left: grid + pagination */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">

          {paged.length === 0 ? (
            <div className="flex items-center justify-center h-48 rounded-[10px] border border-dashed
                            border-gray-200 dark:border-zinc-800 text-gray-400 dark:text-zinc-600 text-sm">
              No drivers found{search ? ` for "${search}"` : ""}.
            </div>
          ) : (
            <div className={gridClass}>
              {paged.map((driver) => (
                <DriverCard key={driver.id} driver={driver} onDelete={handleDelete} />
              ))}
            </div>
          )}

          {/* ── Pagination ── */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-gray-400 dark:text-zinc-600">
              Page {safePage} of {totalPages}
              <span className="ml-2 text-gray-300 dark:text-zinc-700">
                · {filtered.length} driver{filtered.length !== 1 ? "s" : ""}
              </span>
            </span>

            <div className="flex items-center gap-1.5">
              {([
                { icon: <ChevronsLeft size={13} />, action: () => setPage(1), disabled: safePage === 1 },
                { icon: <ChevronLeft size={13} />, action: () => setPage((p) => Math.max(1, p - 1)), disabled: safePage === 1 },
                { icon: <ChevronRight size={13} />, action: () => setPage((p) => Math.min(totalPages, p + 1)), disabled: safePage === totalPages },
                { icon: <ChevronsRight size={13} />, action: () => setPage(totalPages), disabled: safePage === totalPages },
              ] as { icon: React.ReactNode; action: () => void; disabled: boolean }[]).map((btn, i) => (
                <button
                  key={i}
                  onClick={btn.action}
                  disabled={btn.disabled}
                  className="w-8 h-8 flex items-center justify-center rounded-lg transition-all cursor-pointer
                             disabled:opacity-20 disabled:cursor-not-allowed
                             border border-gray-200 text-gray-500 hover:enabled:bg-gray-100
                             dark:border-[#2a2a2a] dark:text-zinc-600 dark:hover:enabled:bg-[#1e1e1e]"
                >
                  {btn.icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-72 shrink-0 hidden lg:block">
          <h2 className="text-[18px] font-semibold text-gray-900 dark:text-zinc-100 mb-3">Driver Details</h2>
          <DriverSidebar />
        </div>
      </div>
    </div>
  );
}