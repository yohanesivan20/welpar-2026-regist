"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ShapesBackground() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
      {/* Circle top right */}
      <motion.div
        className="absolute w-72 h-72 rounded-full border border-[rgba(237,27,118,0.25)] top-[-80px] right-[-60px] pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: [0.25, 0.25, 0.75, 0.75] }}
      />
      {/* Circle bottom left */}
      <div className="absolute w-[500px] h-[500px] rounded-full border border-[rgba(237,27,118,0.25)] bottom-[-200px] left-[-300px] pointer-events-none" />
      {/* Triangle left */}
      <motion.div
        className="absolute top-[35%] left-[5%] w-0 h-0 pointer-events-none"
        style={{
          borderLeft: "50px solid transparent",
          borderRight: "50px solid transparent",
          borderBottom: "86px solid rgba(237,27,118,0.25)",
        }}
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: [0.25, 0.1, 0.25, 1] }}
      />
      {/* Square right */}
      <motion.div
        className="absolute w-20 h-20 border border-[rgba(237,27,118,0.25)] top-[45%] right-[8%] pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: [0, 0, 1, 1], repeatType: "reverse" }}
      />
      {/* Scanline */}
      <motion.div
        className="absolute left-0 right-0 h-[2.5px] pointer-events-none
        bg-[linear-gradient(to_right,transparent_0%,rgba(237,27,118,0.4)_50%,transparent_100%)]
        shadow-[0_0_20px_rgba(237,27,118,0.3)]"
        animate={{ top: ["-2%", "102%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: [0.25, 0.1, 0.25, 1] }}
      />

      {/* Shuttlecock — desktop only */}
      <motion.button
        onClick={() => router.push("/badminton-info")}
        aria-label="Info turnamen badminton"
        className="hidden md:flex absolute top-14 right-10 z-50 cursor-pointer flex-col items-center gap-2"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-pink-500/20 blur-lg scale-150" />
          <img
            src="/images/shuttlecock.png"
            alt="shuttlecock"
            className="relative w-16 h-16 object-contain drop-shadow-lg"
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[14px] tracking-[2px] text-pink-400 uppercase font-semibold">
            Turnamen
          </span>
          <span className="text-[10px] text-neutral-500 tracking-wide">
            Tap untuk info
          </span>
        </div>
      </motion.button>
    </div>
  );
}