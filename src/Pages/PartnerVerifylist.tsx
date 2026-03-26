"use client";

import { useState, useMemo, useEffect } from "react";
import { PartnerListItem } from "@/Types/types";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Loader2, Search, Shield } from "lucide-react";
import { ActiveBadge, SortBtn, StatusBadge } from "@/Component/layouts/ReuseFunUi";
import { useDispatch, useSelector } from "react-redux";
import { getPartnerDocsRequest, getPartnersRequest } from "@/Redux/PostSlice";
import { RootState } from "@/Redux/Store";
import DocModal from "../Component/layouts/PartnerDocModal";


type SortKey = "full_name" | "is_active" | "created_at" | "mobile_number" | "status";
type SortDir = "asc" | "desc";

const PAGE_SIZE = 7;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function PartnerListTable() {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"all" | PartnerListItem["status"]>("all");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState<number>(1);

  const [selectedPartner, setSelectedPartner] = useState<PartnerListItem | null>(null);

  const dispatch = useDispatch();

  const { partnerDocs, partnerDocsLoading, partners, partnersLoading, partnersError } = useSelector(
      (state: RootState) => state.posts
    );

  {
    partnerDocsLoading && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
        <Loader2 className="animate-spin text-white" />
      </div>
    )
  }

  useEffect(() => {
    dispatch(getPartnersRequest());
  }, [dispatch]);



  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("hii thre");
      setDebouncedSearch(search);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [search]);


  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
    setPage(1);
  };

  const filtered = useMemo(() => {
    let list = [...partners];

    // Search filter
    const q = debouncedSearch.trim().toLowerCase();
    if (q !== "") {
      list = list.filter((p) =>
        p.id.toLowerCase().includes(q) ||
        (p.full_name?.toLowerCase() ?? "").includes(q) ||
        p.mobile_number.includes(q)
      );
    }

    // (DROPDOWN LOGIC HERE)
    if (statusFilter !== "all") {
      list = list.filter((p) => p.status === statusFilter);
    }
    // Sorting
    list.sort((a, b) => {
      let av: string | number = "", bv: string | number = "";

      if (sortKey === "full_name") {
        av = a.full_name ?? "";
        bv = b.full_name ?? "";
      }
      if (sortKey === "is_active") {
        av = a.is_active ? 1 : 0;
        bv = b.is_active ? 1 : 0;
      }
      if (sortKey === "created_at") {
        av = a.created_at;
        bv = b.created_at;
      }
      if (sortKey === "mobile_number") {
        av = a.mobile_number;
        bv = b.mobile_number;
      }

      if (sortKey === "status") {
        av = a.status;
        bv = b.status;
      }

      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return list;
  }, [partners, debouncedSearch, statusFilter, sortKey, sortDir]);


  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE); const safePage = Math.min(page, totalPages);
  // const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const thBase = "px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-widest select-none whitespace-nowrap bg-[#52B788] transition-colors";
  const tdBase = "px-5 py-3.5 text-sm whitespace-nowrap border-b border-gray-100 dark:border-[#181818]";

  const SkeletonRow = () => (
    <tr>
      {[28, 160, 90, 80, 90, 80, 80].map((w, i) => (
        <td key={i} className={tdBase}>
          <div className="h-4 rounded-md bg-gray-100 dark:bg-zinc-800 animate-pulse" style={{ width: w }} />
        </td>
      ))}
    </tr>
  );

  return (
    <div className="w-full space-y-4" style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end  justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-medium text-gray-900 dark:text-white">Partner's</h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Welcome back! Here's today's snapshot.
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative w-60">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-600" />
            <input
              type="text"
              placeholder="Search name, phone…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full  font-medium pl-8 pr-5 py-2.5 rounded-[7px] text-xs 
                         bg-white border border-gray-400 text-gray-800 placeholder-gray-400 focus:ring-1 focus:ring-gray-300
                         dark:bg-[#19191d] dark:border-gray-500 dark:text-zinc-200 dark:placeholder-zinc-700 dark:focus:ring-zinc-700"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value as typeof statusFilter); setPage(1); }}
            className="px-3 py-2 rounded-[7px] text-xs  cursor-pointer 
                       bg-white border border-gray-400 font-medium text-gray-700
                       dark:bg-[#19191d] dark:border-gray-500 dark:text-zinc-200"
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* ── Table card ── */}
      <div className="w-full mt-8 rounded-2xl overflow-hidden bg-white dark:bg-[#0f0f0f] border border-gray-200 dark:border-[#1f1f1f]">

        {/* Error banner */}
        {partnersError && (
          <div className="px-6 py-3 text-xs text-red-600 bg-red-50 border-b border-red-100 dark:text-red-300 dark:bg-red-950/30 dark:border-red-900">
            ⚠ Failed to load partners: {partnersError}
          </div>
        )}

        <div className="overflow-x-auto ">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#18181b] text-white border-b  border-gray-200 dark:border-[#1f1f1f]">
                {/* # — no sort */}
                <th className={`${thBase} text-gray-100 dark:text-zinc-400 w-12`}>#</th>

                {([
                  ["", "Partner", ],
                  ["is_active", "Active Status", ],
                  ["created_at", "Joined Date", ],
                  ["mobile_number", "Phone", ],
                  ["", "Document's", false],
                  ["status", "Verify Status", ],
                ] as [SortKey | "", string, boolean][]).map(([col, label, sortable], i) => (
                  <th
                    key={i}
                    className={`${thBase} text-white dark:text-zinc-100
                                ${sortable ? " dark:hover:text-zinc-400 text-white cursor-pointer" : ""}
                                ${i === 4 ? "text-center" : ""}
                                ${i === 0 ? "min-w-[170px]" : ""}`}
                    onClick={() => sortable && handleSort(col as SortKey)}
                  >
                    {label}
                    {sortable && <SortBtn col={col as SortKey} sortKey={sortKey} sortDir={sortDir} />}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="">
              {partnersLoading ? (
                Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonRow key={i} />)
              ) : paged.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-16 text-gray-400 dark:text-zinc-700 text-sm">
                    {partnersError ? "Could not load partners." : "No partners match your search."}
                  </td>
                </tr>
              ) : (
                paged.map((p, i) => {
                  const serial = (safePage - 1) * PAGE_SIZE + i + 1;
                  return (
                    <tr key={p.id} className="transition-colors  duration-100 hover:bg-gray-50 dark:hover:bg-[#151515]">

                      {/* # */}
                      <td className={tdBase}>
                        <span className=" text-gray-400 text-[13px] font-medium dark:text-gray-200 ">{serial}</span>
                      </td>

                      {/* Partner photo + name */}
                      <td className={tdBase}>
                        <div className="flex items-center gap-3">
                          <div className="relative shrink-0">
                            <img
                              src={p.imageUrl || `https://api.dicebear.com/7.x/thumbs/svg?seed=${p.id}`}
                              alt={p.full_name ?? "Partner"}
                              className="w-9 h-9 rounded-full object-cover border-2 border-gray-200 dark:border-zinc-500"
                              onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/thumbs/svg?seed=${p.id}`; }}
                            />
                            <span className={`absolute -bottom-px -right-px w-2.5 h-2.5 rounded-full border-2 border-white dark:border-[#0f0f0f] ${p.is_online ? "bg-green-400" : "bg-gray-300 dark:bg-zinc-600"}`} />
                          </div>
                          <span className=" font-medium text-gray-800 dark:text-gray-200">
                            {p.full_name ?? <span className="text-gray-400 dark:text-gray-200 italic text-xs">No name</span>}
                          </span>
                        </div>
                      </td>

                      {/* Active */}
                      <td className={tdBase}><ActiveBadge active={p.is_active} /></td>

                      {/* Date */}
                      <td className={tdBase}>
                        <span className="  text-gray-500 dark:text-gray-200 text-[13px] font-medium">{formatDate(p.created_at)}</span>
                      </td>

                      {/* Phone */}
                      <td className={tdBase}>
                        <span className="  text-gray-500 dark:text-gray-200 text-[13px] font-medium ">{p.mobile_number}</span>
                      </td>

                      {/* View Docs */}
                      <td className={`${tdBase} text-start`}>
                        <button
                          onClick={() => {
                            setSelectedPartner(p);
                            dispatch(getPartnerDocsRequest(p.id));
                          }} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                                     transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer
                                     bg-green-50 text-green-700 border border-green-200 hover:bg-green-100
                                     dark:bg-green-950/40 dark:text-green-400 dark:border-green-900 dark:hover:bg-green-950/70"
                        >
                          <Shield size={12} /> View Docs
                        </button>
                      </td>

                      {/* Verify status */}
                      <td className={tdBase}><StatusBadge status={p.status} /></td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-[#1a1a1a]">
          <span className="text-xs text-gray-400 dark:text-zinc-400 ">
            {partnersLoading ? (
              <span className="flex items-center gap-1.5">
                <Loader2 size={11} className="animate-spin" /> Loading…
              </span>
            ) : (
              <>
                Page {safePage} of {totalPages}
                <span className="ml-2  ">
                  · {filtered.length} partner{filtered.length !== 1 ? "s" : ""}
                </span>
              </>
            )}
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
                disabled={btn.disabled || partnersLoading}
                className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-150 cursor-pointer
                           disabled:opacity-20 disabled:cursor-not-allowed
                           border border-gray-200 text-gray-500 hover:enabled:bg-gray-100
                           dark:border-[#222] dark:text-zinc-300 dark:hover:enabled:bg-[#1e1e1e]"
              >
                {btn.icon}
              </button>
            ))}
          </div>
        </div>

      </div>
      {selectedPartner && partnerDocs && (
        <DocModal
          partner={selectedPartner}
          docs={partnerDocs}
          onClose={() => {
            setSelectedPartner(null);
          }}
          onSubmit={() => { }}
        />
      )}
    </div>
  );
}