// import { FaShoppingCart, FaStar } from "react-icons/fa";
// import ReactSpeedometer from "react-d3-speedometer";
// import { IoMdCar } from "react-icons/io";
// import { FiMapPin, FiMoreVertical, FiPhone } from "react-icons/fi";
// import { useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// export default function PartnerDetailsPage() {
//   const [year, setYear] = useState("2026");

//   const years = Array.from({ length: 10 }, (_, i) => 2026 - i);

//   const data = [
//     { name: "Jan", orders: 70, completion: 60 },
//     { name: "Feb", orders: 80, completion: 65 },
//     { name: "Mar", orders: 85, completion: 70 },
//     { name: "Apr", orders: 78, completion: 68 },
//     { name: "May", orders: 90, completion: 75 },
//     { name: "Jun", orders: 88, completion: 72 },
//   ];

//   const stats = [
//     { title: "Total Orders", value: "2,349", icon: <FaShoppingCart /> },
//     { title: "Completed Orders", value: "25", icon: <FaShoppingCart /> },
//     { title: "Active Routes", value: "10", icon: <FaShoppingCart /> },
//     { title: "Today's Orders", value: "9", icon: <FaShoppingCart /> },
//   ];
//    const payments = Array(6).fill({
//     id: "#201238",
//     payout: "Today Payout",
//     name: "Santo jadhv",
//     date: "2026-03-01",
//     time: "04:28:48",
//     amount: "₹295.81",
//     status: "Completed",
//   });

//   const [activeFilter, setActiveFilter] = useState("Completed");

//   const orders = [
//     {
//       id: "#201238",
//       name: "Goodwill James",
//       email: "berlin@mail.com",
//       pickup: "Kawasaki City, Cla...",
//       pickupDate: "Feb 01, 2026",
//       drop: "Asaba Airport...",
//       dropDate: "Dec 11, 2026",
//       distance: "10km",
//       status: "Cancelled",
//     },
//     {
//       id: "#201238",
//       name: "Goodwill James",
//       email: "berlin@mail.com",
//       pickup: "Fukoria, Airport...",
//       pickupDate: "Mar 06, 2026",
//       drop: "Asaba Airport...",
//       dropDate: "Dec 11, 2026",
//       distance: "5km",
//       status: "On Time",
//     },
//     {
//       id: "#201238",
//       name: "Goodwill James",
//       email: "berlin@mail.com",
//       pickup: "Kawasaki City, Cla...",
//       pickupDate: "Feb 01, 2026",
//       drop: "Asaba Airport...",
//       dropDate: "Dec 11, 2026",
//       distance: "4km",
//       status: "In Transit",
//     },
//     {
//       id: "#201238",
//       name: "Goodwill James",
//       email: "berlin@mail.com",
//       pickup: "Kawasaki City, Cla...",
//       pickupDate: "Feb 01, 2026",
//       drop: "Asaba Airport...",
//       dropDate: "Dec 11, 2026",
//       distance: "4km",
//       status: "On Time",
//     },
//   ];

//   const getStatusStyle = (status: string) => {
//     if (status === "Cancelled")
//       return "bg-red-500 text-white";
//     if (status === "On Time")
//       return "bg-green-600 text-white";
//     if (status === "In Transit")
//       return "bg-purple-600 text-white";
//     return "bg-gray-400 text-white";
//   };
//   const detail = [
//     {
//       id: "#201238",
//       name: "Ravi Shrma",
//       address:
//         "Flat 402, Shanti Niwas, Andheri West, Mumbai",
//       date: "March 7, 2026 – 09:15 AM",
//     },
//     {
//       id: "#201238",
//       name: "Ravi Shrma",
//       address:
//         "Flat 402, Shanti Niwas, Andheri West, Mumbai",
//       date: "March 7, 2026 – 09:15 AM",
//     },
//     {
//       id: "#201238",
//       name: "Ravi Shrma",
//       address:
//         "Flat 402, Shanti Niwas, Andheri West, Mumbai",
//       date: "March 7, 2026 – 09:15 AM",
//     },
//   ];
 
