"use client";

import { useEffect, useState } from "react";
import {
  X,
  Check,
  Eye,
  ShieldCheck,
  ShieldX,
  Loader2,
  Loader,
} from "lucide-react";
import { PartnerDocs, PartnerListItem, VerifiedDocuments, VerifyDocsPayload } from "@/Types/types";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { verifyPartnerDocsRequest } from "@/Redux/PostSlice";
import { RootState } from "@/Redux/Store";

type DocKey =
  | "profilePhotoUrl"
  | "aadhaarImageUrl"
  | "aadhaarPdfUrl"
  | "panCardUrl"
  | "vehiclePhoto"
  | "vehicleDocument";

interface DocMeta {
  key: DocKey;
  label: string;
}


const DOC_META: DocMeta[] = [
  { key: "profilePhotoUrl", label: "Profile Photo" },
  { key: "aadhaarImageUrl", label: "Aadhaar Card" },
  { key: "aadhaarPdfUrl", label: "Aadhaar PDF" },
  { key: "panCardUrl", label: "PAN Card" },
  { key: "vehiclePhoto", label: "Vehicle Photo" },
  { key: "vehicleDocument", label: "Vehicle Document" },
];


type VerificationKey = keyof VerifyDocsPayload;

const STATUS_MAP: Partial<Record<DocKey, VerificationKey>> = {
  aadhaarImageUrl: "aadhaar",
  aadhaarPdfUrl: "aadhaar",
  panCardUrl: "panCard",
  vehicleDocument: "vehicleDocument",
  //  vehiclePhoto: "vehiclePhoto",
  // bankDocUrl: "bank",
};


export default function DocModal({
  partner,
  docs,
  onClose,
  onSubmit,
}: {
  partner: PartnerListItem;
  docs: PartnerDocs | null;
  onClose: () => void;
  onSubmit: (partnerId: string, verified: boolean, checkedDocs: Set<DocKey>) => void;
}) {

  const [checked, setChecked] = useState<Set<DocKey>>(new Set());
  const [preview, setPreview] = useState<string | null>(null);
  const dispatch = useDispatch();

  const { verifyLoading, verifyError } = useSelector(
  (state: RootState) => state.posts
);

  if (!docs) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
        <Loader2 className="animate-spin text-white" />
      </div>
    );
  }

  useEffect(() => {
    if (!docs?.verifiedDocuments) return;

    const preChecked = new Set<DocKey>();

    DOC_META.forEach(({ key }) => {
      const backendKey = STATUS_MAP[key];
      if (!backendKey) return;

      if (docs.verifiedDocuments?.[backendKey] === "verified") {
        preChecked.add(key);
      }
    });

    setChecked(preChecked);
  }, [docs]);

  const available = DOC_META.filter((d) => docs[d.key]);
  const missing = DOC_META.filter(
    (d) => d.key !== "profilePhotoUrl" && !docs[d.key]
  );

  // const allChecked =
  //   available.length > 0 && available.every((d) => checked.has(d.key));

  const buildVerificationPayload = (): VerifyDocsPayload => {
    const existing = docs?.verifiedDocuments;

    const result: VerifyDocsPayload = {
      aadhaar: existing?.aadhaar ?? "pending",
      panCard: existing?.panCard ?? "pending",
      licence: existing?.licence ?? "pending",
      bank: existing?.bank ?? "pending",
      vehicleDocument: existing?.vehicleDocument ?? "pending",
    };

    // ✅ Only update what user checked
    checked.forEach((key) => {
      const backendKey = STATUS_MAP[key];
      if (backendKey) {
        result[backendKey] = "verified";
      }
    });

    return result;
  };


//   useEffect(() => {
//   if (!verifyLoading && !verifyError) {
//     onClose();
//   }
// }, [verifyLoading]);

  const toggle = (key: DocKey) => {
    const backendKey = STATUS_MAP[key];
    const isAlreadyVerified =
      backendKey && docs?.verifiedDocuments?.[backendKey] === "verified";

    if (isAlreadyVerified) return; // prevent unchecking verified docs

    setChecked((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const handleUnverify = async () => {
    try {
      // const missingDocLabels = missing.map((d) => d.label);

      // console.log(missingDocLabels);

      await axios.post("https://juvenile-race-unions-accessory.trycloudflare.com/api/v1/unverify", {
        partner_id: partner.id,
        // reason: missingDocLabels.join(", "),
      });

      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  if (!docs) return <Loader />;

  return (
    <div className="fixed  inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      {/* Lightbox */}
      {preview && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90"
          onClick={() => setPreview(null)}
        >
          <img
            src={preview}
            alt="preview"
            className="max-h-[82vh] max-w-[92vw] rounded-xl shadow-2xl"
          />
          <button className="absolute top-4 right-4 text-white/60 hover:text-white">
            <X size={28} />
          </button>
        </div>
      )}

      <div className="relative hide-scrollbar w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-[10px] shadow-2xl bg-white dark:bg-[#111] border border-gray-200 dark:border-[#222] font-sans">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white dark:bg-[#111] border-b border-gray-200 dark:border-[#1e1e1e]">
          <div className="flex items-center gap-3">
            <img
              src={
                partner.imageUrl ||
                `https://api.dicebear.com/7.x/thumbs/svg?seed=${partner.id}`
              }
              alt={partner.full_name ?? "Partner"}
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 dark:border-[#2a2a2a]"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `https://api.dicebear.com/7.x/thumbs/svg?seed=${partner.id}`;
              }}
            />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-[#e0e0e0]">
                {partner.full_name ?? "Unknown Partner"}
              </p>
              <p className="text-xs text-gray-500 dark:text-[#555]">
                {partner.mobile_number} · {partner.id}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl transition-colors hover:bg-gray-200 dark:hover:bg-[#1e1e1e] text-gray-500 dark:text-[#666] hover:text-gray-900 dark:hover:text-[#ccc]"
          >
            <X size={17} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pt-5 pb-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-[#444] mb-4">
            Documents · {checked.size}/{available.length} verified
          </p>

          {available.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-[#444] text-sm">
              No documents uploaded yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {available.map(({ key, label }) => {
                const url = docs[key] as string | undefined;
                if (!url) return null;

                const isPdf =
                  typeof url === "string" && url.toLowerCase().endsWith(".pdf");
                const backendKey = STATUS_MAP[key];
                const status = backendKey
                  ? docs.verifiedDocuments?.[backendKey]
                  : null;

                const isVerified = status === "verified";
                const ticked = checked.has(key) || isVerified;

                return (
                  <div
                    key={key}
                    className="rounded-xl overflow-hidden transition-all duration-200 bg-white dark:bg-[#141414]"
                    style={{
                      border: isVerified
                        ? "2px solid #16a34a" // green (verified)
                        : ticked
                          ? "2px solid #4ade80" // light green (selected)
                          : "2px solid #e5e7eb",
                    }}
                  >
                    {/* Preview */}
                    {!isPdf ? (
                      <div
                        className="relative h-36 overflow-hidden cursor-zoom-in bg-gray-100 dark:bg-[#1a1a1a]"
                        onClick={() => setPreview(url)}
                      >
                        <img
                          src={url}
                          alt={label}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://placehold.co/400x200/1a1a1a/444?text=Preview";
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/40">
                          <Eye size={20} className="text-white" />
                        </div>
                      </div>
                    ) : (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center h-36 gap-2 transition-colors hover:bg-gray-100 dark:hover:bg-[#162030] bg-gray-50 dark:bg-[#101820]"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="w-10 h-10 text-blue-500"
                          fill="currentColor"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zM8 13h8v1H8v-1zm0 3h8v1H8v-1zm0-6h3v1H8v-1z" />
                        </svg>
                        <span className="text-xs text-blue-500 dark:text-blue-400 font-medium">
                          View PDF
                        </span>
                      </a>
                    )}

                    {/* Label + checkbox */}
                    <div className="flex items-center justify-between px-3 py-2.5">
                      <span className="text-xs font-medium text-gray-700 dark:text-[#bbb]">
                        {label}
                      </span>
                      <button
                        onClick={() => toggle(key)}
                        disabled={isVerified}
                        className="flex items-center justify-center w-7 h-7 rounded-lg border-2 transition-all duration-200"
                        style={{
                          background: isVerified
                            ? "#16a34a"
                            : ticked
                              ? "#4ade80"
                              : "transparent",
                          borderColor: isVerified
                            ? "#16a34a"
                            : ticked
                              ? "#4ade80"
                              : "#333",
                        }}
                      >
                        <Check size={13} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Missing docs */}
          {missing.length > 0 && (
            <div className="mt-4 px-3 py-2.5 rounded-xl text-xs bg-yellow-100 dark:bg-[#1e1500] text-yellow-700 dark:text-[#a87c00] border border-yellow-300 dark:border-[#3a2800]">
              <span className="font-semibold">Missing: </span>
              {missing.map((d) => d.label).join(", ")}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="sticky bottom-0 flex gap-3 px-6 py-4 bg-white dark:bg-[#111] border-t border-gray-200 dark:border-[#1e1e1e]">
          <button
            onClick={handleUnverify}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border-2 border-red-400 dark:border-[#a54d4d] text-red-500  dark:text-[#f87171] bg-transparent hover:bg-red-50 dark:hover:bg-[#1e0a0a]"
          >
            <ShieldX size={15} /> Approve
          </button>

          <button
            onClick={() => {
              const payload = buildVerificationPayload();

              dispatch(
                verifyPartnerDocsRequest({
                  partnerId: partner.id,
                  payload,
                })
              );

              // onClose();
            }}
            className="flex-1 flex items-center justify-center bg-green-500 border-gray-700 dark:border-gray-300 gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
          >
            <ShieldCheck size={15} />  {verifyLoading ? "Verifying..." : "Verify All"}

          </button>
        </div>
      </div>
    </div>
  );
}