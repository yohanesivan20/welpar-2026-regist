"use client";

import Link from "next/link";
import { useState } from "react";
import EventBanner from "@/components/EventBanner";
import EventCarousel from "@/components/EventCarousel";
import ShapesBackground from "@/components/ShapesBackground";

export default function Home() {
  const [showJerseyModal, setShowJerseyModal] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
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
                href="https://www.instagram.com/p/DH-9ucSBeF-/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
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
              <span className="text-sm">{navOpen ? "×" : "☰"}</span>
            </button>
            <button
              type="button"
              onClick={() => setShowJerseyModal(true)}
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-pink-500 px-5 py-3 text-[12px] font-semibold uppercase tracking-[2px] text-black transition hover:bg-pink-600"
            >
              Beli Jersey KTM
            </button>
          </div>
          {navOpen && (
            <div className="mt-4 flex flex-col gap-3 sm:hidden">
              <a
                href="https://www.holytrinitycarmel.com/#0"
                target="_blank"
                rel="noreferrer"
                className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-center text-[12px] uppercase tracking-[2px] text-white transition hover:bg-pink-500 hover:text-black"
              >
                Tentang KTM
              </a>
              <a
                href="https://www.instagram.com/p/DH-9ucSBeF-/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
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
            </div>
          )}
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
      <footer className="mt-auto py-8 text-[11px] text-neutral-300 tracking-[2px] text-center relative z-10">
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
          <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#111] p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[4px] text-pink-500">Poster Jersey KTM</p>
                <h2 className="mt-2 text-xl font-semibold text-white">Coming Soon</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowJerseyModal(false)}
                className="rounded-full border border-neutral-700 px-3 py-2 text-sm text-neutral-300 transition hover:border-pink-500 hover:text-white"
              >
                Tutup
              </button>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-linear-to-br from-pink-500 via-purple-500 to-cyan-400 p-8 text-white shadow-[0_0_90px_rgba(236,72,153,0.24)]">
              <div className="mx-auto mb-5 h-52 w-full max-w-70 rounded-[2rem] bg-white/10 border border-white/20" />
              <p className="text-center text-sm leading-6 text-white/90">
                Poster design jualan jersey akan segera hadir. Untuk sekarang, ini adalah placeholder gradien dengan shape modern.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}