//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-lg font-semibold mb-4">
//         Delivery Partner Details
//       </h2>

//       {/* MAIN FLEX */}
//       <div className="flex gap-4 items-start">

//         {/* LEFT SIDE */}
//         <div className="flex-1">

//           {/* STATS */}
//           <div className="grid grid-cols-4 gap-4 mb-6">
//             {stats.map((item, i) => (
//               <div
//                 key={i}
//                 className="relative bg-white p-4 rounded-xl border shadow-sm"
//               >
//                 <div className="absolute top-3 right-3">
//                   {item.icon}
//                 </div>
//                 <h3 className="text-lg font-bold">{item.value}</h3>
//                 <h4 className="text-sm text-green-500">{item.title}</h4>
                
//               </div>
//             ))}
//           </div>

//           {/* PERFORMANCE + SATISFACTION */}
//           <div className="grid grid-cols-2 gap-4">

//             {/* PERFORMANCE */}
//             <div className="bg-white p-4 rounded-xl border shadow-sm">
//               <div className="flex justify-between items-center mb-3">
//                 <h3 className="font-semibold">Performance</h3>

//                 <select
//                   value={year}
//                   onChange={(e) => setYear(e.target.value)}
//                   className="bg-green-100 px-3 py-2 rounded-lg text-sm outline-none cursor-pointer"
//                 >
//                   {years.map((y) => (
//                     <option key={y} value={y}>
//                       {y}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <ResponsiveContainer width="100%" height={250}>
//                 <BarChart data={data}>
//                   <XAxis dataKey="name" />
//                   <Tooltip />

//                   <Bar
//                     dataKey="orders"
//                     fill="#166534"
//                     radius={[6, 6, 0, 0]}
//                   />
//                   <Bar
//                     dataKey="completion"
//                     fill="#4ade80"
//                     radius={[6, 6, 0, 0]}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>

//               {/* LEGEND */}
//               <div className="flex justify-around mt-4 text-sm text-gray-600">
//                 <div className="flex flex-col items-center gap-1">
//                   <span className="w-8 h-2 bg-green-900 rounded-full"></span>
//                   <p>Order</p>
//                 </div>

//                 <div className="flex flex-col items-center gap-1">
//                   <span className="w-8 h-2 bg-green-400 rounded-full"></span>
//                   <p>Completion</p>
//                 </div>
//               </div>
//             </div>

//             {/* EMPLOYEE SATISFACTION */}
//             <div className="bg-white p-3 rounded-xl border shadow-sm">
//               <h3 className="font-semibold mb-3">
//                 Employee Satisfaction
//               </h3>

//               <div className="flex justify-between">
//                 <div>
//                   <h2 className="text-2xl font-bold">73%</h2>
//                   <p className="text-sm text-gray-500">
//                     Client Satisfied
//                   </p>
//                 </div>

//                 {/* SPEEDOMETER */}
//                 <div className="relative w-[250px] -mt-6">
//                   <ReactSpeedometer
//                     value={73}
//                     minValue={0}
//                     maxValue={100}
//                     segments={2}
//                     segmentColors={["#34d399", "#d9f99d"]}
//                     needleColor="#064e3b"
//                     needleHeightRatio={0.7}
//                     ringWidth={20}
//                     width={250}
//                     height={150}
//                     currentValueText=""
//                     valueTextFontSize="0px"
//                     labelFontSize="0px"
//                   />
//                 </div>
//               </div>

//               {/* MESSAGE */}
//               <div className="bg-green-100 text-sm px-4 py-2 rounded-full mt-4 text-gray-700">
//                 That’s an
//                 <span className="font-semibold">increase of 6%</span>
//                 from last month
//               </div>

//               {/* RATINGS */}
//             {[
//   { title: "Good Ride", percent: "78%", rating: 4.2 },
//   { title: "Time save", percent: "78%", rating: 4.2 },
//   { title: "Work-Life Balance", percent: "71%", rating: 4.2 },
//   { title: "Career Growth Opportunities", percent: "68%", rating: 4.2 },
//   { title: "Compensation & Benefits", percent: "78%", rating: 4.2 },
// ].map((item, i) => (
//   <div
//     key={i}
//     className="flex justify-between items-center mt-3"
//   >

