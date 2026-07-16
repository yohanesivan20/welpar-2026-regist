"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import EventBanner from "@/components/EventBanner";
import EventCarousel from "@/components/EventCarousel";
import ShapesBackground from "@/components/ShapesBackground";

export default function Home() {
  const jerseyLink =
  "https://docs.google.com/forms/d/e/1FAIpQLSd6h4TbzESo5CuTUhL_KL5fM2KCpluclO6Mt7HKY9Gwg4rU2w/viewform";
  const [showJerseyModal, setShowJerseyModal] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const merchImages = Array.from({ length: 7 }, (_, i) => ({
    id: i + 1,
    src: `/images/merch/merch-${i + 1}.jpeg`,
  }));

  const [currentImage, setCurrentImage] = useState(0);

  return (
    <main className="scroll-smooth min-h-screen flex flex-col items-center justify-center px-4 py-8 relative">
      <ShapesBackground />
      <div className="w-full max-w-2xl relative z-10">
        <header className="mb-4 rounded-3xl border border-[#1c1c1c] bg-[#090909]/80 p-5 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="hidden sm:flex flex-wrap items-center justify-center gap-3 text-[12px] uppercase tracking-[3px]">
              <a
                href="https://www.holytrinitycarmel.com/#0"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-pink-500 hover:text-black"
              >
                Tentang KTM
              </a>
              <a
                href="https://www.instagram.com/p/Dam-yYpAdA3"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:bg-pink-500 hover:text-black"
              >
                Gabung Sel
              </a>
            </div>
            <button
              type="button"
              onClick={() => setNavOpen((prev) => !prev)}
              className="sm:hidden inline-flex w-full items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 text-left text-[12px] uppercase tracking-[3px] text-white transition hover:bg-pink-500 hover:text-black"
            >
              <span>Menu</span>
              <span className="text-2xl leading-none">{navOpen ? "×" : "☰"}</span>
            </button>
            <button
              type="button"
              onClick={() => setShowJerseyModal(true)}
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-pink-500 px-5 py-3 text-[12px] font-semibold uppercase tracking-[2px] text-black transition hover:bg-pink-600"
            >
              Beli Jersey KTM
            </button>
          </div>
          <AnimatePresence>
            {navOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="mt-4 flex flex-col gap-3 sm:hidden"
              >
                <a
                  href="https://www.holytrinitycarmel.com/#0"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-center text-[12px] uppercase tracking-[2px] text-white transition hover:bg-pink-500 hover:text-black"
                >
                  Tentang KTM
                </a>
                <a
                  href="https://www.instagram.com/p/Dam-yYpAdA3"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-center text-[12px] uppercase tracking-[2px] text-white transition hover:bg-pink-500 hover:text-black"
                >
                  Gabung Sel
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setShowJerseyModal(true);
                    setNavOpen(false);
                  }}
                  className="w-full rounded-full bg-pink-500 px-4 py-3 text-[12px] font-semibold uppercase tracking-[2px] text-black transition hover:bg-pink-600"
                >
                  Beli Jersey KTM
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <EventBanner />
        <EventCarousel />
        <div className="mt-8 text-center bg-[#0d0d0d] border border-[#1c1c1c] border-t-0 rounded-b-3xl px-6 py-10 sm:px-10">
          <p className="mx-auto max-w-xl text-sm leading-7 text-neutral-400 sm:text-base mb-4">
            Are you brave enough to take on this faith game challenge?
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-full bg-pink-500 px-8 py-3 text-sm font-semibold uppercase tracking-[2px] text-white transition hover:bg-pink-600 active:scale-95"
          >
            JOIN THE GAME
          </Link>
        </div>
      </div>
      <footer className="mt-auto py-8 text-[11px] text-neutral-800 tracking-[2px] text-center relative z-10">
        <div className="mb-3 text-sm text-neutral-400">
          Follow kami: 
          <a
            href="https://www.instagram.com/ktmmmjkt/"
            target="_blank"
            rel="noreferrer"
            className="text-pink-500 hover:underline"
          >
            @ktmmmjkt
          </a>
          <span className="mx-2">•</span>
          <a
            href="https://www.instagram.com/b2bktmjkt/"
            target="_blank"
            rel="noreferrer"
            className="text-pink-500 hover:underline"
          >
            @b2bktmjkt
          </a>
        </div>
        ◯ △ □ &nbsp; © 2026 Stay Sane or Fall Apart &nbsp; ◯ △ □
        <div className="mt-2">KTM Muda Mudi Jakarta 2026</div>
      </footer>
      {showJerseyModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#111] p-5 shadow-2xl">
            <div className="relative mb-5 pt-2">
              <button
                onClick={() => setShowJerseyModal(false)}
                className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 text-neutral-300 transition hover:border-pink-500 hover:text-white"
              >
                ✕
              </button>

              <div className="text-center">
                <p className="text-[11px] uppercase tracking-[4px] text-pink-500">
                  OFFICIAL JERSEY KTM
                </p>

                <h2 className="mt-2 text-3xl font-bold text-white">
                  Jersey Muda Mudi Jakarta
                </h2>
              </div>

            </div>

            <div className="relative">

              <div className="relative overflow-hidden rounded-3xl">

                <div className="relative w-full">
                  <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    loop
                  >
                    {merchImages.map((item) => (
                      <SwiperSlide key={item.id}>
                        <div className="mx-auto w-[280px]">
                          <Image
                            src={item.src}
                            alt=""
                            width={1080}
                            height={1350}
                            className="h-auto w-full rounded-3xl"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>

              <div className="mt-4 flex justify-center gap-2">
                {merchImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    
                  />
                ))}
              </div>

              <Link
                href={jerseyLink}
                target="_blank"
                className="mt-2 flex w-full items-center justify-center rounded-full bg-pink-500 py-2.5 text-sm font-semibold hover:bg-pink-600"
              >
                PESAN SEKARANG
              </Link>

            </div>

          </div>
        </div>
      )}
    </main>
  );
}