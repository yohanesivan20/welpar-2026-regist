"use client";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const YOUTUBE_VIDEO_ID = "SbAKYgfYET8";

export default function MusicPlayer() {
  const [playerReady, setPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstance = useRef<any>(null);

  useEffect(() => {
    const loadYouTubeApi = () => {
      if (window.YT && window.YT.Player) {
        return Promise.resolve();
      }

      return new Promise<void>((resolve) => {
        window.onYouTubeIframeAPIReady = () => resolve();

        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        document.body.appendChild(script);
      });
    };

    loadYouTubeApi().then(() => {
      if (!playerRef.current || !window.YT) {
        return;
      }

      playerInstance.current = new window.YT.Player(playerRef.current, {
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: YOUTUBE_VIDEO_ID,
          modestbranding: 1,
          rel: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: () => {
            setPlayerReady(true);
          },
          onStateChange: (event: any) => {
            setIsPlaying(event.data === 1);
          },
        },
      });
    });

    return () => {
      if (window.onYouTubeIframeAPIReady) {
        delete window.onYouTubeIframeAPIReady;
      }
    };
  }, []);

  const togglePlayback = () => {
    if (!playerReady || !playerInstance.current) {
      return;
    }

    if (isPlaying) {
      playerInstance.current.pauseVideo();
    } else {
      playerInstance.current.playVideo();
    }
  };

  return (
    <section className="mt-8 overflow-hidden rounded-3xl border border-[#1c1c1c] bg-[#0d0d0d] px-6 py-8 sm:px-10 sm:py-10">
      <div className="mb-6 text-center">
        <p className="text-[11px] tracking-[4px] text-pink-500 uppercase font-bold mb-2">
          Music
        </p>
        <h2 className="text-2xl sm:text-3xl font-['Black_Han_Sans'] tracking-tight text-white">
          Musik Latar Belakang
        </h2>
      </div>

      <div className="flex flex-col items-center gap-4 rounded-3xl border border-[#222] bg-[#111] p-6">
        <p className="text-center text-sm text-neutral-400">
          Lagu akan diputar di latar belakang tanpa tampilan video. Klik tombol di bawah untuk mulai.
        </p>

        <button
          type="button"
          onClick={togglePlayback}
          disabled={!playerReady}
          className="inline-flex items-center justify-center rounded-full bg-pink-500 px-6 py-3 text-sm font-semibold uppercase tracking-[2px] text-black transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPlaying ? "Pause Music" : "Play Music"}
        </button>
      </div>

      <div className="pointer-events-none opacity-0 absolute left-0 top-0 h-0 w-0 overflow-hidden">
        <div ref={playerRef} />
      </div>
    </section>
  );
}