//     {/* LEFT */}
//     <div>
//       <p className="text-sm font-medium">{item.title}</p>
//       <p className="text-xs text-gray-500">
//         {item.percent} Satisfaction
//       </p>
//     </div>

//     {/* RIGHT (⭐ RATING SECTION) */}
//     <div className="flex items-center gap-2">

//       {/* ⭐ STARS */}
//       <div className="flex text-yellow-400 text-sm">
//         {[...Array(5)].map((_, index) => (
//           <FaStar
//             key={index}
//             className={
//               index < Math.floor(item.rating)
//                 ? "text-yellow-400"
//                 : "text-gray-300"
//             }
//           />
//         ))}
//       </div>

//       {/* RATING VALUE */}
//       <p className="text-sm text-gray-600">
//         {item.rating}/5
//       </p>

//     </div>

//   </div>
// ))}
//               <div className="flex items-center justify-between p-2 rounded-xl border-2 border-gray-400 bg-white shadow-sm">

//       {/* LEFT SIDE */}
//       <div>
//         {/* NAME */}
//         <h3 className="font-semibold text-sm">
//           Suresh Kumar
//         </h3>

//         {/* RATING */}
//         <div className="flex items-center gap-2 ">
          
//           {/* STARS */}
//           <div className="flex text-yellow-400 text-sm">
//             {[...Array(5)].map((_, i) => (
//               <FaStar key={i} />
//             ))}
//           </div>

//           {/* TEXT */}
//           <p className="text-sm text-gray-600">
//             4.8 (1,240 reviews)
//           </p>

//         </div>
//       </div>

//       {/* RIGHT ICON */}
//       <div className="text-xl">
//         📦
//       </div>

//     </div>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SIDE → PROFILE */}
//         <div className="w-[320px]">
//           <div className="bg-white p-4 rounded-2xl border shadow-sm">
//             <h3 className="font-semibold ">Profile</h3>

//             <div className="flex gap-4 items-center mb-1">
//               <img
//                 src={"/assets/hero.png"}
//                 className="w-10 h-10 rounded-full"
//               />
//               <div>
//                 <h2 className="font-semibold">Suresh Kumar</h2>
//                 <p className="text-sm">DRV-001</p>
//                 <p className="text-green-500">Active</p>
//               </div>
//             </div>

//             <p className="text-sm mb-1">
//               ⭐⭐⭐⭐⭐ 4.8 (1,240 reviews)
//             </p>

//             <div className="flex items-center gap-2 text-sm mb-1">
//               <FiPhone className="text-green-600" />
//               <p>+91 98765 43210</p>
//             </div>

//             <div className="flex items-center gap-2 text-sm mb-1">
//               <FiMapPin className="text-green-600" />
//               <p>
//                 Clover Hill Plaza, NIBM Road, Kondhwa, Pune
//               </p>
//             </div>

//             <h3 className="font-semibold mb-2">
//               Vehicle Details
//             </h3>

//             <div className="bg-gray-200 rounded-lg flex items-center gap-3 ">
//               <div className="bg-green-300 p-2 rounded-md">
//                 <IoMdCar className="text-green-700" />
//               </div>
//               <p className="text-sm font-medium">
//                 Tata Ace - MH 01 SB 3645
//               </p>
//             </div>

//             {/* DOCUMENTS */}
//             <div className="grid grid-cols-2 gap-3 mt-2">
//               <div className="bg-gray-200 p-2 rounded-lg">
//                 <p className="text-xs text-gray-500">Documents</p>
//                 <p className="text-sm ">
//                   XXXX-XXXX-4321
//                 </p>
//               </div>

//               <div className="bg-gray-200 p-2  rounded-lg">
//                 <p className="text-xs text-gray-500">PAN</p>
//                 <p className="text-xs ">
//                   ABCDE1234F
//                 </p>
//               </div>
//             </div>
//              <h3 className="text-base font-semibold mb-2">
//         Recent Orders
//       </h3>

