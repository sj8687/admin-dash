"use client";

import { useState, useMemo } from "react";
import {
  Search, Download, MoreHorizontal,
  ChevronLeft, ChevronRight, ChevronDown,
} from "lucide-react";
import { DUMMY_USERS, UsersStatsCards } from "@/Data/mockdata";
import StatCardComponent from "@/Component/dashboards/StatCard";


export type UserRole = "Admin" | "User" | "Manager" | "Support";
export type UserStatus = "Active" | "Inactive" | "Banned";

const PAGE_SIZE = 7;


function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" })
    + " · "
    + d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
}

function StatusBadge({ status }: { status: UserStatus }) {
  const cfg: Record<UserStatus, string> = {
    Active: "border border-green-400 text-green-600 dark:text-green-400",
    Inactive: "border border-yellow-400 text-yellow-600 dark:text-yellow-400",
    Banned: "border border-red-400   text-red-600   dark:text-red-400",
  };
  return (
    <span className={`px-3 py-1 rounded-[9px] text-xs font-semibold bg-transparent ${cfg[status]}`}>
      {status}
    </span>
  );
}

// function RoleBadge({ role }: { role: UserRole }) {
//   const cfg: Record<UserRole, string> = {
//     Admin:   "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
//     Manager: "bg-blue-100   text-blue-700   dark:bg-blue-900/30   dark:text-blue-400",
//     Support: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
//     User:    "bg-gray-100   text-gray-600   dark:bg-zinc-800       dark:text-zinc-400",
//   };
//   return (
//     <span className={`px-2.5 py-0.5 rounded-md text-xs font-medium ${cfg[role]}`}>
//       {role}
//     </span>
//   );
// }

