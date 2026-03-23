import React, { useState, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  RiDashboardLine, RiShoppingBagLine, RiContactsLine, RiBarChartLine,
  RiFolderLine, RiBitCoinLine, RiMessage2Line, RiMailLine, RiLayoutLine,
  RiTodoLine, RiStickyNoteLine, RiCalendarLine, RiKeyLine, RiUserLine,
  RiGroupLine, RiSettingsLine, RiShoppingCartLine, RiBox3Line, RiShieldLine,
  RiMenuFoldLine, RiMenuUnfoldLine, RiArrowDownSLine,
  RiListCheck, RiFileList3Line, RiAddCircleLine, RiLoginBoxLine, RiUserAddLine,
} from "react-icons/ri";
import { navGroups } from "../../Data/mockdata";
import { useSidebar } from "../layouts/SidebarContext";


/* ── icon registry ─────────────────────────────────────────── */
const iconMap: Record<string, React.ElementType> = {
  RiDashboardLine, RiShoppingBagLine, RiContactsLine, RiBarChartLine,
  RiFolderLine, RiBitCoinLine, RiMessage2Line, RiMailLine,
  RiLayoutLine, RiTodoLine, RiStickyNoteLine, RiCalendarLine,
  RiKeyLine, RiUserLine, RiGroupLine, RiSettingsLine,
  RiShoppingCartLine, RiBox3Line, RiShieldLine, RiListCheck,
  RiFileList3Line, RiAddCircleLine, RiLoginBoxLine, RiUserAddLine,
};



/* ── NavItem row ───────────────────────────────────────────── */
interface NavItemRowProps {
  id: string;
  label: string;
  iconKey: string;
  path: string;
  collapsed: boolean;
  children?: Array<{ id: string; label: string; iconKey: string; path: string }>;
}

