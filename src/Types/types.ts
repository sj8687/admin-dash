// ── Navigation ──────────────────────────────────────────────
export interface NavItem {
  id: string;
  label: string;
  icon: string; // react-icons component name
  path: string;
  children?: NavItem[];
}

export interface NavGroup {
  title?: string;
  items: NavItem[];
}

// ── Stats / KPI Cards ────────────────────────────────────────
export interface StatCard {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: string;
}

// ── Chart ────────────────────────────────────────────────────
export interface ChartDataPoint {
  date: string;
  mobile: number;
  desktop: number;
}

// ── Projects ─────────────────────────────────────────────────
export interface Project {
  id: string;
  name: string;
  status: "active" | "completed" | "on-hold" | "cancelled";
  progress: number;
  dueDate: string;
  assignees: string[];
  priority: "low" | "medium" | "high";
}

// ── Reminder / Tasks ─────────────────────────────────────────
export type ReminderPriority = "low" | "medium" | "high";

export interface Reminder {
  id: string;
  title: string;
  time: string;
  priority: ReminderPriority;
  type: string;
}

// ── Team Members ─────────────────────────────────────────────
export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
  status: "online" | "offline" | "busy";
}

// ── Highlights ───────────────────────────────────────────────
export interface Highlight {
  id: string;
  label: string;
  value: string;
  trend: "up" | "down";
}

// ── Achievement ──────────────────────────────────────────────
export interface AchievementYear {
  year: number;
  projects: number;
  barWidth: number; // percentage
}

// ── Kanban ───────────────────────────────────────────────────
export interface KanbanCard {
  id: string;
  title: string;
  description: string;
  priority: ReminderPriority;
  assignee: string;
  dueDate: string;
  tags: string[];
}

export interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  cards: KanbanCard[];
}

// ── Chat ─────────────────────────────────────────────────────
export interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  message: string;
  time: string;
  unread?: number;
  online?: boolean;
}

// ── Calendar Event ───────────────────────────────────────────
export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "meeting" | "deadline" | "reminder" | "event";
  color: string;
}

// ── API Keys ─────────────────────────────────────────────────
export interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  status: "active" | "inactive";
}

// ── User ─────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: "active" | "inactive" | "pending";
  joined: string;
}

// ── Sidebar ──────────────────────────────────────────────────
export interface SidebarContextType {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

// ── Todo ─────────────────────────────────────────────────────
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: ReminderPriority;
  dueDate: string;
  category: string;
}

// ── Note ─────────────────────────────────────────────────────
export interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  createdAt: string;
  tags: string[];
}

// ── Order ────────────────────────────────────────────────────
export interface Order {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
}

// ── Product ──────────────────────────────────────────────────
export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  image: string;
  status: "in-stock" | "low-stock" | "out-of-stock";
}