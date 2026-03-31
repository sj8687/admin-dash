"use client";

import { useState, useMemo } from "react";
import {
  Download, MoreHorizontal, ChevronLeft, ChevronRight,
  ChevronsLeft, ChevronsRight, Eye, Trash2, Search,
} from "lucide-react";
import { DUMMY_SHIPMENTS, ShipmentstatCards } from "@/Data/mockdata";
import StatCardComponent from "@/Component/dashboards/StatCard";
import { Shipment } from "@/Types/types";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ShipmentStatus = "Cancelled" | "On Time" | "In Transit" | "Delivered" | "Delayed";
export type TabFilter      = "All" | "Recent Orders" | "Top 10" | "Shipped" | "In Transit" | "Delayed" | "Out of Delivery";


const PAGE_SIZE = 7;

const TABS: TabFilter[] = ["All", "Recent Orders", "Top 10", "Shipped", "In Transit", "Delayed", "Out of Delivery"];

// ─── Stat Card ────────────────────────────────────────────────────────────────

// function StatCard({ label, value, color }: { label: string; value: number | string; color?: string }) {
//   return (
//     <div className="flex-1 px-5 py-4 border-r border-gray-200 dark:border-[#242424] last:border-r-0">
//       <p className="text-xs text-gray-500 dark:text-zinc-500 mb-1">{label}</p>
//       <p className={`text-2xl font-bold ${color ? "" : "text-gray-900 dark:text-white"}`} style={{ color: color ?? undefined }}>
//         {value}
//       </p>
//     </div>
//   );
// }

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ShipmentStatus }) {
  const cfg: Record<ShipmentStatus, { dot: string; text: string; border: string }> = {
    Cancelled:  { dot: "bg-red-500",    text: "text-red-600   dark:text-red-400",    border: "border-red-300   dark:border-red-700"   },
    "On Time":  { dot: "bg-blue-500",   text: "text-blue-600  dark:text-blue-400",   border: "border-blue-300  dark:border-blue-700"  },
    "In Transit":{ dot: "bg-purple-500",text: "text-purple-600 dark:text-purple-400",border: "border-purple-300 dark:border-purple-700"},
    Delivered:  { dot: "bg-green-500",  text: "text-green-600 dark:text-green-400",  border: "border-green-300 dark:border-green-700" },
    Delayed:    { dot: "bg-orange-500", text: "text-orange-600 dark:text-orange-400",border: "border-orange-300 dark:border-orange-700"},
  };
  const s = cfg[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-[9px] text-xs font-semibold border bg-transparent ${s.text} ${s.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}



// ─── Main Component ───────────────────────────────────────────────────────────

export default function ShipmentPage() {
  const [activeTab,  setActiveTab]  = useState<TabFilter>("All");
  const [search,     setSearch]     = useState("");
  const [page,       setPage]       = useState(1);
  const [menuOpen,   setMenuOpen]   = useState<string | null>(null);
  const [shipments,  setShipments]  = useState<Shipment[]>(DUMMY_SHIPMENTS);

  // ── Stats ──
//   const total     = shipments.length;
//   const inTransit = shipments.filter((s) => s.status === "In Transit").length;
//   const delivered = shipments.filter((s) => s.status === "Delivered").length;
//   const delayed   = shipments.filter((s) => s.status === "Delayed").length;
//   const cancelled = shipments.filter((s) => s.status === "Cancelled").length;

  // ── Filter ──
  const filtered = useMemo(() => {
    let list = [...shipments];

    // Tab filter
    if (activeTab === "In Transit")      list = list.filter((s) => s.status === "In Transit");
    else if (activeTab === "Shipped")    list = list.filter((s) => s.status === "Delivered" || s.status === "On Time");
    else if (activeTab === "Delayed")    list = list.filter((s) => s.status === "Delayed");
    else if (activeTab === "Out of Delivery") list = list.filter((s) => s.status === "Cancelled");
    else if (activeTab === "Recent Orders")   list = [...list].reverse().slice(0, 10);
    else if (activeTab === "Top 10")          list = list.slice(0, 10);

    // Search
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((s) =>
        s.trackingId.toLowerCase().includes(q)       ||
        s.customerName.toLowerCase().includes(q)     ||
        s.customerEmail.toLowerCase().includes(q)    ||
        s.pickupLocation.toLowerCase().includes(q)   ||
        s.dropLocation.toLowerCase().includes(q)
      );
    }
    return list;
  }, [shipments, activeTab, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage   = Math.min(page, totalPages);
  const paged      = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleSearch = (v: string) => { setSearch(v); setPage(1); };
  const handleTab    = (t: TabFilter) => { setActiveTab(t); setPage(1); setSearch(""); };
  const handleDelete = (id: string) => { setShipments((prev) => prev.filter((s) => s.id !== id)); setMenuOpen(null); };

  // Export
  const handleExport = () => {
    const headers = ["#", "Tracking ID", "Customer", "Email", "Pickup", "Pickup Date", "Drop", "Drop Date", "Status"];
    const rows = shipments.map((s, i) => [
      i + 1, s.trackingId, s.customerName, s.customerEmail,
      s.pickupLocation, s.pickupDate, s.dropLocation, s.dropDate, s.status,
    ]);
    const bom = "\uFEFF";
    const csv = bom + [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "application/vnd.ms-excel;charset=utf-8" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "shipments.xls"; a.click();
    URL.revokeObjectURL(url);
  };

  const tdCls  = "px-4 py-4 text-sm whitespace-nowrap border-b border-gray-100 dark:border-[#1e1e1e]";
  const thCls  = "px-4 py-3.5 text-left text-xs font-semibold text-gray-100 dark:text-zinc-100 uppercase tracking-wider whitespace-nowrap";

  return (
    <div
      className="w-full space-y-4"
      onClick={() => setMenuOpen(null)}
    >

      {/* ── Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 dark:text-white">Shipment</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Welcome back! Here's today's snapshot.</p>
        </div>
        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-[9px] text-sm font-semibold border
                     transition-all hover:scale-105 active:scale-95
                     bg-white border-gray-400 text-gray-700 hover:bg-gray-50
                     dark:bg-[#181818] dark:border-[#896b6b] dark:text-zinc-300 dark:hover:bg-[#222]"
        >
          <Download size={14} /> Export

        </button>
      </div>

      {/* ── Stat Row ── */}
      {/* <div className="flex rounded-2xl overflow-hidden border border-gray-200 dark:border-[#242424]
                      bg-white dark:bg-[#141414]">
        <StatCard label="Total"      value={total}     />
        <StatCard label="IN Transit" value={inTransit} color="#3b82f6" />
        <StatCard label="Delivered"  value={delivered} color="#22c55e" />
        <StatCard label="Delayed"    value={delayed}   color="#f97316" />
        <StatCard label="Cancelled"  value={cancelled} color="#ef4444" />
      </div> */}



              <div className="grid grid-cols-2  lg:grid-cols-4 gap-4">
                {ShipmentstatCards.map((card) => (
                  <StatCardComponent key={card.id} card={card} />
                ))}
              </div>

<br />

      {/* ── Tabs + Search ── */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {/* Tabs */}
        <div className="flex items-center gap-1 bg-white dark:bg-[#141414] border border-gray-400 dark:border-[#917171] rounded-[9px] p-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTab(tab)}
              className={`px-3 py-2.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === tab
                  ? "bg-green-500 text-white shadow-sm"
                  : "text-gray-500 dark:text-zinc-500 hover:text-gray-800 dark:hover:text-zinc-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-70">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-600 pointer-events-none" />
          <input
            type="text"
            placeholder="Search shipments…"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-8 pr-4 py-3 rounded-[9px] text-xs outline-none
                       bg-white border border-gray-200 text-gray-800 placeholder-gray-400 focus:ring-1 focus:ring-gray-300
                       dark:bg-[#181818] dark:border-[#9c7a7a] dark:text-zinc-300 dark:placeholder-zinc-600 dark:focus:ring-zinc-700"
          />
        </div>
      </div>

      {/* ── Table ── */}
      <div className="w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-[#1f1f1f]
                      bg-white dark:bg-[#0f0f0f]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#52B788]  border-b border-gray-200 dark:border-[#1f1f1f]">
                <th className={`${thCls} w-10`}>#</th>
                <th className={thCls}>Tracking ID</th>
                <th className={thCls}>Customer</th>
                <th className={thCls}>Pick Up</th>
                <th className={thCls}>Drop Point</th>
                <th className={thCls}>Status</th>
                <th className={`${thCls} text-center`}>Action</th>
              </tr>
            </thead>

            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-gray-400 dark:text-zinc-700 text-sm">
                    No shipments found.
                  </td>
                </tr>
              ) : (
                paged.map((s, i) => {
                  const serial = (safePage - 1) * PAGE_SIZE + i + 1;
                  return (
                    <tr
                      key={s.id}
                      className="transition-colors duration-100 hover:bg-green-100 dark:hover:bg-[#151515]"
                      onClick={() => setMenuOpen(null)}
                    >
                      {/* # */}
                      <td className={tdCls}>
                        <span className="text-xs text-gray-400 dark:text-zinc-600 font-mono">{serial}</span>
                      </td>

                      {/* Tracking ID */}
                      <td className={tdCls}>
                        <span className="text-sm font-bold text-gray-900 dark:text-zinc-100">{s.trackingId}</span>
                      </td>

                      {/* Customer */}
                      <td className={tdCls}>
                        <p className="font-semibold text-gray-900 dark:text-zinc-100 text-sm">{s.customerName}</p>
                        <p className="text-xs text-gray-400 dark:text-zinc-600 mt-0.5">{s.customerEmail}</p>
                      </td>

                      {/* Pickup */}
                      <td className={tdCls}>
                        <p className="text-sm font-medium text-gray-800 dark:text-zinc-200">{s.pickupLocation}</p>
                        <p className="text-xs text-gray-400 dark:text-zinc-600 mt-0.5">{s.pickupDate}</p>
                      </td>

                      {/* Drop */}
                      <td className={tdCls}>
                        <p className="text-sm text-gray-500 dark:text-zinc-500">{s.dropLocation}</p>
                        <p className="text-xs text-gray-400 dark:text-zinc-600 mt-0.5">{s.dropDate}</p>
                      </td>

                      {/* Status */}
                      <td className={tdCls}>
                        <StatusBadge status={s.status} />
                      </td>

                      {/* Action ⋯ */}
                      <td className={`${tdCls} text-center relative`} onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setMenuOpen(menuOpen === s.id ? null : s.id)}
                          className="p-1.5 rounded-lg transition-colors inline-flex items-center justify-center
                                     text-gray-400 hover:text-gray-700 hover:bg-gray-100
                                     dark:text-zinc-600 dark:hover:text-zinc-300 dark:hover:bg-zinc-800"
                        >
                          <MoreHorizontal size={15} />
                        </button>

                        {menuOpen === s.id && (
                          <div className="absolute right-6 top-full mt-1 z-30 w-36 rounded-[9px] overflow-hidden shadow-xl
                                          bg-white border border-gray-400 dark:bg-[#1a1a1a] dark:border-[#2a2a2a]">
                            <button
                              onClick={() => setMenuOpen(null)}
                              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium
                                         text-gray-600 bg-gray-100 hover:bg-gray-50 hover:text-gray-900
                                         dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                            >
                              <Eye size={13} /> View
                            </button>
                            <button
                              onClick={() => handleDelete(s.id)}
                              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium
                                         text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                            >
                              <Trash2 size={13} /> Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 dark:border-[#1a1a1a]">
          <span className="text-xs text-gray-400 dark:text-zinc-600">
            Page {safePage} of {totalPages}
            <span className="ml-2 text-gray-300 dark:text-zinc-700">
              · {filtered.length} shipment{filtered.length !== 1 ? "s" : ""}
            </span>
          </span>

          <div className="flex items-center gap-1.5">
            {([
              { icon: <ChevronsLeft  size={13} />, action: () => setPage(1),                                  disabled: safePage === 1         },
              { icon: <ChevronLeft   size={13} />, action: () => setPage((p) => Math.max(1, p - 1)),          disabled: safePage === 1         },
              { icon: <ChevronRight  size={13} />, action: () => setPage((p) => Math.min(totalPages, p + 1)), disabled: safePage === totalPages },
              { icon: <ChevronsRight size={13} />, action: () => setPage(totalPages),                         disabled: safePage === totalPages },
            ] as { icon: React.ReactNode; action: () => void; disabled: boolean }[]).map((btn, i) => (
              <button
                key={i}
                onClick={btn.action}
                disabled={btn.disabled}
                className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer transition-all
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
    </div>
  );
}