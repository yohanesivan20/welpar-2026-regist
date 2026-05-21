"use client";

import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  LogOut,
} from "lucide-react";

const menus = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Participants",
    href: "/admin/participants",
    icon: Users,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-[#222] bg-[#111]">
      <div className="h-16 flex items-center justify-center px-6 border-b border-[#222]">
        <Image src="/images/logo/Faith Game - White - Horizontal.png" alt="KTM Logo" width={160} height={40} className="object-cover" />
      </div>

      <nav className="p-4 flex flex-col gap-2">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <Link
              key={menu.name}
              href={menu.href}
              className="
                flex items-center gap-3
                px-4 py-3 rounded-lg
                hover:bg-pink-500/10
                hover:text-pink-500
                transition
              "
            >
              <Icon size={18} />
              <span>{menu.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}