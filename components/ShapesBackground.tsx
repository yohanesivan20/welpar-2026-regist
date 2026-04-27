"use client";
import { motion } from "framer-motion";

export default function ShapesBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
      {/* Circle top right */}
      <motion.div
        className="absolute w-72 h-72 rounded-full border border-[rgba(237,27,118,0.25)] top-[-80px] right-[-60px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: [0.25, 0.25, 0.75, 0.75] }}
      />
      {/* Circle bottom left */}
      <div className="absolute w-[500px] h-[500px] rounded-full border border-[rgba(237,27,118,0.25)] bottom-[-200px] left-[-300px]" />
      {/* Triangle left */}
      <motion.div
        className="absolute top-[35%] left-[5%] w-0 h-0"
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
        className="absolute w-20 h-20 border border-[rgba(237,27,118,0.25)] top-[45%] right-[8%]"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: [0, 0, 1, 1], repeatType: "reverse" }}
      />
      {/* Scanline */}
      <motion.div
        className="absolute left-0 right-0 h-[2.5px]
        bg-[linear-gradient(to_right,transparent_0%,rgba(237,27,118,0.4)_50%,transparent_100%)]
        shadow-[0_0_20px_rgba(237,27,118,0.3)]"
        animate={{ top: ["-2%", "102%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </div>
  );
}