import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import MusicProvider from "@/components/MusicProvider";

export const metadata: Metadata = {
  title: "Stay Sane or Fall Apart — Event Registration",
  description: "Daftarkan dirimu. 456 slot tersedia. Siapa yang bertahan?",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" data-scroll-behavior="smooth">
      <body>
        <MusicProvider>{children}</MusicProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#111",
              color: "#fff",
              border: "1px solid #E53935",
              fontFamily: "'Noto Sans KR', sans-serif",
            },
            success: { iconTheme: { primary: "#E53935", secondary: "#fff" } },
            error: { iconTheme: { primary: "#E53935", secondary: "#fff" } },
          }}
        />
      </body>
    </html>
  );
}