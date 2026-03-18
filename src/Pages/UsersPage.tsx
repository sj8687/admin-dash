import React, { useState } from "react";
import { RiAddLine, RiSearchLine, RiMoreLine } from "react-icons/ri";
import { users } from "../Data/mockdata";
import PageHeader from "../Component/ui/PageHeader";
import Badge from "../Component/ui/Badge";



type StatusVariant = "success" | "warning" | "default";
const statusVariant: Record<string, StatusVariant> = {
  active: "success", pending: "warning", inactive: "default",
};

const UsersPage: React.FC = () => {
  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (u:any) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Users"
        subtitle={`${users.length} total users`}
        actions={
          <button className="flex items-center gap-1.5 text-sm text-white bg-gray-900 rounded-lg px-4 py-2 hover:bg-gray-700">
            <RiAddLine size={15} /> Add User
          </button>
        }
      />

      {/* Search & filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex-1 max-w-sm">
          <RiSearchLine size={14} className="text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="bg-transparent text-sm outline-none placeholder-gray-400 w-full"
          />
        </div>
        <select className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 outline-none">
          <option>All Roles</option>
          <option>Admin</option>
          <option>Developer</option>
          <option>Designer</option>
          <option>Manager</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["User", "Email", "Role", "Status", "Joined", ""].map((h, i) => (
                  <th key={i} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((user:any) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                      <span className="font-medium text-gray-800 text-sm">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-500">{user.email}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-600">{user.role}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant={statusVariant[user.status]}>{user.status}</Badge>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-500">{user.joined}</td>
                  <td className="px-5 py-3.5">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                      <RiMoreLine size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;