const NavItemRow: React.FC<NavItemRowProps> = ({ id, label, iconKey, path, collapsed, children }) => {
  const location = useLocation();
  const hasChildren = !!children?.length;
  const isChildActive = children?.some((c) => location.pathname === c.path) ?? false;
  const [open, setOpen] = useState(isChildActive);
  const contentRef = useRef<HTMLDivElement>(null);

  const Icon = iconMap[iconKey] ?? RiDashboardLine;

  const isActive = !hasChildren
    ? location.pathname === path
    : isChildActive;

  /* ── collapsed: just icon + tooltip ── */
  if (collapsed) {
    return (
      <div className="px-2 mb-0.5 ">
        {/* <Tooltip label={label}> */}
        <NavLink
          to={hasChildren ? (children?.[0]?.path ?? path) : path}
          className={() =>
            `w-full flex items-center justify-center py-2.5 rounded-xl transition-all ${isActive
              ? "bg-green-900 text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`
          }
        >
          <Icon size={18} />
        </NavLink>
        {/* </Tooltip> */}
      </div>
    );
  }

  /* ── expanded ── */
  return (
    <div className="px-3 mb-0.5">
      {hasChildren ? (
        <>
          <button
            onClick={() => setOpen((o) => !o)}
            className={`w-full flex items-center gap-3 px-3  py-2.5 rounded-xl text-[13px] font-medium transition-all ${isActive
              ? "bg-gray-50 text-gray-900"
              : "text-gray-600 dark:text-gray-200 hover:bg-gray-50 hover:text-gray-900"
              }`}
          >
            <Icon size={16} className="flex-shrink-0" />
            <span className="flex-1 text-left">{label}</span>
            <RiArrowDownSLine
              size={14}
              className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </button>

          {/* Animated sub-menu */}
          <div
            ref={contentRef}
            className="overflow-hidden transition-all duration-200 ease-in-out"
            style={{ maxHeight: open ? `${(children?.length ?? 0) * 40 + 8}px` : "0px" }}
          >
            <div className="ml-4 mt-1 border-l-2 border-gray-100 pl-3 flex flex-col gap-0.5 pb-1">
              {children?.map((child) => {
                const ChildIcon = iconMap[child.iconKey] ?? RiListCheck;
                return (
                  <NavLink
                    key={child.id}
                    to={child.path}
                    className={({ isActive: na }) =>
                      `flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[12px] transition-all ${na
                        ? "bg-green-800 text-gray-100 font-semibold"
                        : "text-gray-500 dark:text-gray-100 hover:text-gray-800 hover:bg-gray-50"
                      }`
                    }
                  >
                    <ChildIcon size={13} />
                    <span>{child.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <NavLink
          to={path}
          className={({ isActive: na }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${na
              ? "bg-green-900 dark:text-gray-400 text-white shadow-sm"
              : "text-gray-600  dark:text-gray-300 hover:bg-gray-50 hover:text-gray-900"
            }`
          }
        >
          {({ isActive: na }) => (
            <>
              <Icon size={16} className="flex-shrink-0" />
              <span>{label}</span>
              {/* Unread badge – only for Chats */}
              {id === "chats" && (
                <span className={`ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full ${na ? "bg-white text-gray-900" : "bg-gray-900 text-white"}`}>
                  4
                </span>
              )}
            </>
          )}
        </NavLink>
      )}
    </div>
  );
};



/* ── Main Sidebar ──────────────────────────────────────────── */
const Sidebar: React.FC = () => {
  const { collapsed, toggleCollapsed } = useSidebar();
  // const [darkMode, setDarkMode] = useState(false);

  return (
    <aside
      className={`
        fixed top-0 text-gray- left-0 h-screen dark:bg-[#18181b] bg-white border-r border-gray-100 z-40
        flex flex-col transition-all duration-300 ease-in-out
        ${collapsed ? "w-[68px]" : "w-[230px]"}
      `}
      style={{ boxShadow: "1px 0 0 0 #f1f5f9" }}
    >
      {/* ── Logo + Toggle ─────────────────────────────────── */}
      <div
        className={`flex items-center min-h-[60px] border-b border-gray-100 px-4 ${collapsed ? "justify-center" : "justify-between"
          }`}
      >
        {/* Logo */}
        <div className={`flex items-center gap-2.5 overflow-hidden ${collapsed ? "w-0 opacity-0" : "flex-1 opacity-100"} transition-all duration-300`}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="inline-block w-6 h-6">
              <img
                src="/dashlogo.png"
                alt="icon"
                className="w-full dark:bg-gray-200 dark:rounded-[8px] p-1 h-full object-contain"
              />
            </span>          </div>
          <span className="font-bold dark:text-gray-200 text-gray-900 text-[13px] whitespace-nowrap">DASH</span>
        </div>

        {/* Toggle */}
        <button
          onClick={toggleCollapsed}
          className="p-2 rounded-xl dark:text-gray-300 dark:hover:bg-gray-400 hover:bg-gray-100 text-gray-500 transition-colors flex-shrink-0"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <RiMenuUnfoldLine size={17} /> : <RiMenuFoldLine size={17} />}
        </button>
      </div>


      {/* ── Nav groups ────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-2 scrollbar-thin">
        {navGroups.map((group) => (
          <div key={group.title ?? "main"} className="mb-3">
            {/* Group label */}
            {!collapsed && group.title && (
              <p className="px-6 pb-1.5 pt-1 text-[9px] font-bold dark:text-gray-100 text-gray-400 uppercase tracking-[0.08em]">
                {group.title}
              </p>
            )}
            {collapsed && group.title && (
              <div className="mx-4 my-2 border-t border-gray-100" />
            )}

            {group.items.map((item: any) => (
              <NavItemRow
                key={item.id}
                id={item.id}
                label={item.label}
                iconKey={item.icon}
                path={item.path}
                collapsed={collapsed}
                children={item.children?.map((c: any) => ({
                  id: c.id,
                  label: c.label,
                  iconKey: c.icon,
                  path: c.path,
                }))}
              />
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;