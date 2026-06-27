"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Calendar, MapPin, Users, Clock, Info } from "lucide-react";
import { useRouter } from "next/navigation";

const INFO_ITEMS = [
  {
    icon: Trophy,
    label: "Kategori",
    value: "Ganda Campuran (Pasangan Ditentukan Panitia)",
  },
  {
    icon: Calendar,
    label: "Tanggal",
    value: "15 Agustus 2026",
  },
  {
    icon: MapPin,
    label: "Lokasi",
    value: "GOR Cempaka Putih, Jakarta",
  },
  {
    icon: Clock,
    label: "Waktu",
    value: "10.00 - 16.00 WIB",
  },
  {
    icon: Users,
    label: "Kuota",
    value: "Terbatas untuk 16 pasangan (32 peserta)",
  },
  {
    icon: Info,
    label: "Biaya",
    value: "100.000 IDR per pasangan (untuk biaya operasional dan hadiah)",
  },
];

export default function BadmintonInfoPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white px-5 py-10 flex flex-col items-center">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-neutral-500 hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Kembali
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-8 text-neutral-800 text-[10px]">
          <span>◯</span>
          <div className="flex-1 h-px bg-gradient-to-r from-neutral-800 via-pink-500/40 to-neutral-800" />
          <span>△</span>
          <div className="flex-1 h-px bg-gradient-to-r from-neutral-800 via-pink-500/40 to-neutral-800" />
          <span>□</span>
        </div>

        {/* Info Cards */}
        <div className="flex flex-col gap-3 mb-8">
          {INFO_ITEMS.map(({ icon: Icon, label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
              className="flex items-start gap-4 bg-[#111] border border-[#1e1e1e] rounded-xl px-4 py-3.5"
            >
              <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center shrink-0 mt-0.5">
                <Icon size={15} className="text-pink-500" />
              </div>
              <div>
                <p className="text-[9px] tracking-[2px] text-neutral-500 uppercase mb-0.5">
                  {label}
                </p>
                <p className="text-sm text-neutral-200">{value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        >
            <a href="https://wa.me/6285810019677"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-pink-500 hover:bg-pink-600 active:scale-[0.99] text-black font-['Black_Han_Sans'] tracking-[3px] text-sm rounded-xl py-4 transition-all"
        >
            DAFTAR SEKARANG
        </a>
        <p className="text-center text-neutral-600 text-xs mt-3">
            Pendaftaran via WhatsApp panitia
        </p>
        </motion.div>
      </motion.div>
    </main>
  );
}