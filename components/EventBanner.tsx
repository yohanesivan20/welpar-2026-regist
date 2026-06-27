"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Calendar, ChevronDown, MapPin, Play, Pause, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useMusic } from "@/components/MusicProvider";

const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "";

export default function EventBanner() {
  const [registered, setRegistered] = useState(0);
  const [loading, setLoading] = useState(true);
  const [typedTitle, setTypedTitle] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const { playerReady, isPlaying, toggleMusic } = useMusic();

  const fullTitle = "FAITH GAME";

  useEffect(() => {
    let typingTimer: number | undefined;
    let restartTimer: number | undefined;

    const startTyping = () => {
      setTypedTitle("");
      let index = 0;

      if (typingTimer) {
        window.clearInterval(typingTimer);
      }

      typingTimer = window.setInterval(() => {
        index += 1;
        setTypedTitle(fullTitle.slice(0, index));

        if (index >= fullTitle.length && typingTimer) {
          window.clearInterval(typingTimer);
        }
      }, 70);
    };

    startTyping();
    restartTimer = window.setInterval(() => {
      startTyping();
    }, 10000);

    return () => {
      if (typingTimer) window.clearInterval(typingTimer);
      if (restartTimer) window.clearInterval(restartTimer);
    };
  }, []);

  useEffect(() => {
    const cursorInterval = window.setInterval(() => {
      setShowCursor((current) => !current);
    }, 500);

    return () => window.clearInterval(cursorInterval);
  }, []);

  // "FAITH" putih, "GAME" pink — berdasarkan urutan kata (index ke-1)
  const renderTitle = () => {
    const words = typedTitle.split(" ");

    return words.map((word, index) => (
      <span
        key={index}
        className={index === 1 ? "text-pink-500" : "text-white"}
      >
        {word}
        {index < words.length - 1 ? " " : ""}
      </span>
    ));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!GOOGLE_SCRIPT_URL) {
          console.warn("NEXT_PUBLIC_GOOGLE_SCRIPT_URL not configured");
          setLoading(false);
          return;
        }
        const response = await fetch(GOOGLE_SCRIPT_URL);

        const data = await response.json();
        setRegistered(data.registered || 0);
      } catch (error) {
        console.error("Error fetching registration count:", error);
        setRegistered(0);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const date = process.env.NEXT_PUBLIC_EVENT_DATE || "29 Agustus 2026";
  const location =
    process.env.NEXT_PUBLIC_EVENT_LOCATION ||
    "Aula Lantai 8 Sekolah St. Yakobus, Kelapa Gading, Jakarta Utara";
  const maxSlots = Number(process.env.NEXT_PUBLIC_MAX_SLOTS || 156);
  const time = process.env.NEXT_PUBLIC_EVENT_TIME || "13.30 - 17.00";
  const pct = maxSlots > 0 ? Math.round((registered / maxSlots) * 100) : 0;

  return (
    <motion.section
      className="relative bg-[#0d0d0d] border border-[#1c1c1c] rounded-t-3xl px-6 pt-8 pb-14 overflow-visible sm:px-10 sm:pt-10 sm:pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute right-4 top-6 z-30">
        <button
          type="button"
          onClick={toggleMusic}
          disabled={!playerReady}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 text-black transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
      </div>

      <div className="absolute left-1/2 bottom-0 z-20 -translate-x-1/2 translate-y-1/2">
        
          <a href="#event-carousel"
          onClick={(event) => {
            event.preventDefault();
            document.getElementById("event-carousel")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="inline-flex items-center justify-center rounded-full bg-teal-500 px-4 py-3 text-black shadow-[0_12px_30px_rgba(20,184,166,0.25)] transition hover:bg-teal-400"
          aria-label="Scroll to event carousel"
        >
          <ChevronDown size={20} />
        </a>
      </div>

      <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-pink-500" />
      <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-pink-500" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Badge className="mb-5 bg-pink-500/10 text-pink-500 border border-pink-500/30 hover:bg-pink-500/10 text-[10px] tracking-[3px] uppercase font-bold rounded-sm px-3 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mr-2 animate-pulse inline-block" />
          Pendaftaran Dibuka
        </Badge>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-[10px] tracking-[4px] text-neutral-300 uppercase mb-2"
      >
        BLESSED TO BLESS #001
        <br />
        KTM MUDA MUDI JAKARTA 2026
      </motion.p>

      {/* Sub-tagline: "Stay Sane or Fall Apart" */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-[20px] tracking-[3px] text-neutral-300 uppercase font-light mt-4"
      >
        "STAY <span className="text-pink-500">SANE</span> OR{" "}
        <span className="text-pink-500">FALL APART</span>"
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="font-[family-name:var(--font-anton)] min-h-16 text-[clamp(2.5rem,11vw,5.5rem)] leading-none tracking-tight mb-2 whitespace-nowrap sm:min-h-20"
      >
        {renderTitle()}
        <span
          className={`inline-block w-px h-[1.8rem] bg-white ml-2 transition-opacity ${
            showCursor ? "opacity-100" : "opacity-0"
          }`}
        />
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex items-center gap-3 mb-6 text-neutral-800 text-[10px]"
      >
        <span>◯</span>
        <div className="flex-1 h-px bg-linear-to-r from-neutral-800 via-pink-500/40 to-neutral-800" />
        <span>△</span>
        <div className="flex-1 h-px bg-linear-to-r from-neutral-800 via-teal-500/40 to-neutral-800" />
        <span>□</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex flex-col gap-3 mb-5"
      >
        {[
          { icon: Calendar, label: "TANGGAL", value: date },
          { icon: MapPin, label: "LOKASI", value: location },
          { icon: Clock, label: "PUKUL", value: time },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3">
            <Icon size={14} className="text-teal-500 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[9px] tracking-[2px] text-neutral-400 uppercase">{label}</span>
              <span className="text-[13px] text-neutral-400">{value}</span>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex items-center gap-3"
      >
        <div className="flex-1 h-0.75 bg-neutral-900 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-linear-to-r from-pink-600 to-teal-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: loading ? 0 : `${pct}%` }}
            transition={{ delay: 0.8, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>
        <span className="text-[10px] text-neutral-300 tracking-wide whitespace-nowrap">
          {loading ? "Loading..." : `${pct}% slot terisi`}
        </span>
      </motion.div>
    </motion.section>
  );
}