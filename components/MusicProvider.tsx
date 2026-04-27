"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const YOUTUBE_VIDEO_ID = "SbAKYgfYET8";

interface MusicContextValue {
  playerReady: boolean;
  isPlaying: boolean;
  toggleMusic: () => void;
}

const MusicContext = createContext<MusicContextValue | undefined>(undefined);

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within MusicProvider");
  }
  return context;
}

export default function MusicProvider({ children }: { children: React.ReactNode }) {
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
          autoplay: 1,
          playsinline: 1,
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
          onReady: (event: any) => {
            setPlayerReady(true);
            try {
              event.target.playVideo();
            } catch (error) {
              console.warn("Autoplay blocked or failed:", error);
              try {
                event.target.mute();
                event.target.playVideo();
              } catch (muteError) {
                console.warn("Muted autoplay also failed:", muteError);
              }
            }
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

  const toggleMusic = () => {
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
    <MusicContext.Provider value={{ playerReady, isPlaying, toggleMusic }}>
      {children}
      <div className="pointer-events-none opacity-0 absolute left-0 top-0 h-0 w-0 overflow-hidden">
        <div ref={playerRef} />
      </div>
    </MusicContext.Provider>
  );
}
