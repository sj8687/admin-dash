import { ShipmentStatus } from "@/Pages/ShipmentPage";
import { UserStatus } from "@/Pages/UsersPage";

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


export interface RecentProject {
  id: string;
  orderId: string;
  clientName: string;
  deliveryPartner: string;
  startDate: string;
  deadline: string;
  transactionOk: boolean;
}

export type TransactionStatus = "pending" | "failed" | "processing" | "success";

export interface Transaction {
  id: string;
  trackingId: string;
  clientName: string;
  deliveryPartnerName: string;
  dateTime: string;
  amount: number;
  status: TransactionStatus;
}


export type DriverStatus = "On Route" | "Completed" | "Canceled";

export interface Driver {
  id: string;
  name: string;
  photo: string;
  status: DriverStatus;
  driverId: string;
  phone: string;
  vehicle: string;
  rating: number;
  trips: number;
  earnings: string;
  location: string;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  // role: UserRole;
  status: UserStatus;
  joined: string; // ISO date
}


export interface StatCardd { label: string; value: string; change: number; }
export interface EarningRow { label: string; icon: string; amount: number; color: string; max: number; }
export interface EarningRow { label: string; icon: string; amount: number; color: string; max: number; }
export interface BarPoint { day: string; value: number; }
export interface AreaPoint { month: string; value: number; target: number; }
export interface LinePoint { x: number; y: number; }
export interface CampaignRoww { label: string; value: string | number; change: number; icon: React.ReactNode; highlight?: boolean; }
export interface TicketStatt { label: string; value: number; icon: React.ReactNode; color: string; }


export interface Shipment {
  id: string;
  trackingId: string;
  customerName: string;
  customerEmail: string;
  pickupLocation: string;
  pickupDate: string;
  dropLocation: string;
  dropDate: string;
  status: ShipmentStatus;
}











//nav items
export interface NavItemRowProps {
  id: string;
  label: string;
  iconKey: string;
  path: string;
  collapsed: boolean;
  children?: Array<{ id: string; label: string; iconKey: string; path: string }>;
}


// list data of partner
export interface PartnerListItem {
  id: string;
  imageUrl: string;
  mobile_number: string;
  full_name: string | null;
  status: "pending" | "approved" | "rejected";
  is_active: boolean;
  is_online: boolean;
  created_at: string;
}


// login res
export interface LoginResponse {
  status: string;
  message: string;
}


//partner docs data
export interface PartnerDocs {
  vehiclePhoto?: string;
  vehicleDocument?: string;
  aadhaarImageUrl?: string;
  aadhaarPdfUrl?: string;
  panCardUrl?: string;
  profilePhotoUrl?: string;
}


//partner docs api
export interface VerifiedDocuments {
  id: string;
  aadhaar: "verified" | "pending";
  panCard: "verified" | "pending";
  licence: "verified" | "pending";
  bank: "verified" | "pending";
  vehicleDocument: "verified" | "pending";
  partnerId: string;
}

export interface PartnerDocs {
  profilePhotoUrl?: string;
  aadhaarImageUrl?: string;
  aadhaarPdfUrl?: string;
  panCardUrl?: string;
  vehiclePhoto?: string;
  vehicleDocument?: string;

  verifiedDocuments?: VerifiedDocuments;
}


// docs
export type VerifyDocsPayload = {
  aadhaar: "verified" | "pending" | "rejected";
  panCard: "verified" | "pending" | "rejected";
  licence: "verified" | "pending" | "rejected";
  bank: "verified" | "pending" | "rejected";
  vehicleDocument: "verified" | "pending" | "rejected";
};