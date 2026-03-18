import { createContext, useContext, useState } from "react";
import type { SidebarContextType } from "../../Types/types";

export const SidebarContext = createContext<SidebarContextType>({
  collapsed: false,
  toggleCollapsed: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

export const useSidebarState = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => setCollapsed((c) => !c);
  return { collapsed, toggleCollapsed };
};