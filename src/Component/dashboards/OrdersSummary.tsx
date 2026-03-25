import { mockProjects } from "@/Data/mockdata";
import { RecentProject } from "@/Types/types";
import React, { useState, useMemo } from "react";
import {
  RiSearchLine,
  RiCheckLine,
  RiCloseLine,
  RiMoreLine,
  RiArrowUpDownLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";

/* ── Config ──────────────────────────────────────────────── */
const PAGE_SIZE = 4;

const RecentProjectsTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof RecentProject | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<"top" | "bottom">("bottom");
  const [page, setPage] = useState(1);

  /* ── Filter + sort ── */
  const filtered = useMemo(() => {
    let rows = mockProjects.filter((p) => {
      const q = search.toLowerCase();
      return (
        !q ||
        p.orderId.toLowerCase().includes(q) ||
        p.clientName.toLowerCase().includes(q) ||
        p.deliveryPartner.toLowerCase().includes(q)
      );
    });

    if (sortField) {
      rows = [...rows].sort((a, b) => {
        const av = String(a[sortField]).toLowerCase();
        const bv = String(b[sortField]).toLowerCase();
        return sortDir === "asc"
          ? av.localeCompare(bv)
          : bv.localeCompare(av);
      });
    }

    return rows;
  }, [search, sortField, sortDir]);

  /* Pagination */
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  React.useEffect(() => {
    setPage(1);
  }, [search, sortField, sortDir]);

  const toggleSort = (field: keyof RecentProject) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const ColHead: React.FC<{ label: string; field?: keyof RecentProject }> = ({ label, field }) => (
    <th
      onClick={() => field && toggleSort(field)}
      className="px-4 py-3 text-xs font-bold uppercase cursor-pointer text-gray-100 dark:text-gray-100"
    >
      <span className="flex items-center gap-1">
        {label}
        {field && <RiArrowUpDownLine size={12} />}
      </span>
    </th>
  );

  return (
    <div className="rounded-xl border overflow-hidden 
      bg-white border-gray-200 
      dark:bg-[#09090b] dark:border-[#27272b]"
    >
      {/* Header */}
      <div className="flex p-5 justify-between  items-center p-4 border-b 
        border-gray-200 dark:border-[#0f0f11]"
      >
        <h3 className="font-medium text-gray-800 dark:text-gray-200">
          Recent Orders
        </h3>

        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-1 rounded 
          bg-gray-100 border border-gray-300
          dark:bg-[#19191d] dark:border-[#29292e]"
        >
          <RiSearchLine className="text-gray-500 dark:text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Order ID Name"
            className="bg-transparent p-0.5 px-6 outline-none text-sm 
              text-gray-800 placeholder-gray-500
              dark:text-gray-200 dark:placeholder-gray-500"
          />
        </div>
      </div>
      <div className="p-4 ">
        {/* Table */}
        <table className="w-full ">
          <thead className=" text-sm bg-[#52B788] s font-bold uppercase cursor-pointer ">
            <tr >
              <ColHead label="Order ID" field="orderId" />
              <ColHead label="Client Name" field="clientName" />
              <ColHead label="Delivery Partner" field="deliveryPartner" />
              <ColHead label="Start Date" field="startDate" />
              <ColHead label="Deadline" field="deadline" />
              <th className="text-gray-100 !text-xs dark:text-gray-100">Transaction</th>
              <th></th>
            </tr>
          </thead>

          <tbody className="text-sm font-medium">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center p-6 text-gray-500">
                  No results found
                </td>
              </tr>
            ) : (
              paginated.map((project) => (
                <tr
                  key={project.id}
                  className="border-t border-gray-200 dark:border-[#0f0f11] 
                  hover:bg-green-100 dark:hover:bg-[#111113]"
                >
                  <td className="p-3 text-gray-800 dark:text-gray-200">
                    {project.orderId}
                  </td>
                  <td className="p-3 text-gray-800 dark:text-gray-200">
                    {project.clientName}
                  </td>
                  <td className="p-3 text-gray-800 dark:text-gray-200">
                    {project.deliveryPartner}
                  </td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">
                    {project.startDate}
                  </td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">
                    {project.deadline}
                  </td>

                  <td className="p-3 text-center">
                    {project.transactionOk ? (
                      <RiCheckLine className="text-green-500 mx-auto" />
                    ) : (
                      <RiCloseLine className="text-red-500 mx-auto" />
                    )}
                  </td>

                  {/* Dropdown */}
                  <td className="p-3 relative">
                    <button
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const spaceBelow = window.innerHeight - rect.bottom;

                        if (openMenu === project.id) {
                          setOpenMenu(null);
                        } else {
                          setOpenMenu(project.id);
                          setMenuPosition(spaceBelow < 120 ? "top" : "bottom");
                        }
                      }}
                      className="p-1 rounded dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#1a1a1d]"
                    >
                      <RiMoreLine />
                    </button>

                    {openMenu === project.id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setOpenMenu(null)}
                        />

                        <div
                          className={`absolute right-0 w-32 rounded-lg shadow-md z-20
                          bg-white border border-gray-200
                          dark:bg-[#19191d] dark:border-[#29292e]
                          ${menuPosition === "bottom" ? "mt-2 top-full" : "mb-2 bottom-full"}
                        `}
                        >
                          {["View", "Edit", "Delete"].map((action) => (
                            <button
                              key={action}
                              onClick={() => setOpenMenu(null)}
                              className={`block w-full text-left px-4 py-2 text-sm 
                              hover:bg-gray-100 dark:hover:bg-[#232326]
                              ${action === "Delete"
                                  ? "text-red-500"
                                  : "text-gray-700 dark:text-gray-300"
                                }`}
                            >
                              {action}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-between items-center p-4 border-t 
        border-gray-200 dark:border-[#0f0f11]"
      >
        <span className="text-sm text-gray-500">
          Page {page} of {totalPages}
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 border rounded border-gray-300 dark:border-[#29292e]"
          >
            <RiArrowLeftSLine className="dark:text-gray-200" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-1 rounded border 
                ${page === p
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "border-gray-300 dark:border-[#29292e] text-gray-700 dark:text-gray-300"
                }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 border rounded border-gray-300 dark:border-[#29292e]"
          >
            <RiArrowRightSLine className="dark:text-gray-200" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentProjectsTable;