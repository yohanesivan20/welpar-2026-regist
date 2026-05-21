"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Download, FileSpreadsheet, ChevronDown, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  exportParticipants,
  type Participant,
  type ExportMode,
} from "@/lib/exportParticipants";

// =========================
// TYPES
// =========================

type MenuItem = {
  mode: ExportMode;
  label: string;
  description: string;
};

const MENU_ITEMS: MenuItem[] = [
  {
    mode: "all",
    label: "Export All Participants",
    description: "Semua data dalam 1 sheet",
  },
  {
    mode: "by-domisili",
    label: "Export by Domisili",
    description: "Tiap domisili jadi sheet terpisah",
  },
  {
    mode: "hadir-only",
    label: "Export Hadir Only",
    description: "Peserta dengan status Hadir",
  },
  {
    mode: "pending-only",
    label: "Export Pending Only",
    description: "Peserta yang belum check-in",
  },
];

// =========================
// COMPONENT
// =========================

export default function ExportDropdown({
  data,
}: {
  data: Participant[];
}) {
  const [open, setOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleExport = useCallback(
    async (mode: ExportMode) => {
      setOpen(false);
      setExporting(true);

      // Small delay so spinner renders before heavy xlsx processing
      await new Promise((r) => setTimeout(r, 80));

      try {
        const result = exportParticipants(data, mode);

        if (!result.success) {
          toast.error(result.message ?? "Export gagal");
        } else {
          toast.success("File berhasil di-export!");
        }
      } catch {
        toast.error("Terjadi kesalahan saat export");
      } finally {
        setExporting(false);
      }
    },
    [data]
  );

  return (
    <div ref={ref} className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        disabled={exporting}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
          border border-[#2a2a2a] bg-[#161616] text-neutral-300
          hover:border-pink-500/50 hover:text-white
          transition-all duration-150
          disabled:opacity-50 disabled:cursor-not-allowed
          ${open ? "border-pink-500/50 text-white" : ""}
        `}
      >
        {exporting ? (
          <>
            <Loader2 size={15} className="animate-spin text-pink-500" />
            <span>Exporting...</span>
          </>
        ) : (
          <>
            <FileSpreadsheet size={15} className="text-pink-500" />
            <span>Export</span>
            <ChevronDown
              size={14}
              className={`text-neutral-500 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          className="
            absolute right-0 top-full mt-2 z-50
            w-64 bg-[#161616] border border-[#2a2a2a]
            rounded-xl shadow-2xl shadow-black/60
            overflow-hidden
            animate-in fade-in slide-in-from-top-1 duration-150
          "
        >
          <div className="px-3 py-2.5 border-b border-[#222]">
            <p className="text-[10px] tracking-[2px] text-neutral-600 uppercase">
              Export Options
            </p>
          </div>

          <div className="p-1.5 flex flex-col gap-0.5">
            {MENU_ITEMS.map((item) => (
              <button
                key={item.mode}
                onClick={() => handleExport(item.mode)}
                className="
                  w-full text-left px-3 py-2.5 rounded-lg
                  hover:bg-white/[0.05] transition-colors duration-100
                  group flex items-start gap-3
                "
              >
                <Download
                  size={14}
                  className="text-neutral-600 group-hover:text-pink-500 transition-colors mt-0.5 shrink-0"
                />
                <div>
                  <p className="text-sm text-neutral-300 group-hover:text-white transition-colors">
                    {item.label}
                  </p>
                  <p className="text-[11px] text-neutral-600 mt-0.5">
                    {item.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}