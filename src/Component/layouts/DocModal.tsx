// "use client";

// import { useState } from "react";
// import { X, Check, Eye, ShieldCheck, ShieldX } from "lucide-react";
// import { fetchPartnerDocs } from "@/Redux/Api";

// export type DocKey =
//   | "vehiclePhoto"
//   | "vehicleDocument"
//   | "aadhaarImageUrl"
//   | "aadhaarPdfUrl"
//   | "panCardUrl"
//   | "profilePhotoUrl";

// export interface PartnerListItem {
//   id: string;
//   imageUrl: string;
//   mobile_number: string;
//   full_name: string | null;
// }

// export interface PartnerDocs {
//   vehiclePhoto?: string;
//   vehicleDocument?: string;
//   aadhaarImageUrl?: string;
//   aadhaarPdfUrl?: string;
//   panCardUrl?: string;
//   profilePhotoUrl?: string;
// }

// const DOC_META = [
//   { key: "profilePhotoUrl", label: "Profile Photo" },
//   { key: "aadhaarImageUrl", label: "Aadhaar Card" },
//   { key: "aadhaarPdfUrl", label: "Aadhaar PDF" },
//   { key: "panCardUrl", label: "PAN Card" },
//   { key: "vehiclePhoto", label: "Vehicle Photo" },
//   { key: "vehicleDocument", label: "Vehicle Document" },
// ] as { key: DocKey; label: string }[];

// export default function DocModal({
//   partner,
//   docs,
//   onClose,
//   onSubmit,
// }: {
//   partner: PartnerListItem;
//   docs: PartnerDocs;
//   onClose: () => void;
//   onSubmit: (
//     partnerId: string,
//     verified: boolean,
//     checkedDocs: Set<DocKey>
//   ) => void;
// }) {
//   const [checked, setChecked] = useState<Set<DocKey>>(new Set());
//   const [preview, setPreview] = useState<string | null>(null);

// const [docs, setDocs] = useState<PartnerDocs | null>(null);
// const [loading, setLoading] = useState(false);

// const handleOpenDocs = async (partner: PartnerListItem) => {
//   setLoading(true);
//   try {
//     const data = await fetchPartnerDocs();
//     setDocs(data);
//   } catch (err) {
//     console.error("Error fetching docs", err);
//   } finally {
//     setLoading(false);
//   }
// };

//   const available = DOC_META.filter((d) => docs[d.key]);
//   const missing = DOC_META.filter((d) => !docs[d.key]);
//   const allChecked =
//     available.length > 0 && available.every((d) => checked.has(d.key));

//   const toggle = (key: DocKey) => {
//     setChecked((prev) => {
//       const next = new Set(prev);
//       next.has(key) ? next.delete(key) : next.add(key);
//       return next;
//     });
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
//       {preview && (
//         <div
//           className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90"
//           onClick={() => setPreview(null)}
//         >
//           <img
//             src={preview}
//             className="max-h-[82vh] max-w-[92vw] rounded-xl shadow-2xl"
//           />
//         </div>
//       )}

//       <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#222222]">

//         {/* Header */}
//         <div className="flex justify-between p-4 border-b">
//           <p className="font-semibold">{partner.full_name}</p>
//           <button onClick={onClose}>
//             <X size={18} />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="p-4 grid grid-cols-2 gap-3">
//           {available.map(({ key, label }) => {
//             const url = docs[key]!;
//             const isPdf = url.endsWith(".pdf");
//             const ticked = checked.has(key);

//             return (
//               <div key={key} className="border rounded-xl overflow-hidden">
//                 {!isPdf ? (
//                   <img
//                     src={url}
//                     className="h-32 w-full object-cover cursor-pointer"
//                     onClick={() => setPreview(url)}
//                   />
//                 ) : (
//                   <a href={url} target="_blank" className="h-32 flex items-center justify-center">
//                     View PDF
//                   </a>
//                 )}

//                 <div className="flex justify-between p-2">
//                   <span>{label}</span>
//                   <button onClick={() => toggle(key)}>
//                     <Check
//                       className={ticked ? "text-green-500" : "opacity-20"}
//                     />
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Footer */}
//         <div className="flex gap-2 p-4 border-t">
//           <button
//             onClick={() => onSubmit(partner.id, false, checked)}
//             className="flex-1 border text-red-500"
//           >
//             <ShieldX size={14} /> Unverify
//           </button>

//           <button
//             disabled={!allChecked}
//             onClick={() => onSubmit(partner.id, true, checked)}
//             className="flex-1 bg-green-500 text-white"
//           >
//             <ShieldCheck size={14} /> Verify
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }