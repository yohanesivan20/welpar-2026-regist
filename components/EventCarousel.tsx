"use client";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const slides = [
  {
    title: "Praise & Worship",
    image: "/images/praise.JPG",
    description:
      "Sesi pujian dan penyembahan untuk memuliakan Tuhan, mempererat kebersamaan, dan membuka acara dengan sukacita.",
  },
  {
    title: "Bazaar",
    image: "/images/bazar.jpg",
    description:
      "Beragam stand makanan dan aktivitas seru yang bisa dinikmati bersama, menjadi momen untuk bersosialisasi dan saling mengenal.",
  },
  {
    title: "Faith Game",
    image: "/images/games.jpg",
    description:
      "Permainan interaktif yang mengangkat nilai-nilai iman, mengajak peserta untuk bertumbuh dalam kebersamaan dan sukacita.",
  },
];

export default function EventCarousel() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const x = useMotionValue(0);
  const [dragWidth, setDragWidth] = useState(0);
  const [scrollDistance, setScrollDistance] = useState(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = wrapper?.querySelector(".carousel-track") as HTMLElement | null;

    if (!wrapper || !track) {
      return;
    }

    const update = () => {
      setDragWidth(Math.max(track.scrollWidth - wrapper.offsetWidth, 0));
      setScrollDistance(track.scrollWidth / 2);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(wrapper);
    observer.observe(track);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!scrollDistance) return;

    controls.start(
      { x: [0, -scrollDistance] },
      { repeat: Infinity, duration: 34, ease: "linear" }
    );
  }, [controls, scrollDistance]);

  const handleDragStart = () => controls.stop();
  const handleDragEnd = () => {
    if (!scrollDistance) return;

    controls.start(
      { x: -scrollDistance },
      { repeat: Infinity, duration: 34, ease: "linear" }
    );
  };

  return (
    <section
      id="event-carousel"
      className="mt-8 max-w-5xl mx-auto overflow-hidden rounded-3xl border border-[#1c1c1c] bg-[#0d0d0d] px-6 py-6 sm:px-10 sm:py-8"
    >
      <div className="mb-6 text-center">
        <p className="text-[11px] tracking-[4px] text-pink-500 uppercase font-bold mb-2">
          What's On
        </p>
        <img
          src="/images/logo/Faith%20Game%20-%20White%20-%20Horizontal.png"
          alt="Faith Game logo"
          className="mx-auto h-12 w-auto sm:h-14"
        />
      </div>

      <div ref={wrapperRef} className="relative overflow-hidden">
        <motion.div
          className="carousel-track flex gap-3 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: -dragWidth, right: 0 }}
          dragElastic={0.15}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{ x }}
        >
          {[...slides, ...slides].map((slide, index) => (
            <article
              key={`${slide.title}-${index}`}
              className="min-w-[140px] sm:min-w-[200px] flex-shrink-0 rounded-3xl border border-[#222] bg-[#111] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
            >
            <div
                className="relative mb-4 h-36 overflow-hidden rounded-3xl bg-cover bg-center transition-transform duration-500 hover:scale-[1.03]"
                style={{
                    backgroundImage: `url(${slide.image})`,
                }}
                >
                {/* overlay biar teks tetap kebaca */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
              <p className="text-xs uppercase tracking-[2px] text-pink-500 mb-2">Highlight</p>
              <h3 className="text-lg font-semibold text-white mb-2">{slide.title}</h3>
              <p className="text-sm leading-6 text-neutral-400">{slide.description}</p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