// ─── Component ────────────────────────────────────────────────────────────────

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | UserStatus>("all");
  const [page, setPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [statusOpen, setStatusOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...DUMMY_USERS];
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.includes(q) ||
        u.address.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "all") list = list.filter((u) => u.status === statusFilter);
    return list;
  }, [search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleSearch = (v: string) => { setSearch(v); setPage(1); };
  const handleStatus = (v: typeof statusFilter) => { setStatusFilter(v); setStatusOpen(false); setPage(1); };

  // Export to Excel
  const handleExport = () => {
    const headers = ["#", "User ID", "Name", "Email", "Phone", "Address", "Role", "Status", "Joined"];
    const rows = DUMMY_USERS.map((u, i) => [
      i + 1, u.id, u.name, u.email, u.phone, u.address, u.status, new Date(u.joined).toLocaleDateString(),
    ]);
    const bom = "\uFEFF";
    const csv = bom + [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "application/vnd.ms-excel;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "users.xls"; a.click();
    URL.revokeObjectURL(url);
  };

  const thCls = "px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-widest text-white whitespace-nowrap";
  const tdCls = "px-4 py-4 text-sm whitespace-nowrap";
  const borderB = "border-b border-gray-100 dark:border-[#1e1e1e]";

  const STATUS_OPTIONS: ("all" | UserStatus)[] = ["all", "Active", "Inactive", "Banned"];

  return (
    <div
      className="w-full space-y-4"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
      onClick={() => { setMenuOpen(null); setStatusOpen(false); }}
    >
      {/* ── Page header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[22px] font-medium text-gray-900 dark:text-white">Users</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Manage all registered users</p>
        </div>
        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-[9px] text-[13px] font-semibold border
                     transition-all hover:scale-105 active:scale-95
                     bg-white border-gray-200 text-gray-700 hover:bg-gray-50
                     dark:bg-[#181818] dark:border-[#2a2a2a] dark:text-zinc-300 dark:hover:bg-[#222]"
        >
          <Download size={14} /> Export
        </button>
      </div>


      <div className="grid grid-cols-2  lg:grid-cols-4 gap-4">
        {UsersStatsCards.map((card) => (
          <StatCardComponent key={card.id} card={card} />
        ))}
      </div>
<br />


      {/* ── Filters ── */}
      <div className="flex items-center gap-3">
        {/* Status dropdown */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setStatusOpen((o) => !o)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[9px] text-[13px] font-medium border
                       bg-white border-gray-400 text-gray-700 hover:bg-gray-50
                       dark:bg-[#181818] dark:border-[#a78080] dark:text-zinc-300 dark:hover:bg-[#222]"
          >
            Status
            <ChevronDown size={13} className={`transition-transform duration-200 ${statusOpen ? "rotate-180" : ""}`} />
          </button>
          {statusOpen && (
            <div className="absolute left-0 top-full mt-1.5 z-30 w-36 rounded-xl overflow-hidden shadow-xl
                            bg-white border border-gray-200 dark:bg-[#1a1a1a] dark:border-[#2a2a2a]">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatus(s)}
                  className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-colors
                              ${statusFilter === s
                      ? "bg-gray-100 text-gray-900 dark:bg-zinc-800 dark:text-white"
                      : "text-gray-600 hover:bg-gray-50 dark:text-zinc-400 dark:hover:bg-zinc-800"
                    }`}
                >
                  {s === "all" ? "All Status" : s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-[300px]">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-600" />
          <input
            type="text"
            placeholder="Search name, email, phone, address…"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-8 pr-4 py-2 rounded-[9px] text-[13px] outline-none
                       bg-white border border-gray-400 text-gray-800 placeholder-gray-400 focus:ring-1 focus:ring-gray-300
                       dark:bg-[#181818] dark:border-[#857171] dark:text-zinc-300 dark:placeholder-zinc-600 dark:focus:ring-zinc-700"
          />
        </div>
      </div>

      {/* ── Table ── */}
      <div className="w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-[#1f1f1f]
                      bg-white dark:bg-[#0f0f0f]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">

            {/* Green header — matching screenshot */}
            <thead>
              <tr className="bg-[#52B788]">
                <th className={`${thCls} w-10`}>#</th>
                {/* <th className={thCls}>User ID</th> */}
                <th className={thCls}>Name</th>
                <th className={thCls}>Email</th>
                <th className={thCls}>Phone</th>
                <th className={thCls}>Address</th>
                {/* <th className={thCls}>Role</th> */}
                <th className={thCls}>Joined</th>
                <th className={thCls}>Status</th>
                <th className={`${thCls} w-10`}></th>
              </tr>
            </thead>

            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-16 text-gray-400 dark:text-zinc-700 text-sm">
                    No users match your search.
                  </td>
                </tr>
              ) : (
                paged.map((u, i) => {
                  const serial = (safePage - 1) * PAGE_SIZE + i + 1;
                  const isEven = i % 2 === 0;
                  const rowBg = u.status === "Active" && isEven
                    ? "bg-green-50/60 dark:bg-green-950/10"
                    : "bg-white dark:bg-[#0f0f0f]";

                  return (
                    <tr
                      key={u.id}
                      className={`transition-colors duration-100 hover:bg-green-100  dark:hover:bg-[#151515] ${rowBg}`}
                      onClick={() => setMenuOpen(null)}
                    >
                      {/* # */}
                      <td className={`${tdCls} ${borderB}`}>
                        <span className="text-xs text-gray-400 dark:text-zinc-600 font-mono">{serial}</span>
                      </td>

                      {/* User ID */}
                      {/* <td className={`${tdCls} ${borderB}`}>
                        <span className="text-xs font-mono font-semibold text-gray-500 dark:text-zinc-500">{u.id}</span>
                      </td> */}

                      {/* Name */}
                      <td className={`${tdCls} ${borderB}`}>
                        <div className="flex items-center gap-2.5">
                          {/* Avatar initials */}
                          {/* <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center shrink-0"> */}
                            {/* <span className="text-[11px] font-bold text-green-700 dark:text-green-400">
                              {u.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                            </span> */}
                          {/* </div> */}
                          <span className="font-semibold text-gray-900 dark:text-zinc-100">{u.name}</span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className={`${tdCls} ${borderB}`}>
                        <span className="text-gray-600 dark:text-zinc-400">{u.email}</span>
                      </td>

                      {/* Phone */}
                      <td className={`${tdCls} ${borderB}`}>
                        <span className="font-mono text-xs text-gray-600 dark:text-zinc-400">{u.phone}</span>
                      </td>

                      {/* Address */}
                      <td className={`${tdCls} ${borderB} max-w-[180px]`}>
                        <span className="text-gray-500 dark:text-zinc-500 text-xs truncate block">{u.address}</span>
                      </td>

                      {/* Role */}
                      {/* <td className={`${tdCls} ${borderB}`}>
                        <RoleBadge role={u.role} />
                      </td> */}

                      {/* Joined */}
                      <td className={`${tdCls} ${borderB}`}>
                        <span className="text-xs font-mono text-gray-500 dark:text-zinc-500">{formatDate(u.joined)}</span>
                      </td>

                      {/* Status */}
                      <td className={`${tdCls} ${borderB}`}>
                        <StatusBadge status={u.status} />
                      </td>

                      {/* ⋯ menu */}
                      <td className={`${tdCls} ${borderB} relative`} onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setMenuOpen(menuOpen === u.id ? null : u.id)}
                          className="p-1.5 rounded-lg transition-colors
                                     text-gray-400 hover:text-gray-700 hover:bg-gray-100
                                     dark:text-zinc-600 dark:hover:text-zinc-300 dark:hover:bg-zinc-800"
                        >
                          <MoreHorizontal size={15} />
                        </button>
                        {menuOpen === u.id && (
                          <div className="absolute right-4 top-full mt-1 z-20 w-36 rounded-xl overflow-hidden shadow-xl
                                          bg-white border border-gray-200 dark:bg-[#1a1a1a] dark:border-[#2a2a2a]">
                            {["View Profile", "Edit User", "Ban User", "Delete"].map((action) => (
                              <button
                                key={action}
                                onClick={() => setMenuOpen(null)}
                                className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-colors
                                           ${action === "Delete" || action === "Ban User"
                                    ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                                  }`}
                              >
                                {action}
                              </button>
                            ))}
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
              · {filtered.length} user{filtered.length !== 1 ? "s" : ""}
            </span>
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer transition-all
                         disabled:opacity-20 disabled:cursor-not-allowed
                         border border-gray-200 text-gray-500 hover:enabled:bg-gray-100
                         dark:border-[#2a2a2a] dark:text-zinc-600 dark:hover:enabled:bg-[#1e1e1e]"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer transition-all
                         disabled:opacity-20 disabled:cursor-not-allowed
                         border border-gray-200 text-gray-500 hover:enabled:bg-gray-100
                         dark:border-[#2a2a2a] dark:text-zinc-600 dark:hover:enabled:bg-[#1e1e1e]"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}