"use client";

import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}