"use client";

import { useState, useMemo } from "react";
import { Search, Download, MoreHorizontal, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Transaction, TransactionStatus } from "@/Types/types";
import { DUMMY_TRANSACTIONS } from "@/Data/mockdata";
import { StatusBadgee } from "@/Component/layouts/ReuseFunUi";
   import * as XLSX from "xlsx";


const PAGE_SIZE = 7;

function formatDateTime(iso: string) {
    return new Date(iso).toLocaleDateString("en-IN", {
        year: "numeric", month: "2-digit", day: "2-digit",
    }) + " · " + new Date(iso).toLocaleTimeString("en-IN", {
        hour: "2-digit", minute: "2-digit", hour12: true,
    });
}


interface TransactionTableProps {
    transactions?: Transaction[];
}

export default function ({ transactions = DUMMY_TRANSACTIONS }: TransactionTableProps) {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | TransactionStatus>("all");
    const [page, setPage] = useState(1);
    const [menuOpen, setMenuOpen] = useState<string | null>(null);
    const [statusOpen, setStatusOpen] = useState(false);

    const filtered = useMemo(() => {
        let list = [...transactions];
        const q = search.trim().toLowerCase();
        if (q) {
            list = list.filter((t) =>
                t.trackingId.toLowerCase().includes(q) ||
                t.clientName.toLowerCase().includes(q) ||
                t.deliveryPartnerName.toLowerCase().includes(q)
            );
        }
        if (statusFilter !== "all") list = list.filter((t) => t.status === statusFilter);
        return list;
    }, [transactions, search, statusFilter]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const safePage = Math.min(page, totalPages);
    const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);


const handleExport = () => {
    const data = filtered.map((t, i) => ({
        "#": i + 1,
        "Tracking ID": t.trackingId,
        "Client Name": t.clientName,
        "Delivery Partner": t.deliveryPartnerName,
        "Date & Time": new Date(t.dateTime).toLocaleString(),
        "Amount": t.amount,
        "Status": t.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    XLSX.writeFile(workbook, "transactions.xlsx");
};

    const thBase = "px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-widest whitespace-nowrap  text-center text-white dark:text-zinc-100";
    const tdBase = "px-4 py-3.5 text-sm whitespace-nowrap border-b border-gray-100 dark:border-[#1e1e1e]";

    const STATUS_OPTIONS: ("all" | TransactionStatus)[] = ["all", "pending", "processing", "success", "failed"];

    return (
        <div
            className="w-full space-y-4"
            // style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
            onClick={() => { setMenuOpen(null); setStatusOpen(false); }}
        >
            {/* ── Page header ── */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-medium text-gray-900 dark:text-white">Transactions</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Track all payment activity</p>
                </div>
                <button
                    onClick={handleExport}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-[9px] text-[13px] font-medium
                     border transition-all duration-150 hover:scale-105 active:scale-95
                     bg-white border-gray-300 text-gray-700 hover:bg-gray-50
                     dark:bg-[#181818] dark:border-[#9b9090] dark:text-zinc-300 dark:hover:bg-[#222]"
                >
                    <Download size={14} />
                    Export
                </button>
            </div>

            {/* ── Filters row ── */}
            <div className="flex items-center gap-3">

                {/* Status dropdown */}
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                    <button
                        onClick={() => setStatusOpen((o) => !o)}
                        className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-[9px] text-[13px] font-medium border
                       transition-colors
                       bg-white border-gray-200 text-gray-700 hover:bg-gray-50
                       dark:bg-[#181818] dark:border-[#867b7b] dark:text-zinc-300 dark:hover:bg-[#222]"
                    >
                        Status
                        <ChevronDown size={13} className={`transition-transform duration-200 ${statusOpen ? "rotate-180" : ""}`} />
                    </button>
                    {statusOpen && (
                        <div className="absolute left-0 top-full mt-1.5 z-30 w-40 rounded-xl overflow-hidden shadow-xl
                            bg-white border border-gray-200
                            dark:bg-[#1a1a1a] dark:border-[#2a2a2a]">
                            {STATUS_OPTIONS.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => { setStatusFilter(s); setStatusOpen(false); setPage(1); }}
                                    className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-colors
                              ${statusFilter === s
                                            ? "bg-gray-100 text-gray-900 dark:bg-zinc-800 dark:text-white"
                                            : "text-gray-600 hover:bg-gray-50 dark:text-zinc-400 dark:hover:bg-zinc-800"
                                        }`}
                                >
                                    {s === "all" ? "All Status" : s.charAt(0).toUpperCase() + s.slice(1)}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Search */}
                <div className="relative flex-1 max-w-2xs">
                    <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-600" />
                    <input
                        type="text"
                        placeholder="Search tracking ID, client, partner…"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        className="w-full pl-8 pr-4  py-2.5  rounded-[9px] text-xs outline-none
                       bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-1 focus:ring-gray-300
                       dark:bg-[#181818] dark:border-[#a19393] dark:text-zinc-300 dark:placeholder-zinc-600 dark:focus:ring-zinc-700"
                    />
                </div>
            </div>

            {/* ── Table card ── */}
            <div className="w-full rounded-[15px] overflow-hidden bg-white dark:bg-[#0f0f0f] border border-gray-200 dark:border-[#1f1f1f]">
                <div className="overflow-x-auto">
                    <table className="w-full  border-collapse">
                        <thead className="">
                            <tr className="bg-[#52B788] border-b border-gray-200 dark:border-[#1f1f1f]">
                                <th className={`${thBase} w-10`}>#</th>
                                <th className={thBase}>Tracking ID</th>
                                <th className={thBase}>Client Name</th>
                                <th className={thBase}>Delivery Partner Name</th>
                                <th className={thBase}>Date &amp; Time</th>
                                <th className={thBase}>Amount</th>
                                <th className={thBase}>Status</th>
                                <th className={`${thBase} w-10`}></th>
                            </tr>
                        </thead>

                        <tbody>
                            {paged.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-16 text-gray-400 dark:text-zinc-700 text-sm">
                                        No transactions match your search.
                                    </td>
                                </tr>
                            ) : (
                                paged.map((t, i) => {
                                    const serial = (safePage - 1) * PAGE_SIZE + i + 1;
                                    return (
                                        <tr
                                            key={t.id}
                                            className="transition-colors duration-100 hover:bg-green-100 dark:hover:bg-[#151515]"
                                            onClick={() => setMenuOpen(null)}
                                        >
                                            {/* # */}
                                            <td className={tdBase}>
                                                <span className="text-xs font-mono text-gray-400 dark:text-zinc-600">{serial}</span>
                                            </td>

                                            {/* Tracking ID */}
                                            <td className={tdBase}>
                                                <span className="text-xs font-mono font-semibold text-gray-600 dark:text-zinc-400">{t.trackingId}</span>
                                            </td>

                                            {/* Client name */}
                                            <td className={tdBase}>
                                                <span className="text-sm font-medium text-gray-800 dark:text-zinc-200">{t.clientName}</span>
                                            </td>

                                            {/* Delivery partner */}
                                            <td className={tdBase}>
                                                <span className="text-sm text-gray-600 dark:text-zinc-400">{t.deliveryPartnerName}</span>
                                            </td>

                                            {/* Date & time */}
                                            <td className={tdBase}>
                                                <span className="text-xs font-mono text-gray-500 dark:text-zinc-500">{formatDateTime(t.dateTime)}</span>
                                            </td>

                                            {/* Amount */}
                                            <td className={tdBase}>
                                                <span className="text-sm font-semibold text-gray-900 dark:text-zinc-100">₹{t.amount}</span>
                                            </td>

                                            {/* Status */}
                                            <td className={tdBase}>
                                                <StatusBadgee status={t.status} />
                                            </td>

                                            {/* Actions ⋯ */}
                                            <td className={`${tdBase} relative`} onClick={(e) => e.stopPropagation()}>
                                                <button
                                                    onClick={() => setMenuOpen(menuOpen === t.id ? null : t.id)}
                                                    className="p-1.5 rounded-lg transition-colors text-gray-400 hover:text-gray-700 hover:bg-gray-100
                                     dark:text-zinc-600 dark:hover:text-zinc-300 dark:hover:bg-zinc-800"
                                                >
                                                    <MoreHorizontal size={15} />
                                                </button>

                                                {menuOpen === t.id && (
                                                    <div className="absolute right-4 top-full mt-1 z-20 w-36 rounded-xl overflow-hidden shadow-xl
                                          bg-white border border-gray-200
                                          dark:bg-[#1a1a1a] dark:border-[#2a2a2a]">
                                                        {["View Details", "Download Receipt", "Flag Issue"].map((action) => (
                                                            <button
                                                                key={action}
                                                                onClick={() => setMenuOpen(null)}
                                                                className="w-full text-left px-4 py-2.5 text-xs font-medium transition-colors
                                           text-gray-600 hover:bg-gray-50 hover:text-gray-900
                                           dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
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
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-[#1a1a1a]">
                    <span className="text-xs text-gray-400 dark:text-zinc-600">
                        Page {safePage} of {totalPages}
                        <span className="ml-2 text-gray-300 dark:text-zinc-700">
                            · {filtered.length} transaction{filtered.length !== 1 ? "s" : ""}
                        </span>
                    </span>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={safePage === 1}
                            className="w-8 h-8 flex items-center justify-center rounded-lg transition-all cursor-pointer
                         disabled:opacity-20 disabled:cursor-not-allowed
                         border border-gray-200 text-gray-500 hover:enabled:bg-gray-100
                         dark:border-[#222] dark:text-zinc-600 dark:hover:enabled:bg-[#1e1e1e]"
                        >
                            <ChevronLeft size={14} />
                        </button>
                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={safePage === totalPages}
                            className="w-8 h-8 flex items-center justify-center rounded-lg transition-all cursor-pointer
                         disabled:opacity-20 disabled:cursor-not-allowed
                         border border-gray-200 text-gray-500 hover:enabled:bg-gray-100
                         dark:border-[#222] dark:text-zinc-600 dark:hover:enabled:bg-[#1e1e1e]"
                        >
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}