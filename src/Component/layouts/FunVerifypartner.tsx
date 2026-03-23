import { PartnerListItem } from "@/Types/types";
import {
   ChevronUp, ChevronDown, ArrowUpDown,
} from "lucide-react";



export function StatusBadge({ status }: { status: PartnerListItem["status"] }) {
  const map: Record<PartnerListItem["status"], string> = {
    approved: "bg-green-100  text-green-700  border border-green-300  dark:bg-green-900/40  dark:text-green-400  dark:border-green-800",
    rejected: "bg-red-100    text-red-700    border border-red-300    dark:bg-red-900/40    dark:text-red-400    dark:border-red-800",
    pending:  "bg-yellow-100 text-yellow-700 border border-yellow-300 dark:bg-yellow-900/40 dark:text-yellow-400 dark:border-yellow-800",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${map[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export function ActiveBadge({ active }: { active: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium border ${
      active
        ? "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/40 dark:text-green-400 dark:border-green-800"
        : "bg-gray-100  text-gray-500  border-gray-300  dark:bg-zinc-800     dark:text-zinc-500  dark:border-zinc-700"
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-green-500 dark:bg-green-400" : "bg-gray-400 dark:bg-zinc-600"}`} />
      {active ? "Active" : "Inactive"}
    </span>
  );
}


type SortKey = "full_name" | "is_active" | "created_at" | "mobile_number" | "status";
type SortDir = "asc" | "desc";


export function SortBtn({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (col !== sortKey) return <ArrowUpDown size={12} className="text-gray-400 dark:text-zinc-600 ml-1 inline shrink-0" />;
  return sortDir === "asc"
    ? <ChevronUp   size={12} className="text-green-500 ml-1 inline shrink-0" />
    : <ChevronDown size={12} className="text-green-500 ml-1 inline shrink-0" />;
}
