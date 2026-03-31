"use client";

import { useState } from "react";
import {
  Star, Phone, MapPin, Car, Package, TrendingUp, TrendingDown,
  CheckCircle2, XCircle, Clock, Navigation, CreditCard,
  ChevronLeft, Activity, Bike, AlertCircle, ArrowUpRight,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface OrderItem {
  id: string;
  trackingId: string;
  customer: string;
  pickup: string;
  drop: string;
  date: string;
  amount: number;
  status: "Completed" | "Cancelled" | "In Transit" | "Pending" | "Failed";
}

interface PaymentRecord {
  id: string;
  date: string;
  amount: number;
  type: string;
  status: "Success" | "Failed";
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const PARTNER = {
  id: "DRV-001",
  name: "Suresh Kumar",
  phone: "+91 98765 43210",
  altPhone: "+91 87654 32109",
  email: "suresh.kumar@example.com",
  address: "Flat 402, Shanti Niwas, Andheri West, Mumbai - 400053",
  vehicle: "Tata Ace",
  vehicleNo: "MH 01 SB 3645",
  vehicleType: "Car" as const,
  photo: "https://api.dicebear.com/7.x/personas/svg?seed=Suresh",
  rating: 4.8,
  totalRatings: 1240,
  isActive: true,
  joinedDate: "Jan 12, 2024",
  aadhar: "XXXX-XXXX-4321",
  pan: "ABCDE1234F",

  // Order stats
  ordersToday: 8,
  ordersWeekly: 47,
  ordersMonthly: 182,
  totalOrders: 2340,
  completedOrders: 2180,
  incompleteOrders: 92,
  pendingOrders: 68,
  currentOrders: 4,
  cancelledOrders: 68,
  failedOrders: 24,

  // Revenue
  totalRevenue: 184200,
  revenueThisMonth: 14800,
  revenueLastMonth: 12400,

  // Route
  currentRoute: {
    from: "Andheri, Mumbai",
    to: "Bandra, Mumbai",
    eta: "12 mins",
    distance: "6.4 km",
    orderId: "#201381",
    customer: "Priya Sharma",
  },
};

const COMPLETED_ORDERS: OrderItem[] = [
  { id: "1", trackingId: "#201238", customer: "Rahul Verma",   pickup: "Andheri, Mumbai",  drop: "Bandra, Mumbai",  date: "Mar 28, 2026", amount: 245, status: "Completed" },
  { id: "2", trackingId: "#201239", customer: "Neha Patil",    pickup: "Kurla, Mumbai",    drop: "Thane, Mumbai",   date: "Mar 27, 2026", amount: 180, status: "Completed" },
  { id: "3", trackingId: "#201240", customer: "Ajay Singh",    pickup: "Dadar, Mumbai",    drop: "Powai, Mumbai",   date: "Mar 26, 2026", amount: 320, status: "Completed" },
  { id: "4", trackingId: "#201241", customer: "Meena Joshi",   pickup: "Borivali, Mumbai", drop: "Malad, Mumbai",   date: "Mar 25, 2026", amount: 150, status: "Completed" },
];

const PENDING_ORDERS: OrderItem[] = [
  { id: "5", trackingId: "#201342", customer: "Kiran Nair",    pickup: "Goregaon, Mumbai", drop: "Andheri, Mumbai", date: "Mar 31, 2026", amount: 410, status: "Pending" },
  { id: "6", trackingId: "#201343", customer: "Vikram Rao",    pickup: "Santacruz, Mumbai",drop: "Kurla, Mumbai",   date: "Mar 31, 2026", amount: 275, status: "Pending" },
  { id: "7", trackingId: "#201344", customer: "Anjali Mehta",  pickup: "Vile Parle, Mumbai",drop: "Dadar, Mumbai",  date: "Mar 31, 2026", amount: 195, status: "Pending" },
];

const INCOMPLETE_ORDERS: OrderItem[] = [
  { id: "8",  trackingId: "#201280", customer: "Deepak Verma",  pickup: "Bandra, Mumbai",  drop: "Thane, Mumbai",   date: "Mar 20, 2026", amount: 300, status: "Cancelled" },
  { id: "9",  trackingId: "#201281", customer: "Sunita More",   pickup: "Malad, Mumbai",   drop: "Powai, Mumbai",   date: "Mar 18, 2026", amount: 220, status: "Failed"    },
  { id: "10", trackingId: "#201282", customer: "Rohit Desai",   pickup: "Kurla, Mumbai",   drop: "Andheri, Mumbai", date: "Mar 15, 2026", amount: 180, status: "Cancelled" },
];

const PAYMENT_HISTORY: PaymentRecord[] = [
  { id: "1", date: "Mar 28, 2026", amount: 2450, type: "Weekly Payout",  status: "Success" },
  { id: "2", date: "Mar 21, 2026", amount: 3120, type: "Weekly Payout",  status: "Success" },
  { id: "3", date: "Mar 14, 2026", amount: 2890, type: "Weekly Payout",  status: "Failed"  },
  { id: "4", date: "Mar 07, 2026", amount: 3340, type: "Weekly Payout",  status: "Success" },
  { id: "5", date: "Feb 28, 2026", amount: 2760, type: "Weekly Payout",  status: "Success" },
  { id: "6", date: "Feb 21, 2026", amount: 1980, type: "Weekly Payout",  status: "Failed"  },
];

// Monthly success/failure graph data
const GRAPH_DATA = [
  { month: "Oct", success: 180, failed: 12 },
  { month: "Nov", success: 210, failed: 8  },
  { month: "Dec", success: 165, failed: 18 },
  { month: "Jan", success: 240, failed: 10 },
  { month: "Feb", success: 195, failed: 15 },
  { month: "Mar", success: 220, failed: 7  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border bg-white dark:bg-[#141414] border-gray-200 dark:border-[#242424] ${className}`}>
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">{children}</h3>;
}

function StatusPill({ status }: { status: OrderItem["status"] }) {
  const cfg: Record<OrderItem["status"], string> = {
    Completed:  "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Cancelled:  "bg-red-100   text-red-700   dark:bg-red-900/30   dark:text-red-400",
    "In Transit":"bg-blue-100  text-blue-700  dark:bg-blue-900/30  dark:text-blue-400",
    Pending:    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    Failed:     "bg-red-100   text-red-700   dark:bg-red-900/30   dark:text-red-400",
  };
  return <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${cfg[status]}`}>{status}</span>;
}

function MiniBarChart() {
  const max = Math.max(...GRAPH_DATA.map((d) => d.success));
  return (
    <div className="flex items-end gap-2 h-24">
      {GRAPH_DATA.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
          <div className="w-full flex flex-col-reverse gap-0.5">
            <div
              className="w-full rounded-t-sm bg-green-400 dark:bg-green-500 transition-all"
              style={{ height: `${(d.success / max) * 72}px` }}
            />
            <div
              className="w-full rounded-t-sm bg-red-300 dark:bg-red-500 transition-all"
              style={{ height: `${(d.failed / max) * 72}px` }}
            />
          </div>
          <span className="text-[9px] text-gray-400 dark:text-zinc-600">{d.month}</span>
        </div>
      ))}
    </div>
  );
}

function OrderRow({ order }: { order: OrderItem }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-100 dark:border-[#1e1e1e] last:border-0">
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-xs font-mono font-bold text-gray-700 dark:text-zinc-300">{order.trackingId}</span>
          <span className="text-[10px] text-gray-400 dark:text-zinc-600">{order.customer}</span>
        </div>
      </div>
      <div className="hidden sm:flex flex-col items-center">
        <span className="text-[10px] text-gray-500 dark:text-zinc-500">{order.pickup}</span>
        <span className="text-[10px] text-gray-400 dark:text-zinc-600">→ {order.drop}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-gray-900 dark:text-zinc-100">₹{order.amount}</span>
        <StatusPill status={order.status} />
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PartnerDetailPage() {
  const [activeOrderTab, setActiveOrderTab] = useState<"completed" | "pending" | "incomplete">("completed");

  const successCount = PAYMENT_HISTORY.filter((p) => p.status === "Success").length;
  const failedCount  = PAYMENT_HISTORY.filter((p) => p.status === "Failed").length;

  return (
    <div className="w-full space-y-5" style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

      {/* ── Back + Title ── */}
      <div className="flex items-center gap-3">
        <button className="w-8 h-8 rounded-xl flex items-center justify-center border border-gray-200 dark:border-[#2a2a2a]
                           text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
          <ChevronLeft size={16} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Partner Details</h1>
          <p className="text-xs text-gray-500 dark:text-zinc-500">Full profile & activity overview</p>
        </div>
      </div>

      {/* ── Row 1: Profile + Stats ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Profile Card */}
        <Card className="p-5 flex flex-col gap-4">
          {/* Avatar + name + status */}
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <img
                src={PARTNER.photo}
                alt={PARTNER.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-gray-100 dark:border-zinc-700"
                onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/thumbs/svg?seed=${PARTNER.id}`; }}
              />
              <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-[#141414] ${PARTNER.isActive ? "bg-green-500" : "bg-gray-400"}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-gray-900 dark:text-white text-base truncate">{PARTNER.name}</h2>
              <span className="text-xs text-gray-500 dark:text-zinc-500">{PARTNER.id}</span>
              <div className="mt-1">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${PARTNER.isActive ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-500 dark:bg-zinc-800 dark:text-zinc-500"}`}>
                  {PARTNER.isActive ? "● Active" : "● Inactive"}
                </span>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-[#1a1a1a]">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} size={13} className={s <= Math.round(PARTNER.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-zinc-600"} />
              ))}
            </div>
            <span className="font-bold text-gray-900 dark:text-white text-sm">{PARTNER.rating}</span>
            <span className="text-[11px] text-gray-400 dark:text-zinc-600">({PARTNER.totalRatings.toLocaleString()} reviews)</span>
          </div>

          {/* Contact details */}
          <div className="flex flex-col gap-2.5">
            {[
              { icon: <Phone size={13}/>, label: PARTNER.phone },
              { icon: <Phone size={13}/>, label: PARTNER.altPhone },
              { icon: <MapPin size={13}/>, label: PARTNER.address },
            ].map((row, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-gray-600 dark:text-zinc-400">
                <span className="text-green-500 mt-0.5 shrink-0">{row.icon}</span>
                <span className="leading-relaxed">{row.label}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100 dark:bg-[#2a2a2a]" />

          {/* Vehicle */}
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-[#1a1a1a]">
            <span className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
              <Car size={15} />
            </span>
            <div>
              <p className="text-xs font-semibold text-gray-800 dark:text-zinc-200">{PARTNER.vehicle}</p>
              <p className="text-[11px] font-mono text-gray-500 dark:text-zinc-500">{PARTNER.vehicleNo}</p>
            </div>
          </div>

          {/* Docs */}
          <div className="grid grid-cols-2 gap-2">
            {[{ label: "Aadhaar", val: PARTNER.aadhar }, { label: "PAN", val: PARTNER.pan }].map((d) => (
              <div key={d.label} className="px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#1a1a1a]">
                <p className="text-[10px] text-gray-400 dark:text-zinc-600">{d.label}</p>
                <p className="text-xs font-mono font-semibold text-gray-700 dark:text-zinc-300">{d.val}</p>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-gray-400 dark:text-zinc-600 text-center">Member since {PARTNER.joinedDate}</p>
        </Card>

        {/* Stats Grid — 2 cols */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3 content-start">
          {[
            { label: "Total Orders",    value: PARTNER.totalOrders.toLocaleString(), icon: <Package size={16}/>,    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"    },
            { label: "Completed",       value: PARTNER.completedOrders.toLocaleString(), icon: <CheckCircle2 size={16}/>, color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" },
            { label: "Pending",         value: PARTNER.pendingOrders,               icon: <Clock size={16}/>,       color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"},
            { label: "Incomplete",      value: PARTNER.incompleteOrders,            icon: <XCircle size={16}/>,     color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"          },
            { label: "Today's Orders",  value: PARTNER.ordersToday,                 icon: <Activity size={16}/>,    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"},
            { label: "Active Routes",   value: PARTNER.currentOrders,               icon: <Navigation size={16}/>,  color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"},
          ].map((s) => (
            <Card key={s.label} className="p-4 flex flex-col gap-2">
              <span className={`w-8 h-8 rounded-xl flex items-center justify-center ${s.color}`}>{s.icon}</span>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{s.value}</p>
              <p className="text-[11px] text-gray-500 dark:text-zinc-500">{s.label}</p>
            </Card>
          ))}

          {/* Revenue card — full width */}
          <Card className="col-span-2 sm:col-span-3 p-4">
            <div className="flex items-center justify-between mb-3">
              <SectionTitle>Total Revenue</SectionTitle>
              <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-semibold">
                <ArrowUpRight size={13}/> +19.4%
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Lifetime",      value: `₹${(PARTNER.totalRevenue / 1000).toFixed(1)}K` },
                { label: "This Month",    value: `₹${(PARTNER.revenueThisMonth / 1000).toFixed(1)}K` },
                { label: "Last Month",    value: `₹${(PARTNER.revenueLastMonth / 1000).toFixed(1)}K` },
              ].map((r) => (
                <div key={r.label} className="px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-[#1a1a1a]">
                  <p className="text-[10px] text-gray-400 dark:text-zinc-600 mb-0.5">{r.label}</p>
                  <p className="text-base font-bold text-gray-900 dark:text-white">{r.value}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Weekly / Monthly */}
          {[
            { label: "Weekly Orders",  value: PARTNER.ordersWeekly,  icon: <TrendingUp size={15}/>,   trend: "+12%" },
            { label: "Monthly Orders", value: PARTNER.ordersMonthly, icon: <TrendingUp size={15}/>,   trend: "+8%"  },
          ].map((s) => (
            <Card key={s.label} className="col-span-1 p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">{s.icon}</span>
                <span className="text-[10px] font-semibold text-green-600 dark:text-green-400">{s.trend}</span>
              </div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{s.value}</p>
              <p className="text-[11px] text-gray-500 dark:text-zinc-500">{s.label}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Row 2: Current Route + Orders ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Current Route */}
        <Card className="p-5">
          <SectionTitle>Current Route</SectionTitle>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900">
              <Navigation size={14} className="text-green-600 dark:text-green-400 shrink-0" />
              <div>
                <p className="text-[10px] text-green-600 dark:text-green-400 font-semibold">LIVE</p>
                <p className="text-xs font-medium text-gray-900 dark:text-white">{PARTNER.currentRoute.orderId}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {[
                { dot: "bg-green-500", label: "From", val: PARTNER.currentRoute.from },
                { dot: "bg-red-500",   label: "To",   val: PARTNER.currentRoute.to   },
              ].map((r) => (
                <div key={r.label} className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${r.dot}`} />
                  <div>
                    <p className="text-[10px] text-gray-400 dark:text-zinc-600">{r.label}</p>
                    <p className="text-xs font-semibold text-gray-800 dark:text-zinc-200">{r.val}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "ETA",      val: PARTNER.currentRoute.eta      },
                { label: "Distance", val: PARTNER.currentRoute.distance },
              ].map((r) => (
                <div key={r.label} className="px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] text-center">
                  <p className="text-[10px] text-gray-400 dark:text-zinc-600">{r.label}</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{r.val}</p>
                </div>
              ))}
            </div>

            <div className="px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#1a1a1a]">
              <p className="text-[10px] text-gray-400 dark:text-zinc-600">Customer</p>
              <p className="text-xs font-semibold text-gray-800 dark:text-zinc-200">{PARTNER.currentRoute.customer}</p>
            </div>
          </div>
        </Card>

        {/* Orders Tabs */}
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <SectionTitle>Order History</SectionTitle>
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-[#1a1a1a] rounded-xl p-1">
              {(["completed", "pending", "incomplete"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveOrderTab(t)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-semibold capitalize transition-all ${
                    activeOrderTab === t
                      ? "bg-white dark:bg-[#242424] text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-500 dark:text-zinc-500 hover:text-gray-700 dark:hover:text-zinc-300"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            {activeOrderTab === "completed" && COMPLETED_ORDERS.map((o) => <OrderRow key={o.id} order={o} />)}
            {activeOrderTab === "pending"   && PENDING_ORDERS.map((o)    => <OrderRow key={o.id} order={o} />)}
            {activeOrderTab === "incomplete"&& INCOMPLETE_ORDERS.map((o) => <OrderRow key={o.id} order={o} />)}
          </div>
        </Card>
      </div>

      {/* ── Row 3: Payment History + Success/Failure Graph ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Payment History */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <SectionTitle>Payment History</SectionTitle>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[10px] text-green-600 dark:text-green-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-green-500" /> {successCount} Success
              </span>
              <span className="flex items-center gap-1 text-[10px] text-red-500 dark:text-red-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-red-500" /> {failedCount} Failed
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-0.5">
            {PAYMENT_HISTORY.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2.5 border-b border-gray-100 dark:border-[#1e1e1e] last:border-0">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    p.status === "Success"
                      ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100   text-red-600   dark:bg-red-900/30   dark:text-red-400"
                  }`}>
                    <CreditCard size={14} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-gray-800 dark:text-zinc-200">{p.type}</p>
                    <p className="text-[10px] text-gray-400 dark:text-zinc-600">{p.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-900 dark:text-zinc-100">₹{p.amount.toLocaleString()}</span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                    p.status === "Success"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100   text-red-700   dark:bg-red-900/30   dark:text-red-400"
                  }`}>
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Success / Failure Graph */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <SectionTitle>Orders Success vs Failure</SectionTitle>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-[10px] text-gray-500 dark:text-zinc-500">
                <span className="w-2.5 h-2.5 rounded-sm bg-green-400" /> Success
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-gray-500 dark:text-zinc-500">
                <span className="w-2.5 h-2.5 rounded-sm bg-red-300" /> Failed
              </span>
            </div>
          </div>

          <MiniBarChart />

          {/* Summary row */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { label: "Avg Success", val: `${Math.round(GRAPH_DATA.reduce((a, d) => a + d.success, 0) / GRAPH_DATA.length)}`, color: "text-green-600 dark:text-green-400" },
              { label: "Avg Failed",  val: `${Math.round(GRAPH_DATA.reduce((a, d) => a + d.failed,   0) / GRAPH_DATA.length)}`, color: "text-red-500 dark:text-red-400"     },
              { label: "Success Rate",val: `${Math.round((GRAPH_DATA.reduce((a, d) => a + d.success, 0) / (GRAPH_DATA.reduce((a, d) => a + d.success + d.failed, 0))) * 100)}%`, color: "text-blue-600 dark:text-blue-400" },
            ].map((s) => (
              <div key={s.label} className="px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] text-center">
                <p className={`text-base font-bold ${s.color}`}>{s.val}</p>
                <p className="text-[10px] text-gray-400 dark:text-zinc-600 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Total orders breakdown */}
          <div className="mt-4 p-3 rounded-xl bg-gray-50 dark:bg-[#1a1a1a]">
            <p className="text-[11px] font-semibold text-gray-600 dark:text-zinc-400 mb-2">Total Orders Breakdown</p>
            <div className="flex flex-col gap-1.5">
              {[
                { label: "Completed",   val: PARTNER.completedOrders, color: "bg-green-500", pct: Math.round((PARTNER.completedOrders / PARTNER.totalOrders) * 100) },
                { label: "Pending",     val: PARTNER.pendingOrders,   color: "bg-yellow-400", pct: Math.round((PARTNER.pendingOrders / PARTNER.totalOrders) * 100) },
                { label: "Incomplete",  val: PARTNER.incompleteOrders,color: "bg-red-400",    pct: Math.round((PARTNER.incompleteOrders / PARTNER.totalOrders) * 100) },
                { label: "Cancelled",   val: PARTNER.cancelledOrders, color: "bg-gray-400",   pct: Math.round((PARTNER.cancelledOrders / PARTNER.totalOrders) * 100) },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-500 dark:text-zinc-500 w-20 shrink-0">{b.label}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-gray-200 dark:bg-zinc-700 overflow-hidden">
                    <div className={`h-full rounded-full ${b.color}`} style={{ width: `${b.pct}%` }} />
                  </div>
                  <span className="text-[10px] font-mono text-gray-600 dark:text-zinc-400 w-8 text-right">{b.val}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}