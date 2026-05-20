import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import MusicProvider from "@/components/MusicProvider";

const maxSlots = process.env.NEXT_PUBLIC_MAX_SLOTS || "156";

export const metadata: Metadata = {
  title: "Stay Sane or Fall Apart — Event Registration",
  description: `Daftarkan dirimu. ${maxSlots} slot tersedia. Siapa yang bertahan?`,
  icons: {
    icon: "/images/logo/ktm-logo-compressed.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" data-scroll-behavior="smooth">
      <body>
        <MusicProvider>{children}</MusicProvider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#111",
              color: "#fff",
              border: "1px solid #222",
            },

            success: {
              iconTheme: {
                primary: "#22c55e",
                secondary: "#111",
              },
            },

            error: {
              iconTheme: {
                primary: "#ec4899",
                secondary: "#111",
              },
            },
          }}
        />
      </body>
    </html>
  );
}