//       {/* LIST */}
//       <div className="space-y-2">
//         {detail.map((detail, i) => (
//           <div key={i} className="flex gap-4 items-start">

//             {/* AVATAR */}
//             <img
//               src="/assets/hero.png"
//               alt="profile"
//               className="w-6 h-8 rounded-full object-cover"
//             />

//             {/* DETAILS */}
//             <div>
//               <h4 className="font-medium">
//                 {detail.id} {detail.name},
//               </h4>

//               <p className="text-sm text-gray-600">
//                 {detail.address}
//               </p>

//               <p className="text-sm text-gray-500">
//                 {detail.date}
//               </p>
//             </div>

//           </div>
//         ))}
//       </div>

//           </div>
//         </div>

//       </div>
//  <div className="bg-white p-4 rounded-2xl border shadow-sm mt-4">

//       {/* TITLE */}
//       <h3 className="font-semibold mb-4">Payment History</h3>

//       {/* TABLE */}
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm">

//           {/* HEADER */}
//           <thead>
//             <tr className="bg-green-600 text-white text-left rounded-lg">
//               <th className="p-3 rounded-l-lg"></th>
//               <th className="p-3">Tracking ID</th>
//               <th className="p-3">Payout</th>
//               <th className="p-3">Client Name</th>
//               <th className="p-3">Date & Time</th>
//               <th className="p-3">Amount</th>
//               <th className="p-3">Status</th>
//               <th className="p-3 rounded-r-lg">Action</th>
//             </tr>
//           </thead>

//           {/* BODY */}
//           <tbody>
//             {payments.map((item, i) => (
//               <tr
//                 key={i}
//                 className="border-b border-dashed hover:bg-gray-50 transition"
//               >
//                 {/* CHECKBOX */}
//                 <td className="p-3">
//                   <input type="checkbox" />
//                 </td>

//                 {/* TRACKING ID */}
//                 <td className="p-3 font-medium">{item.id}</td>

//                 {/* PAYOUT */}
//                 <td className="p-3">{item.payout}</td>

//                 {/* NAME */}
//                 <td className="p-3">{item.name}</td>

//                 {/* DATE */}
//                 <td className="p-3">
//                   <div>
//                     <p>{item.date}</p>
//                     <p className="text-xs text-gray-400">
//                       {item.time}
//                     </p>
//                   </div>
//                 </td>

//                 {/* AMOUNT */}
//                 <td className="p-3">{item.amount}</td>

//                 {/* STATUS */}
//                 <td className="p-3">
//                   <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-md">
//                     {item.status}
//                   </span>
//                 </td>

//                 {/* ACTION */}
//                 <td className="p-3">
//                   <FiMoreVertical className="cursor-pointer" />
//                 </td>
//               </tr>
//             ))}
//           </tbody>

//         </table>
//       </div>

//     </div>
 
//   <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200 mt-5">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg font-semibold">Order History</h3>

//         {/* FILTER BUTTONS */}
//       <div>
//   <select
//     value={activeFilter}
//     onChange={(e) => setActiveFilter(e.target.value)}
//     className="bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm outline-none cursor-pointer"
//   >
//     <option value="Completed">Completed</option>
//     <option value="Pending">Pending</option>
//     <option value="Incomplete">Incomplete</option>
//   </select>
// </div>
//       </div>

//       {/* TABLE */}
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm">

//           {/* HEADER */}
//           <thead>
//             <tr className="bg-green-600 text-white text-left rounded-lg">
//               <th className="p-3 rounded-l-lg"></th>
//               <th className="p-3">Order ID</th>
//               <th className="p-3">Customer</th>
//               <th className="p-3">Pick up</th>
//               <th className="p-3">Drop Point</th>
//               <th className="p-3">Pick up</th>
//               <th className="p-3 rounded-r-lg">Status</th>
//             </tr>
//           </thead>

