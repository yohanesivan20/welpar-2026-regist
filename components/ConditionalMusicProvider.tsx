"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import MusicProvider from "@/components/MusicProvider";

export default function ConditionalMusicProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return <>{children}</>;
  }

  return <MusicProvider>{children}</MusicProvider>;
}
