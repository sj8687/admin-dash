"use client";

import { useState, useMemo, useEffect } from "react";
import { PartnerListItem } from "@/Types/types";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Loader2, Search, Shield } from "lucide-react";
import { ActiveBadge, SortBtn, StatusBadge } from "@/Component/layouts/FunVerifypartner";
import { useDispatch, useSelector } from "react-redux";
import { getPartnerDocsRequest, getPartnersRequest } from "@/Redux/PostSlice";
import { RootState } from "@/Redux/Store";
import DocModal from "./PartnerDocs";



type SortKey = "full_name" | "is_active" | "created_at" | "mobile_number" | "status";
type SortDir = "asc" | "desc";

// ─── Constants ────────────────────────────────────────────────────────────────
const PAGE_SIZE = 7;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

// ─── Props ────────────────────────────────────────────────────────────────────
// interface PartnerListTableProps {
//   /** Called when admin clicks "View Docs" — wire your DocModal here later */
//   onViewDocs?: (partner: PartnerListItem) => void;
// }
// { onViewDocs }: PartnerListTableProps

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

  const thBase = "px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-widest select-none whitespace-nowrap transition-colors";
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
              <tr className="bg-gray-50 dark:bg-[#18181b] border-b  border-gray-200 dark:border-[#1f1f1f]">
                {/* # — no sort */}
                <th className={`${thBase} text-gray-500 dark:text-zinc-400 w-12`}>#</th>

                {([
                  ["", "Partner", false],
                  ["is_active", "Active Status", true],
                  ["created_at", "Joined Date", true],
                  ["mobile_number", "Phone", true],
                  ["", "Document's", false],
                  ["status", "Verify Status", true],
                ] as [SortKey | "", string, boolean][]).map(([col, label, sortable], i) => (
                  <th
                    key={i}
                    className={`${thBase} text-gray-500 dark:text-zinc-400
                                ${sortable ? "hover:text-gray-800  dark:hover:text-zinc-400 cursor-pointer" : ""}
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



















// "use client";

// import { useState, useMemo } from "react";
// import {
//   Search,
//   ChevronUp,
//   ChevronDown,
//   ChevronsLeft,
//   ChevronsRight,
//   ChevronLeft,
//   ChevronRight,
//   Shield,
//   ArrowUpDown,
//   X,
//   Check,
//   Eye,
//   ShieldCheck,
//   ShieldX,
// } from "lucide-react";

// // ─── Types ────────────────────────────────────────────────────────────────────

// /** Matches the shape from GET /partners → data.items[] */
// export interface PartnerListItem {
//   id: string;
//   imageUrl: string;
//   mobile_number: string;
//   full_name: string | null;
//   status: "pending" | "approved" | "rejected";
//   is_active: boolean;
//   is_online: boolean;
//   created_at: string;
// }

// /** Matches the shape from GET /partners/:id/docs */
// export interface PartnerDocs {
//   vehiclePhoto?: string;
//   vehicleDocument?: string;
//   aadhaarImageUrl?: string;
//   aadhaarPdfUrl?: string;
//   panCardUrl?: string;
//   profilePhotoUrl?: string;
// }

// type SortKey = "id" | "full_name" | "is_active" | "created_at" | "mobile_number" | "status";
// type SortDir = "asc" | "desc";

// // ─── Dummy Data ───────────────────────────────────────────────────────────────

// const DUMMY_PARTNERS: PartnerListItem[] = [
//   { id: "PTR-001", imageUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Ravi",   mobile_number: "8555885558", full_name: "Ravi Kumar",   status: "approved", is_active: true,  is_online: true,  created_at: "2026-03-18T12:05:54.800Z" },
//   { id: "PTR-002", imageUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Priya",  mobile_number: "9876543210", full_name: "Priya Sharma",  status: "pending",  is_active: true,  is_online: false, created_at: "2026-03-17T09:30:00.000Z" },
//   { id: "PTR-003", imageUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Ajay",   mobile_number: "7654321098", full_name: "Ajay Singh",    status: "rejected", is_active: false, is_online: false, created_at: "2026-03-16T14:20:00.000Z" },
//   { id: "PTR-004", imageUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Neha",   mobile_number: "9123456789", full_name: "Neha Patil",    status: "approved", is_active: true,  is_online: true,  created_at: "2026-03-15T08:00:00.000Z" },
//   { id: "PTR-005", imageUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Rohit",  mobile_number: "8901234567", full_name: "Rohit Desai",   status: "pending",  is_active: true,  is_online: false, created_at: "2026-03-14T11:45:00.000Z" },
//   { id: "PTR-006", imageUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Meena",  mobile_number: "7890123456", full_name: "Meena Joshi",   status: "approved", is_active: false, is_online: false, created_at: "2026-03-13T16:10:00.000Z" },
//   { id: "PTR-007", imageUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Vikram", mobile_number: "9012345678", full_name: "Vikram Rao",    status: "rejected", is_active: true,  is_online: true,  created_at: "2026-03-12T07:55:00.000Z" },
//   { id: "PTR-008", imageUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Sunita", mobile_number: "8123456790", full_name: "Sunita More",   status: "pending",  is_active: true,  is_online: false, created_at: "2026-03-11T13:30:00.000Z" },
//   { id: "PTR-009", imageUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Kiran",  mobile_number: "9234567801", full_name: "Kiran Nair",    status: "approved", is_active: true,  is_online: true,  created_at: "2026-03-10T10:20:00.000Z" },
//   { id: "PTR-010", imageUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Deepak", mobile_number: "7345678912", full_name: null,            status: "pending",  is_active: false, is_online: false, created_at: "2026-03-09T09:00:00.000Z" },
//   { id: "PTR-011", imageUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Anjali", mobile_number: "8456789023", full_name: "Anjali Mehta",  status: "approved", is_active: true,  is_online: false, created_at: "2026-03-08T15:40:00.000Z" },
//   { id: "PTR-012", imageUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Sanjay", mobile_number: "9567890134", full_name: "Sanjay Gupta",  status: "rejected", is_active: true,  is_online: true,  created_at: "2026-03-07T12:15:00.000Z" },
// ];

// const PAGE_SIZE = 6;

// // ─── Doc Meta ─────────────────────────────────────────────────────────────────

// type DocKey = keyof PartnerDocs;

// interface DocMeta {
//   key: DocKey;
//   label: string;
// }

// const DOC_META: DocMeta[] = [
//   { key: "profilePhotoUrl",  label: "Profile Photo"     },
//   { key: "aadhaarImageUrl",  label: "Aadhaar Card"      },
//   { key: "aadhaarPdfUrl",    label: "Aadhaar PDF"       },
//   { key: "panCardUrl",       label: "PAN Card"          },
//   { key: "vehiclePhoto",     label: "Vehicle Photo"     },
//   { key: "vehicleDocument",  label: "Vehicle Document"  },
// ];

// // ─── Mock Docs ────────────────────────────────────────────────────────────────

// const MOCK_DOCS: Record<string, PartnerDocs> = {
//   "PTR-001": { aadhaarImageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg", panCardUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg", vehiclePhoto: "https://res.cloudinary.com/demo/image/upload/sample.jpg", vehicleDocument: "https://res.cloudinary.com/demo/image/upload/sample.jpg" },
//   "PTR-002": { profilePhotoUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Priya", aadhaarImageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg", aadhaarPdfUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg", panCardUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg", vehiclePhoto: "https://res.cloudinary.com/demo/image/upload/sample.jpg", vehicleDocument: "https://res.cloudinary.com/demo/image/upload/sample.jpg" },
//   "PTR-003": { aadhaarImageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg", panCardUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg" },
//   "PTR-004": { aadhaarImageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg", panCardUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg", vehiclePhoto: "https://res.cloudinary.com/demo/image/upload/sample.jpg" },
//   "PTR-005": { aadhaarImageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg", vehiclePhoto: "https://res.cloudinary.com/demo/image/upload/sample.jpg", vehicleDocument: "https://res.cloudinary.com/demo/image/upload/sample.jpg" },
//   "PTR-006": { panCardUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg", vehicleDocument: "https://res.cloudinary.com/demo/image/upload/sample.jpg" },
//   "PTR-007": { aadhaarImageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg", aadhaarPdfUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg", panCardUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg" },
//   "PTR-008": { profilePhotoUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Sunita", vehiclePhoto: "https://res.cloudinary.com/demo/image/upload/sample.jpg" },
//   "PTR-009": { aadhaarImageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg", panCardUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg", vehiclePhoto: "https://res.cloudinary.com/demo/image/upload/sample.jpg", vehicleDocument: "https://res.cloudinary.com/demo/image/upload/sample.jpg" },
//   "PTR-010": { aadhaarImageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg" },
//   "PTR-011": { aadhaarImageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg", panCardUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg", vehiclePhoto: "https://res.cloudinary.com/demo/image/upload/sample.jpg" },
//   "PTR-012": { aadhaarImageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg", aadhaarPdfUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg" },
// };

// // ─── Helpers ──────────────────────────────────────────────────────────────────

// function formatDate(iso: string): string {
//   return new Date(iso).toLocaleDateString("en-IN", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });
// }

// function StatusBadge({ status }: { status: PartnerListItem["status"] }) {
//   const cfg: Record<PartnerListItem["status"], string> = {
//     approved: "bg-[#1a3a1a] text-[#4ade80] border border-[#2d6a2d]",
//     rejected: "bg-[#3a1a1a] text-[#f87171] border border-[#6a2d2d]",
//     pending:  "bg-[#3a2e00] text-[#facc15] border border-[#6a5200]",
//   };
//   return (
//     <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${cfg[status]}`}>
//       {status.charAt(0).toUpperCase() + status.slice(1)}
//     </span>
//   );
// }

// function ActiveBadge({ active }: { active: boolean }) {
//   return (
//     <span
//       className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
//         active
//           ? "bg-[#1a3a1a] text-[#4ade80] border border-[#2d6a2d]"
//           : "bg-[#1e1e1e] text-[#666] border border-[#2a2a2a]"
//       }`}
//     >
//       <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-[#4ade80]" : "bg-[#555]"}`} />
//       {active ? "Active" : "Inactive"}
//     </span>
//   );
// }

// function SortBtn({
//   col,
//   sortKey,
//   sortDir,
// }: {
//   col: SortKey;
//   sortKey: SortKey;
//   sortDir: SortDir;
// }) {
//   if (col !== sortKey)
//     return <ArrowUpDown size={12} className="text-[#444] ml-1 inline shrink-0" />;
//   return sortDir === "asc" ? (
//     <ChevronUp size={12} className="text-[#4ade80] ml-1 inline shrink-0" />
//   ) : (
//     <ChevronDown size={12} className="text-[#4ade80] ml-1 inline shrink-0" />
//   );
// }

// // ─── Doc Modal ────────────────────────────────────────────────────────────────

// function DocModal({
//   partner,
//   docs,
//   onClose,
//   onSubmit,
// }: {
//   partner: PartnerListItem;
//   docs: PartnerDocs;
//   onClose: () => void;
//   onSubmit: (partnerId: string, verified: boolean, checkedDocs: Set<DocKey>) => void;
// }) {
//   const [checked, setChecked] = useState<Set<DocKey>>(new Set());
//   const [preview, setPreview] = useState<string | null>(null);

//   const available = DOC_META.filter((d) => docs[d.key]);
//   const missing   = DOC_META.filter((d) => !docs[d.key]);
//   const allChecked = available.length > 0 && available.every((d) => checked.has(d.key));

//   const toggle = (key: DocKey) =>
//     setChecked((prev) => {
//       const next = new Set(prev);
//       next.has(key) ? next.delete(key) : next.add(key);
//       return next;
//     });

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
//       {/* Lightbox */}
//       {preview && (
//         <div
//           className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90"
//           onClick={() => setPreview(null)}
//         >
//           <img
//             src={preview}
//             alt="preview"
//             className="max-h-[82vh] max-w-[92vw] rounded-xl shadow-2xl"
//           />
//           <button className="absolute top-4 right-4 text-white/60 hover:text-white">
//             <X size={28} />
//           </button>
//         </div>
//       )}

//       <div
//         className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl"
//         style={{ background: "#111", border: "1px solid #222", fontFamily: "'DM Sans', sans-serif" }}
//       >
//         {/* Header */}
//         <div
//           className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
//           style={{ background: "#111", borderBottom: "1px solid #1e1e1e" }}
//         >
//           <div className="flex items-center gap-3">
//             <img
//               src={partner.imageUrl || `https://api.dicebear.com/7.x/thumbs/svg?seed=${partner.id}`}
//               alt={partner.full_name ?? "Partner"}
//               className="w-10 h-10 rounded-full object-cover"
//               style={{ border: "2px solid #2a2a2a" }}
//               onError={(e) => {
//                 (e.target as HTMLImageElement).src =
//                   `https://api.dicebear.com/7.x/thumbs/svg?seed=${partner.id}`;
//               }}
//             />
//             <div>
//               <p className="text-sm font-semibold text-[#e0e0e0]">
//                 {partner.full_name ?? "Unknown Partner"}
//               </p>
//               <p className="text-xs text-[#555]">{partner.mobile_number} · {partner.id}</p>
//             </div>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 rounded-xl transition-colors hover:bg-[#1e1e1e] text-[#666] hover:text-[#ccc]"
//           >
//             <X size={17} />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="px-6 pt-5 pb-4">
//           <p className="text-[10px] font-semibold uppercase tracking-widest text-[#444] mb-4">
//             Documents · {checked.size}/{available.length} verified
//           </p>

//           {available.length === 0 ? (
//             <div className="text-center py-12 text-[#444] text-sm">No documents uploaded yet.</div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               {available.map(({ key, label }) => {
//                 const url    = docs[key] as string;
//                 const isPdf  = url.endsWith(".pdf");
//                 const ticked = checked.has(key);
//                 return (
//                   <div
//                     key={key}
//                     className="rounded-xl overflow-hidden transition-all duration-200"
//                     style={{
//                       border: ticked ? "2px solid #2d6a2d" : "2px solid #1e1e1e",
//                       background: ticked ? "#0e200e" : "#141414",
//                     }}
//                   >
//                     {/* Preview */}
//                     {!isPdf ? (
//                       <div
//                         className="relative h-36 overflow-hidden cursor-zoom-in"
//                         style={{ background: "#1a1a1a" }}
//                         onClick={() => setPreview(url)}
//                       >
//                         <img
//                           src={url}
//                           alt={label}
//                           className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                           onError={(e) => {
//                             (e.target as HTMLImageElement).src =
//                               "https://placehold.co/400x200/1a1a1a/444?text=Preview";
//                           }}
//                         />
//                         <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/40">
//                           <Eye size={20} className="text-white" />
//                         </div>
//                       </div>
//                     ) : (
//                       <a
//                         href={url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex flex-col items-center justify-center h-36 gap-2 transition-colors hover:bg-[#162030]"
//                         style={{ background: "#101820" }}
//                       >
//                         <svg viewBox="0 0 24 24" className="w-10 h-10 text-blue-500" fill="currentColor">
//                           <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zM8 13h8v1H8v-1zm0 3h8v1H8v-1zm0-6h3v1H8v-1z" />
//                         </svg>
//                         <span className="text-xs text-blue-400 font-medium">View PDF</span>
//                       </a>
//                     )}

//                     {/* Label + checkbox */}
//                     <div className="flex items-center justify-between px-3 py-2.5">
//                       <span className="text-xs font-medium text-[#bbb]">{label}</span>
//                       <button
//                         onClick={() => toggle(key)}
//                         className="flex items-center justify-center w-7 h-7 rounded-lg border-2 transition-all duration-200"
//                         style={{
//                           background:   ticked ? "#4ade80" : "transparent",
//                           borderColor:  ticked ? "#4ade80" : "#333",
//                           color:        ticked ? "#000" : "transparent",
//                           transform:    ticked ? "scale(1.08)" : "scale(1)",
//                         }}
//                       >
//                         <Check size={13} strokeWidth={3} />
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* Missing docs */}
//           {missing.length > 0 && (
//             <div
//               className="mt-4 px-3 py-2.5 rounded-xl text-xs"
//               style={{ background: "#1e1500", color: "#a87c00", border: "1px solid #3a2800" }}
//             >
//               <span className="font-semibold">Missing: </span>
//               {missing.map((d) => d.label).join(", ")}
//             </div>
//           )}
//         </div>

//         {/* Footer actions */}
//         <div
//           className="sticky bottom-0 flex gap-3 px-6 py-4"
//           style={{ background: "#111", borderTop: "1px solid #1e1e1e" }}
//         >
//           <button
//             onClick={() => onSubmit(partner.id, false, checked)}
//             className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
//             style={{ border: "2px solid #3a1a1a", color: "#f87171", background: "transparent" }}
//             onMouseEnter={(e) => (e.currentTarget.style.background = "#1e0a0a")}
//             onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
//           >
//             <ShieldX size={15} /> Unverify
//           </button>
//           <button
//             onClick={() => onSubmit(partner.id, true, checked)}
//             disabled={!allChecked}
//             className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
//             style={{
//               background:  allChecked ? "#4ade80" : "#1a1a1a",
//               color:       allChecked ? "#000"    : "#333",
//               cursor:      allChecked ? "pointer" : "not-allowed",
//               border:      "none",
//               boxShadow:   allChecked ? "0 0 20px #4ade8044" : "none",
//             }}
//           >
//             <ShieldCheck size={15} /> Verify All
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Props ────────────────────────────────────────────────────────────────────

// interface PartnerListTableProps {
//   /** Real data from your API; falls back to DUMMY_PARTNERS */
//   partners?: PartnerListItem[];
//   /** Fires when admin clicks "View Docs" — wire to your DocModal */
//   onViewDocs?: (partner: PartnerListItem) => void;
// }

// // ─── Component ────────────────────────────────────────────────────────────────

// export default function PartnerListTable({
//   partners = DUMMY_PARTNERS,
//   onViewDocs,
// }: PartnerListTableProps) {
//   const [search, setSearch]             = useState<string>("");
//   const [statusFilter, setStatusFilter] = useState<"all" | PartnerListItem["status"]>("all");
//   const [sortKey, setSortKey]           = useState<SortKey>("created_at");
//   const [sortDir, setSortDir]           = useState<SortDir>("desc");
//   const [page, setPage]                 = useState<number>(1);

//   // Modal state
//   const [selectedPartner, setSelectedPartner] = useState<PartnerListItem | null>(null);
//   const [localPartners, setLocalPartners]     = useState<PartnerListItem[]>(partners);

//   const handleViewDocs = (p: PartnerListItem) => {
//     setSelectedPartner(p);
//     onViewDocs?.(p); // also fire parent callback if provided
//   };

//   const handleModalSubmit = (
//     partnerId: string,
//     verified: boolean,
//     _checkedDocs: Set<DocKey>
//   ) => {
//     // Update local status immediately (replace with your Redux dispatch / API call later)
//     setLocalPartners((prev) =>
//       prev.map((p) =>
//         p.id === partnerId ? { ...p, status: verified ? "approved" : "rejected" } : p
//       )
//     );
//     setSelectedPartner(null);
//   };

//   const handleSort = (key: SortKey) => {
//     if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
//     else { setSortKey(key); setSortDir("asc"); }
//     setPage(1);
//   };

//   const filtered = useMemo(() => {
//     let list = [...localPartners];
//     const q = search.trim().toLowerCase();
//     if (q) {
//       list = list.filter(
//         (p) =>
//           p.id.toLowerCase().includes(q) ||
//           (p.full_name?.toLowerCase() ?? "").includes(q) ||
//           p.mobile_number.includes(q)
//       );
//     }
//     if (statusFilter !== "all") list = list.filter((p) => p.status === statusFilter);
//     list.sort((a, b) => {
//       let av: string | number = "";
//       let bv: string | number = "";
//       if (sortKey === "id")            { av = a.id;            bv = b.id; }
//       if (sortKey === "full_name")     { av = a.full_name ?? ""; bv = b.full_name ?? ""; }
//       if (sortKey === "is_active")     { av = a.is_active ? 1 : 0; bv = b.is_active ? 1 : 0; }
//       if (sortKey === "created_at")    { av = a.created_at;    bv = b.created_at; }
//       if (sortKey === "mobile_number") { av = a.mobile_number; bv = b.mobile_number; }
//       if (sortKey === "status")        { av = a.status;        bv = b.status; }
//       if (av < bv) return sortDir === "asc" ? -1 : 1;
//       if (av > bv) return sortDir === "asc" ? 1  : -1;
//       return 0;
//     });
//     return list;
//   }, [localPartners, search, statusFilter, sortKey, sortDir]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
//   const safePage   = Math.min(page, totalPages);
//   const paged      = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

//   // ── Styles ──
//   const thBase =
//     "px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-widest select-none whitespace-nowrap transition-colors";
//   const tdBase = "px-5 py-3.5 text-sm whitespace-nowrap";

//   return (
//     <div
//       className="w-full rounded-2xl overflow-hidden"
//       style={{
//         background: "#0f0f0f",
//         border: "1px solid #1f1f1f",
//         fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
//       }}
//     >
//       {/* ── Toolbar ── */}
//       <div
//         className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-5"
//         style={{ borderBottom: "1px solid #1a1a1a" }}
//       >
//         <h2 className="text-white font-bold text-lg tracking-tight">Partner List</h2>

//         <div className="flex items-center gap-2.5 w-full sm:w-auto">
//           {/* Search */}
//           <div className="relative flex-1 sm:w-64">
//             <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444]" />
//             <input
//               type="text"
//               placeholder="Search ID, name, phone…"
//               value={search}
//               onChange={(e) => { setSearch(e.target.value); setPage(1); }}
//               className="w-full pl-8 pr-4 py-2 rounded-xl text-xs text-[#ccc] placeholder-[#3a3a3a] outline-none focus:ring-1 focus:ring-[#333]"
//               style={{ background: "#181818", border: "1px solid #252525" }}
//             />
//           </div>

//           {/* Status filter */}
//           <select
//             value={statusFilter}
//             onChange={(e) => { setStatusFilter(e.target.value as typeof statusFilter); setPage(1); }}
//             className="px-3 py-2 rounded-xl text-xs text-[#bbb] outline-none cursor-pointer"
//             style={{ background: "#181818", border: "1px solid #252525" }}
//           >
//             <option value="all">All Status</option>
//             <option value="approved">Approved</option>
//             <option value="pending">Pending</option>
//             <option value="rejected">Rejected</option>
//           </select>
//         </div>
//       </div>

//       {/* ── Table ── */}
//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse">
//           {/* Head */}
//           <thead>
//             <tr style={{ background: "#141414", borderBottom: "1px solid #1f1f1f" }}>
//               <th
//                 className={`${thBase} text-[#555] hover:text-[#888] cursor-pointer`}
//                 onClick={() => handleSort("id")}
//               >
//                 Partner ID <SortBtn col="id" sortKey={sortKey} sortDir={sortDir} />
//               </th>
//               <th className={`${thBase} text-[#555] min-w-[170px]`}>Partner</th>
//               <th
//                 className={`${thBase} text-[#555] hover:text-[#888] cursor-pointer`}
//                 onClick={() => handleSort("is_active")}
//               >
//                 Active Status <SortBtn col="is_active" sortKey={sortKey} sortDir={sortDir} />
//               </th>
//               <th
//                 className={`${thBase} text-[#555] hover:text-[#888] cursor-pointer`}
//                 onClick={() => handleSort("created_at")}
//               >
//                 Joined Date <SortBtn col="created_at" sortKey={sortKey} sortDir={sortDir} />
//               </th>
//               <th
//                 className={`${thBase} text-[#555] hover:text-[#888] cursor-pointer`}
//                 onClick={() => handleSort("mobile_number")}
//               >
//                 Phone <SortBtn col="mobile_number" sortKey={sortKey} sortDir={sortDir} />
//               </th>
//               <th className={`${thBase} text-[#555] text-center`}>Docs</th>
//               <th
//                 className={`${thBase} text-[#555] hover:text-[#888] cursor-pointer`}
//                 onClick={() => handleSort("status")}
//               >
//                 Verify Status <SortBtn col="status" sortKey={sortKey} sortDir={sortDir} />
//               </th>
//             </tr>
//           </thead>

//           {/* Body */}
//           <tbody>
//             {paged.length === 0 ? (
//               <tr>
//                 <td colSpan={7} className="text-center py-16 text-[#333] text-sm">
//                   No partners match your search.
//                 </td>
//               </tr>
//             ) : (
//               paged.map((p, i) => (
//                 <tr
//                   key={p.id}
//                   className="group transition-colors duration-100 hover:bg-[#151515]"
//                   style={{
//                     borderBottom: i < paged.length - 1 ? "1px solid #181818" : "none",
//                   }}
//                 >
//                   {/* ID */}
//                   <td className={tdBase}>
//                     <span
//                       className="text-xs text-[#666]"
//                       style={{ fontFamily: "'JetBrains Mono', 'Fira Mono', monospace" }}
//                     >
//                       {p.id}
//                     </span>
//                   </td>

//                   {/* Photo + Name */}
//                   <td className={tdBase}>
//                     <div className="flex items-center gap-3">
//                       <div className="relative shrink-0">
//                         <img
//                           src={p.imageUrl || `https://api.dicebear.com/7.x/thumbs/svg?seed=${p.id}`}
//                           alt={p.full_name ?? "Partner"}
//                           className="w-9 h-9 rounded-full object-cover"
//                           style={{ border: "2px solid #252525" }}
//                           onError={(e) => {
//                             (e.target as HTMLImageElement).src =
//                               `https://api.dicebear.com/7.x/thumbs/svg?seed=${p.id}`;
//                           }}
//                         />
//                         {/* Online dot */}
//                         <span
//                           className={`absolute -bottom-px -right-px w-2.5 h-2.5 rounded-full border-2 border-[#0f0f0f] ${
//                             p.is_online ? "bg-[#4ade80]" : "bg-[#333]"
//                           }`}
//                         />
//                       </div>
//                       <span className="text-[#d4d4d4] font-medium text-sm">
//                         {p.full_name ?? (
//                           <span className="text-[#444] italic text-xs">No name</span>
//                         )}
//                       </span>
//                     </div>
//                   </td>

//                   {/* Active status */}
//                   <td className={tdBase}>
//                     <ActiveBadge active={p.is_active} />
//                   </td>

//                   {/* Date */}
//                   <td className={tdBase}>
//                     <span
//                       className="text-[#777] text-xs"
//                       style={{ fontFamily: "'JetBrains Mono', monospace" }}
//                     >
//                       {formatDate(p.created_at)}
//                     </span>
//                   </td>

//                   {/* Phone */}
//                   <td className={tdBase}>
//                     <span
//                       className="text-[#999] text-xs"
//                       style={{ fontFamily: "'JetBrains Mono', monospace" }}
//                     >
//                       {p.mobile_number}
//                     </span>
//                   </td>

//                   {/* View Docs */}
//                   <td className={`${tdBase} text-center`}>
//                     <button
//                       onClick={() => handleViewDocs(p)}
//                       className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer"
//                       style={{
//                         background: "#162016",
//                         color: "#4ade80",
//                         border: "1px solid #254025",
//                       }}
//                     >
//                       <Shield size={12} />
//                       View Docs
//                     </button>
//                   </td>

//                   {/* Verify status */}
//                   <td className={tdBase}>
//                     <StatusBadge status={p.status} />
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* ── Pagination ── */}
//       <div
//         className="flex items-center justify-between px-6 py-4"
//         style={{ borderTop: "1px solid #1a1a1a" }}
//       >
//         <span className="text-xs text-[#444]">
//           Page {safePage} of {totalPages}
//           <span className="ml-2 text-[#333]">· {filtered.length} partner{filtered.length !== 1 ? "s" : ""}</span>
//         </span>

//         <div className="flex items-center gap-1.5">
//           {(
//             [
//               { icon: <ChevronsLeft size={13} />, action: () => setPage(1),              disabled: safePage === 1 },
//               { icon: <ChevronLeft  size={13} />, action: () => setPage((p) => Math.max(1, p - 1)),             disabled: safePage === 1 },
//               { icon: <ChevronRight size={13} />, action: () => setPage((p) => Math.min(totalPages, p + 1)),    disabled: safePage === totalPages },
//               { icon: <ChevronsRight size={13}/>, action: () => setPage(totalPages),     disabled: safePage === totalPages },
//             ] as { icon: React.ReactNode; action: () => void; disabled: boolean }[]
//           ).map((btn, i) => (
//             <button
//               key={i}
//               onClick={btn.action}
//               disabled={btn.disabled}
//               className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-150 disabled:opacity-20 disabled:cursor-not-allowed hover:enabled:bg-[#1e1e1e] cursor-pointer"
//               style={{ border: "1px solid #222", color: "#777" }}
//             >
//               {btn.icon}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ── Doc Modal ── */}
//       {selectedPartner && (
//         <DocModal
//           partner={selectedPartner}
//           docs={MOCK_DOCS[selectedPartner.id] ?? {}}
//           onClose={() => setSelectedPartner(null)}
//           onSubmit={handleModalSubmit}
//         />
//       )}
//     </div>
//   );
// }
