"use client";

import { useEffect, useState } from "react";
import {
  TrendingUp, TrendingDown, Download, ArrowUpRight,
  Mail, MousePointer, UserPlus, AlertCircle, UserMinus,
  MailOpen, Ticket, Clock, MessageCircle,
} from "lucide-react";
import { RiCalendarLine } from "react-icons/ri";
import { AnalyticsStatsCards, DriverstatCards } from "@/Data/mockdata";
import StatCardComponent from "@/Component/dashboards/StatCard";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatCard { label: string; value: string; change: number; }
interface EarningRow { label: string; icon: string; amount: number; color: string; max: number; }
interface BarPoint { day: string; value: number; }
interface AreaPoint { month: string; value: number; target: number; }
interface LinePoint { x: number; y: number; }
interface CampaignRow { label: string; value: string | number; change: number; icon: React.ReactNode; highlight?: boolean; }
interface TicketStat { label: string; value: number; icon: React.ReactNode; color: string; }

// ─── Dummy Data ───────────────────────────────────────────────────────────────

// const STAT_CARDS: StatCard[] = [
//   { label: "Daily active users", value: "3,450", change: 7.7 },
//   { label: "Weekly sessions", value: "1,342", change: -9.8 },
//   { label: "Duration", value: "5.2 min", change: 7.7 },
//   { label: "Conversion Rate", value: "2.8%", change: 4.3 },
// ];

const EARNING_BARS: BarPoint[] = [
  { day: "Mon", value: 60 }, { day: "Tue", value: 80 }, { day: "Wed", value: 45 },
  { day: "Thu", value: 70 }, { day: "Fri", value: 55 }, { day: "Sat", value: 90 }, { day: "Sun", value: 85 },
];

const EARNING_ROWS: EarningRow[] = [
  { label: "Earnings", icon: "₹", amount: 545.67, color: "#84cc16", max: 100 },
  { label: "Profit", icon: "₹", amount: 256.34, color: "#84cc16", max: 70 },
  { label: "Expense", icon: "₹", amount: 74.19, color: "#ef4444", max: 30 },
];

const DAILY_SALES_LINE: LinePoint[] = [
  { x: 0, y: 60 }, { x: 1, y: 45 }, { x: 2, y: 70 }, { x: 3, y: 40 }, { x: 4, y: 80 }, { x: 5, y: 55 }, { x: 6, y: 75 }, { x: 7, y: 50 }, { x: 8, y: 90 }, { x: 9, y: 100 },
];

const TOTAL_EARNING_BARS: AreaPoint[] = [
  { month: "Jan", value: 40, target: 70 }, { month: "Feb", value: 70, target: 90 },
  { month: "Mar", value: 55, target: 80 }, { month: "Apr", value: 35, target: 65 },
  { month: "May", value: 60, target: 85 }, { month: "Jun", value: 50, target: 75 },
];

const CAMPAIGN_ROWS: CampaignRow[] = [
  { label: "Emails", value: "1.503", change: -0.3, icon: <Mail size={18} /> },
  { label: "Opened", value: "6.043", change: 2.1, icon: <MailOpen size={18} /> },
  { label: "Clicked", value: "600", change: -2.1, icon: <MousePointer size={18} /> },
  { label: "Subscribe", value: "490", change: 8.5, icon: <UserPlus size={18} />, highlight: true },
  { label: "Complaints", value: "490", change: 4.5, icon: <AlertCircle size={18} /> },
  { label: "Unsubscribe", value: "1.2", change: -0.5, icon: <UserMinus size={18} /> },
];

const TICKET_STATS: TicketStat[] = [
  { label: "New Tickets", value: 40, icon: <Ticket size={14} />, color: "#84cc16" },
  { label: "Open Tickets", value: 25, icon: <Clock size={14} />, color: "#f97316" },
  { label: "Response Time", value: 1, icon: <MessageCircle size={14} />, color: "#84cc16" },
];




// ─── SVG Helpers ──────────────────────────────────────────────────────────────

function BarChart({ data }: { data: BarPoint[] }) {
  const max = Math.max(...data.map((d) => d.value));

  const H = 140;
  const gap = 4;
  const bw = 100 / data.length - gap;
  const W = 100;

  return (
    <svg
      viewBox={`0 0 ${W} ${H + 24}`}
      className="w-full h-[140px] sm:h-[160px] lg:h-[200px]"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="60%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#052e16" />
        </linearGradient>
      </defs>

      {data.map((d, i) => {
        const bh = (d.value / max) * H;
        const x = i * (bw + gap);
        const y = H - bh;

        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={bw}
              height={bh}
              rx="2"
              fill="url(#barGrad)"
            />
            <text
              x={x + bw / 1.5}
              y={H + 17}
              textAnchor="middle"
              fontSize="5"
              fill="#9ca3af"
            >
              {d.day}
            </text>
          </g>
        );
      })}
    </svg>
  );
}