//           {/* BODY */}
//           <tbody>
//             {orders.map((item, i) => (
//               <tr
//                 key={i}
//                 className="border-b border-dashed hover:bg-gray-50 transition"
//               >
//                 {/* CHECKBOX */}
//                 <td className="p-3">
//                   <input type="checkbox" />
//                 </td>

//                 {/* ID */}
//                 <td className="p-3 font-medium">{item.id}</td>

//                 {/* CUSTOMER */}
//                 <td className="p-3">
//                   <p className="font-medium">{item.name}</p>
//                   <p className="text-xs text-gray-400">
//                     {item.email}
//                   </p>
//                 </td>

//                 {/* PICKUP */}
//                 <td className="p-3">
//                   <p>{item.pickup}</p>
//                   <p className="text-xs text-gray-400">
//                     {item.pickupDate}
//                   </p>
//                 </td>

//                 {/* DROP */}
//                 <td className="p-3">
//                   <p>{item.drop}</p>
//                   <p className="text-xs text-gray-400">
//                     {item.dropDate}
//                   </p>
//                 </td>

//                 {/* DISTANCE */}
//                 <td className="p-3 font-medium">
//                   {item.distance}
//                 </td>

//                 {/* STATUS */}
//                 <td className="p-3">
//                   <span
//                     className={`px-3 py-1 text-xs rounded-md ${getStatusStyle(
//                       item.status
//                     )}`}
//                   >
//                     {item.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>

//         </table>
//       </div>
//     </div>
//     </div>
//   );
// }










"use client";

// ─── Types matching your API response ─────────────────────────────────────────

interface TransactionClient {
  id: string;
  name: string;
  mobile: string;
}

interface TransactionDriver {
  id: string;
  name: string;
  mobile: string;
}

interface WalletTransactionMeta {
  fare: number;
  method: string;
  platformFee: number;
}

interface WalletTransaction {
  id: string;
  walletId: string;
  driverId: string;
  paymentDoneById: string;
  paymentId: string;
  amount: number;
  type: "CREDIT" | "DEBIT";
  direction: "IN" | "OUT";
  referenceId: string;
  description: string;
  meta: WalletTransactionMeta;
  createdById: string | null;
  createdByType: string;
  createdAt: string;
}

interface TransactionDetail {
  id: string;
  trackingId: string;
  amount: number;
  status: "SUCCESS" | "FAILED" | "PENDING" | "PROCESSING";
  method: string;
  provider: string;
  createdAt: string;
  client: TransactionClient;
  driver: TransactionDriver;
  walletTransactions: WalletTransaction[];
}

// ─── Static data from your API ────────────────────────────────────────────────

