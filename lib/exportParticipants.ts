import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// =========================
// TYPES
// =========================

export type Participant = {
  Nama: string;
  Telepon: string;
  Umur: string;
  Domisili: string;
  Anggota: string;
  Status: string;
};

export type ExportMode =
  | "all"
  | "by-domisili"
  | "hadir-only"
  | "pending-only";

// =========================
// HELPERS
// =========================

const getFilename = (): string => {
  const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  return `faith-game-participants-${date}.xlsx`;
};

// ✅ Format tanggal lahir: Senin, 1 Januari 2000
const formatTanggalLahir = (value: string): string => {
  if (!value) return "-";

  const date = new Date(value);
  if (isNaN(date.getTime())) return value; // fallback jika bukan date

  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// ✅ Format telepon sebagai teks — cegah scientific notation
const formatTelepon = (value: string): string => {
  if (!value) return "-";

  // Bersihkan semua non-digit, pastikan awalan 0
  const digits = value
    .toString()
    .replace(/\D/g, "")
    .replace(/^'/, ""); // hapus prefix ' jika sudah ada dari Apps Script

  // Pastikan awalan 0
  const normalized = digits.startsWith("0") ? digits : `0${digits}`;

  return normalized;
};

const mapToRow = (p: Participant) => ({
  Nama: p.Nama ?? "-",
  // ✅ Prefix dengan \t (tab) agar Excel paksa baca sebagai teks
  Telepon: p.Telepon ? `\t${formatTelepon(p.Telepon)}` : "-",
  "Tanggal Lahir": formatTanggalLahir(p.Umur), // ✅ Rename + format
  Domisili: p.Domisili ?? "-",
  Keanggotaan: p.Anggota ?? "-",
  Status: p.Status ?? "-",
});

const applyHeaderStyle = (ws: XLSX.WorkSheet, headers: string[]) => {
  // Bold header row
  headers.forEach((_, i) => {
    const cellRef = XLSX.utils.encode_cell({ r: 0, c: i });
    if (!ws[cellRef]) return;
    ws[cellRef].s = {
      font: { bold: true },
      fill: { fgColor: { rgb: "1A1A1A" } },
    };
  });
};

const buildSheet = (data: Participant[]): XLSX.WorkSheet => {
  const rows = data.map(mapToRow);
  const ws = XLSX.utils.json_to_sheet(rows);

  // ✅ Force semua cell di kolom Telepon (kolom B, index 1) sebagai teks
  const range = XLSX.utils.decode_range(ws["!ref"] ?? "A1");
  for (let row = 1; row <= range.e.r; row++) {
    const cellRef = XLSX.utils.encode_cell({ r: row, c: 1 }); // kolom B
    if (ws[cellRef]) {
      ws[cellRef].t = "s"; // force type string
      ws[cellRef].z = "@"; // format sebagai teks
    }
  }

  ws["!cols"] = [
    { wch: 28 },
    { wch: 18 },
    { wch: 28 },
    { wch: 20 },
    { wch: 20 },
    { wch: 14 },
  ];

  return ws;
};

const saveWorkbook = (wb: XLSX.WorkBook) => {
  const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([buf], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, getFilename());
};

// =========================
// EXPORT FUNCTIONS
// =========================

export const exportAll = (data: Participant[]) => {
  const wb = XLSX.utils.book_new();
  const ws = buildSheet(data);
  XLSX.utils.book_append_sheet(wb, ws, "All Participants");
  saveWorkbook(wb);
};

export const exportByDomisili = (data: Participant[]) => {
  const wb = XLSX.utils.book_new();

  // Group by domisili
  const grouped = data.reduce<Record<string, Participant[]>>((acc, p) => {
    const key = p.Domisili?.trim() || "Tidak Diketahui";
    if (!acc[key]) acc[key] = [];
    acc[key].push(p);
    return acc;
  }, {});

  // Sort domisili alphabetically
  Object.keys(grouped)
    .sort()
    .forEach((domisili) => {
      // Excel sheet name max 31 chars, no special chars
      const sheetName = domisili.slice(0, 31).replace(/[\\/*?[\]:]/g, "-");
      const ws = buildSheet(grouped[domisili]);
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
    });

  saveWorkbook(wb);
};

export const exportHadirOnly = (data: Participant[]) => {
  const filtered = data.filter((p) => p.Status === "Hadir");
  const wb = XLSX.utils.book_new();
  const ws = buildSheet(filtered);
  XLSX.utils.book_append_sheet(wb, ws, "Hadir");
  saveWorkbook(wb);
};

export const exportPendingOnly = (data: Participant[]) => {
  const filtered = data.filter((p) => p.Status !== "Hadir");
  const wb = XLSX.utils.book_new();
  const ws = buildSheet(filtered);
  XLSX.utils.book_append_sheet(wb, ws, "Pending");
  saveWorkbook(wb);
};

// =========================
// MAIN DISPATCHER
// =========================

export const exportParticipants = (
  data: Participant[],
  mode: ExportMode
): { success: boolean; message?: string } => {
  if (!data?.length) {
    return { success: false, message: "Tidak ada data untuk di-export" };
  }

  switch (mode) {
    case "all":
      exportAll(data);
      break;
    case "by-domisili":
      exportByDomisili(data);
      break;
    case "hadir-only": {
      const hadir = data.filter((p) => p.Status === "Hadir");
      if (!hadir.length)
        return { success: false, message: "Belum ada peserta yang hadir" };
      exportHadirOnly(data);
      break;
    }
    case "pending-only": {
      const pending = data.filter((p) => p.Status !== "Hadir");
      if (!pending.length)
        return { success: false, message: "Tidak ada peserta pending" };
      exportPendingOnly(data);
      break;
    }
  }

  return { success: true };
};