function AreaChart({ data }: { data: LinePoint[] }) {
  const W = 400, H = 100;
  const xs = data.map((_, i) => (i / (data.length - 1)) * W);
  const ys = data.map((d) => H - d.y);
  const line = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x},${ys[i]}`).join(" ");
  const area = `${line} L${W},${H} L0,${H} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-28" preserveAspectRatio="none">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#21C18E" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#84cc16" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#areaGrad)" />
      <path d={line} fill="none" stroke="#84cc16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DonutChart({ pct }: { pct: number }) {
  const r = 60, cx = 80, cy = 80, circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg viewBox="0 0 160 160" className="w-36 h-36">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth="30" className="dark:[stroke:#2a2a2a]" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#21C18E" strokeWidth="25"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`} />
      <text className="dark:text-white" x={cx} y={cy - 4} textAnchor="middle" fontSize="20" fontWeight="bold" fill="currentColor">{pct}%</text>
      <text className="dark:text-gray-300" x={cx} y={cy + 14} textAnchor="middle" fontSize="9" fill="currentColor" opacity="0.5">Completed</text>
    </svg>
  );
}

function StackedBar({ data }: { data: AreaPoint[] }) {
  const W = 220, H = 110;
  const bw = 30, gap = (W - data.length * bw) / (data.length + 1);
  return (
    <svg viewBox={`0 0 ${W} ${H + 18}`} className="w-full h-32">
      {data.map((d, i) => {
        const x = gap + i * (bw + gap);
        const tgtH = (d.target / 100) * H;
        const valH = (d.value / 100) * H;
        return (
          <g key={i}>
            {/* grey background bar */}
            <rect x={x} y={H - tgtH} width={bw} height={tgtH} rx="4" fill="#d1d5db" className="dark:fill-zinc-700" />
            {/* green value bar */}
            <rect x={x} y={H - valH} width={bw} height={valH} rx="4" fill="#21C18E" />
            <text x={x + bw / 2} y={H + 13} textAnchor="middle" fontSize="8" fill="currentColor" opacity="0.5">{d.month}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[10px] border bg-white dark:bg-[#141414] border-gray-200 dark:border-[#242424] ${className}`}>
      {children}
    </div>
  );
}

function ChangePill({ change }: { change: number }) {
  const pos = change >= 0;
  return (
    <span className={`inline-flex border gap-0.5 px-2 py-0.5 rounded-[12px] text-[10px] font-semibold
                      ${pos
        ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
        : "bg-red-100   text-red-700   dark:bg-red-900/40   dark:text-red-400"
      }`}>
      {pos ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
      {pos ? "+" : ""}{change}%
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Analytics() {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "long",
        year: "numeric",
        // hour: "2-digit",
        // minute: "2-digit",
        hour12: true,
      });
      setDateTime(formatted);
    };

    updateDateTime(); // initial call

    // const interval = setInterval(updateDateTime, 60000); // every 1 min

    // return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full space-y-4" style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-gray-900 dark:text-white">Website Analytics</h1>
        </div>
        {/* <div className="flex items-center gap-2.5"> */}
        <div className="flex dark:bg-[#1d1d22] items-center gap-3">
          <button className="flex dark:text-gray-300 font-medium items-center gap-2 text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors">
            <RiCalendarLine size={14} />
            <span className="hidden sm:inline">{dateTime}</span>
          </button>
        </div>
        {/* <button className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-semibold
                             bg-gray-900 dark:bg-white text-white dark:text-gray-900
                             hover:opacity-90 transition-opacity">
            <Download size={13}/> Download
          </button> */}
        {/* </div> */}
      </div>

      {/* ── Stat Cards Row ── */}
      {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-3"> */}
      {/* {STAT_CARDS.map((s) => (
          <Card key={s.label} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 dark:text-zinc-500">{s.label}</span>
              <ChangePill change={s.change} />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
          </Card>
        ))} */}
      {/* </div> */}


      <div className="grid grid-cols-2 mb-5  lg:grid-cols-4 gap-4">
        {AnalyticsStatsCards.map((card) => (
          <StatCardComponent key={card.id} card={card} />
        ))}
      </div>



      {/* ── Row 2: Earning Reports + Donut+Tickets ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Earning Reports — 2 cols */}
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Earning Reports</h2>
              <p className="text-[11px] text-gray-400 dark:text-zinc-600">Last 28 days</p>
            </div>
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border
                               text-gray-600 dark:text-zinc-400 border-gray-200 dark:border-[#2a2a2a]
                               hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
              <Download size={12} /> Export
            </button>
          </div>

          <div className="flex ">
            {/* Bar chart */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl font-medium text-gray-900 dark:text-white">
                  ₹{1.468}
                </span>
                <ChangePill change={4.2} />
              </div>
              <BarChart data={EARNING_BARS} />
            </div>

            {/* Earning rows */}
            <div className="flex flex-col mt-5.5 gap-2 w-85 shrink-0">
              {EARNING_ROWS.map((row) => (
                <div key={row.label} className="p-4 rounded-xl border border-gray-100 dark:border-[#2a2a2a] bg-gray-50 dark:bg-[#1a1a1a]">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold"
                        style={{ background: row.color + "22", color: row.color }}>
                        {row.icon}
                      </span>
                      <span className="text-xs font-medium text-gray-700 dark:text-zinc-300">{row.label}</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-800 dark:text-zinc-200">₹ {row.amount}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-gray-200 dark:bg-zinc-700 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${row.max}%`, background: row.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Donut + Ticket stats — 1 col */}
        <Card className="p-5 flex flex-col gap-4">
          {/* Donut */}
          <div className="flex justify-center">
            <DonutChart pct={88} />
          </div>
          {/* Divider */}
          <div className="h-px bg-gray-100 dark:bg-[#2a2a2a]" />
          {/* Ticket stats */}
          <div className="flex items-center justify-between">
            {TICKET_STATS.map((t, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: t.color + "22", color: t.color }}>
                  {t.icon}
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{t.value}</span>
                <span className="text-[10px] text-gray-400 dark:text-zinc-600 text-center leading-tight">{t.label}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── Row 3: Average Daily Sales + Sales Overview ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Average Daily Sales */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Average Daily Sales</h2>
            <TrendingDown size={16} className="text-red-400" />
          </div>
          <p className="text-3xl font-medium text-gray-900 dark:text-white mb-3">28,450</p>
          <AreaChart data={DAILY_SALES_LINE} />
        </Card>

        {/* Sales Overview */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Sales Overview</h2>
            <ArrowUpRight size={16} className="text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-700 mb-4">₹42.5K</p>

          {/* Orders vs Visits labels */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-800 dark:bg-zinc-500 text-white">62.2%</span>
              <span className="text-xs text-gray-500 dark:text-zinc-500">Orders</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-zinc-500">Visits</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-800 dark:bg-zinc-700 text-white">25.5%</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-3 rounded-full overflow-hidden flex">
            <div className="h-full bg-red-500" style={{ width: "62.2%" }} />
            <div className="h-full bg-green-500" style={{ width: "25.5%" }} />
            <div className="h-full bg-gray-200 dark:bg-zinc-700 flex-1" />
          </div>

          {/* Spacer to fill height */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { label: "Total Orders", value: "12.4K", change: 8.2 },
              { label: "Revenue", value: "₹38K", change: 3.5 },
              { label: "Refunds", value: "₹1.2K", change: -2.1 },
            ].map((s) => (
              <div key={s.label} className="p-3 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#2a2a2a]">
                <p className="text-[10px] text-gray-400 dark:text-zinc-400 mb-1">{s.label}</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{s.value}</p>
                <ChangePill change={s.change} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── Row 4: Total Earning + Monthly Campaign ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Total Earning */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Total Earning</h2>
            <ChangePill change={24.2} />
          </div>
          <p className="text-3xl font-bold text-green-700  mb-4">83%</p>

          <StackedBar data={TOTAL_EARNING_BARS} />

          <div className="h-px bg-gray-100 dark:bg-[#2a2a2a] my-4" />

          {/* Revenue + Sales rows */}
          {[
            { label: "Total Revenue", sub: "Client Payment", change: "+₹126", pos: true, icon: "💳", bg: "bg-red-500" },
            { label: "Total Sales", sub: "Refund", change: "- ₹98", pos: false, icon: "₹", bg: "bg-indigo-500" },
          ].map((row) => (
            <div key={row.label} className="flex  justify-between py-2.5">
              <div className="flex r gap-3">
                <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold ${row.bg}`}>
                  {row.icon}
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-zinc-200">{row.label}</p>
                  <p className="text-[11px] text-gray-400 dark:text-zinc-600">{row.sub}</p>
                </div>
              </div>
              <span className={`text-sm font-semibold ${row.pos ? "text-green-500" : "text-red-500"}`}>{row.change}</span>
            </div>
          ))}
        </Card>



        {/* Monthly Campaign State */}
        {/* <Card className="p-5">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Monthly Campaign State</h2>
          <p className="text-[11px] text-gray-400 dark:text-zinc-600 mb-4">8.5K social visitors</p>

          <div className="flex flex-col gap-1">
            {CAMPAIGN_ROWS.map((row) => {
              const pos = row.change >= 0;
              return (
                <div key={row.label} className="flex items-center justify-between py-2.5
                                                border-b border-gray-100 dark:border-[#1e1e1e] last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl flex items-center justify-center
                                     bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400 shrink-0">
                      {row.icon}
                    </span>
                    <span className={`text-sm font-medium ${row.highlight
                      ? "text-lime-600 dark:text-lime-400 underline underline-offset-2"
                      : "text-gray-800 dark:text-zinc-200"
                      }`}>
                      {row.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-900 dark:text-zinc-100 w-12 text-right">
                      {row.value}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold min-w-[46px] text-center
                                      ${pos
                        ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                        : "bg-red-100   text-red-700   dark:bg-red-900/40   dark:text-red-400"
                      }`}>
                      {pos ? "+" : ""}{row.change}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card> */}



      </div>

    </div>
  );
}