const TRANSACTION_DATA: TransactionDetail = {
  id: "96d7fc43-f041-4b88-ab9b-f2fdaa833e05",
  trackingId: "f43daa1f-84e1-4df6-9b97-c6e1dbb75c99",
  amount: 232.23,
  status: "SUCCESS",
  method: "UPI",
  provider: "COD",
  createdAt: "2026-03-31T12:04:02.508Z",
  client: {
    id: "70b56640-c6f7-433d-8517-cec58743dce7",
    name: "Swapnil Satish Sutar",
    mobile: "9999999998",
  },
  driver: {
    id: "c2eaae8b-53c1-4413-b424-68962866659a",
    name: "Swapnil",
    mobile: "9359248893",
  },
  walletTransactions: [
    {
      id: "1b354663-a42a-4f98-806a-17b866b7f5a9",
      walletId: "ac3db857-7ee7-4dc3-9bfe-707543e8c481",
      driverId: "c2eaae8b-53c1-4413-b424-68962866659a",
      paymentDoneById: "70b56640-c6f7-433d-8517-cec58743dce7",
      paymentId: "96d7fc43-f041-4b88-ab9b-f2fdaa833e05",
      amount: 232.23,
      type: "CREDIT",
      direction: "IN",
      referenceId: "f43daa1f-84e1-4df6-9b97-c6e1dbb75c99",
      description: "UPI QR payment",
      meta: {
        fare: 232.23,
        method: "UPI",
        platformFee: 0,
      },
      createdById: null,
      createdByType: "USER",
      createdAt: "2026-03-31T12:05:16.285Z",
    },
  ],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

function shortId(id: string) {
  return id.slice(0, 8) + "…";
}

function StatusBadge({ status }: { status: TransactionDetail["status"] }) {
  const cfg: Record<TransactionDetail["status"], string> = {
    SUCCESS:    "bg-green-100  text-green-700  border-green-300  dark:bg-green-900/30  dark:text-green-400  dark:border-green-800",
    FAILED:     "bg-red-100    text-red-700    border-red-300    dark:bg-red-900/30    dark:text-red-400    dark:border-red-800",
    PENDING:    "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800",
    PROCESSING: "bg-blue-100   text-blue-700   border-blue-300   dark:bg-blue-900/30   dark:text-blue-400   dark:border-blue-800",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${cfg[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === "SUCCESS" ? "bg-green-500" :
        status === "FAILED"  ? "bg-red-500"   :
        status === "PENDING" ? "bg-yellow-500": "bg-blue-500"
      }`} />
      {status}
    </span>
  );
}

function DirectionBadge({ direction }: { direction: "IN" | "OUT" }) {
  return (
    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
      direction === "IN"
        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
        : "bg-red-100   text-red-700   dark:bg-red-900/30   dark:text-red-400"
    }`}>
      {direction === "IN" ? "↓ IN" : "↑ OUT"}
    </span>
  );
}

function TypeBadge({ type }: { type: "CREDIT" | "DEBIT" }) {
  return (
    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
      type === "CREDIT"
        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
        : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
    }`}>
      {type}
    </span>
  );
}

function Row({ label, value, mono = false }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div className="flex items-start justify-between py-2.5 border-b border-gray-100 dark:border-[#1e1e1e] last:border-0 gap-4">
      <span className="text-xs text-gray-500 dark:text-zinc-500 shrink-0">{label}</span>
      <span className={`text-xs text-right text-gray-800 dark:text-zinc-200 break-all ${mono ? "font-mono" : "font-medium"}`}>
        {value}
      </span>
    </div>
  );
}

function Section({ title, children, accent }: { title: string; children: React.ReactNode; accent?: string }) {
  return (
    <div className={`rounded-2xl border bg-white dark:bg-[#141414] border-gray-200 dark:border-[#242424] overflow-hidden`}>
      <div className={`px-5 py-3 border-b border-gray-100 dark:border-[#242424] ${accent ?? "bg-gray-50 dark:bg-[#1a1a1a]"}`}>
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-zinc-400">{title}</h3>
      </div>
      <div className="px-5">{children}</div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PartnerDetailsPage() {
  const t = TRANSACTION_DATA;
  const wallet = t.walletTransactions[0];

  return (
    <div className="w-full space-y-4" style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

      {/* ── Page header ── */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Transaction Details</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Full breakdown of payment & wallet activity</p>
      </div>

      {/* ── Hero amount card ── */}
      <div className="rounded-2xl border border-gray-200 dark:border-[#242424] bg-white dark:bg-[#141414] p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Amount */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
              <span className="text-2xl font-black text-green-600 dark:text-green-400">₹</span>
            </div>
            <div>
              <p className="text-3xl font-black text-gray-900 dark:text-white">₹{t.amount.toFixed(2)}</p>
              <p className="text-xs text-gray-400 dark:text-zinc-600 mt-0.5 font-mono">{shortId(t.id)}</p>
            </div>
          </div>

          {/* Status + meta pills */}
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={t.status} />
            <span className="px-3 py-1 rounded-full text-xs font-semibold border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-zinc-400">
              {t.method}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-zinc-400">
              {t.provider}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold border border-gray-200 dark:border-zinc-700 text-gray-400 dark:text-zinc-500 font-mono">
              {formatDate(t.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Transaction Info */}
        <Section title="Transaction Info">
          <Row label="Transaction ID" value={t.id}          mono />
          <Row label="Tracking ID"    value={t.trackingId}  mono />
          <Row label="Amount"         value={`₹${t.amount.toFixed(2)}`} />
          <Row label="Status"         value={<StatusBadge status={t.status} />} />
          <Row label="Method"         value={t.method} />
          <Row label="Provider"       value={t.provider} />
          <Row label="Created At"     value={formatDate(t.createdAt)} />
        </Section>

        {/* People */}
        <div className="flex flex-col gap-4">

          {/* Client */}
          <Section title="Client" accent="bg-blue-50 dark:bg-blue-950/20">
            <div className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-[#1e1e1e]">
              <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                <span className="text-xs font-black text-blue-600 dark:text-blue-400">
                  {t.client.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </span>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{t.client.name}</p>
                <p className="text-xs font-mono text-gray-400 dark:text-zinc-600">+91 {t.client.mobile}</p>
              </div>
            </div>
            <Row label="Client ID" value={t.client.id} mono />
          </Section>

          {/* Driver */}
          <Section title="Driver" accent="bg-green-50 dark:bg-green-950/20">
            <div className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-[#1e1e1e]">
              <div className="w-9 h-9 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                <span className="text-xs font-black text-green-600 dark:text-green-400">
                  {t.driver.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </span>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{t.driver.name}</p>
                <p className="text-xs font-mono text-gray-400 dark:text-zinc-600">+91 {t.driver.mobile}</p>
              </div>
            </div>
            <Row label="Driver ID" value={t.driver.id} mono />
          </Section>
        </div>
      </div>

      {/* ── Wallet Transactions ── */}
      <div className="rounded-2xl border border-gray-200 dark:border-[#242424] bg-white dark:bg-[#141414] overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 dark:border-[#242424] bg-gray-50 dark:bg-[#1a1a1a] flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-zinc-400">
            Wallet Transactions
          </h3>
          <span className="text-xs text-gray-400 dark:text-zinc-600">{t.walletTransactions.length} record{t.walletTransactions.length !== 1 ? "s" : ""}</span>
        </div>

        {t.walletTransactions.map((w, i) => (
          <div key={w.id} className={`p-5 ${i < t.walletTransactions.length - 1 ? "border-b border-gray-100 dark:border-[#1e1e1e]" : ""}`}>

            {/* Wallet entry header */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <DirectionBadge direction={w.direction} />
              <TypeBadge type={w.type} />
              <span className="text-sm font-black text-gray-900 dark:text-white ml-1">₹{w.amount.toFixed(2)}</span>
              <span className="text-xs text-gray-400 dark:text-zinc-600 ml-auto font-mono">{formatDate(w.createdAt)}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              <div>
                <Row label="Wallet Txn ID"    value={w.id}            mono />
                <Row label="Wallet ID"         value={w.walletId}      mono />
                <Row label="Payment ID"        value={w.paymentId}     mono />
                <Row label="Reference ID"      value={w.referenceId}   mono />
                <Row label="Description"       value={w.description} />
              </div>
              <div>
                <Row label="Driver ID"         value={w.driverId}         mono />
                <Row label="Payment Done By"   value={w.paymentDoneById}  mono />
                <Row label="Created By Type"   value={w.createdByType} />
                <Row label="Created By ID"     value={w.createdById ?? "—"} mono />
                <Row label="Type / Direction"  value={<span className="flex gap-1.5"><TypeBadge type={w.type} /><DirectionBadge direction={w.direction} /></span>} />
              </div>
            </div>

            {/* Meta block */}
            <div className="mt-3 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#2a2a2a] p-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-zinc-600 mb-3">Meta</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Fare",         value: `₹${w.meta.fare.toFixed(2)}`    },
                  { label: "Method",       value: w.meta.method                   },
                  { label: "Platform Fee", value: `₹${w.meta.platformFee.toFixed(2)}` },
                ].map((m) => (
                  <div key={m.label} className="text-center px-3 py-2.5 rounded-xl bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#242424]">
                    <p className="text-[10px] text-gray-400 dark:text-zinc-600 mb-0.5">{m.label}</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{m.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}