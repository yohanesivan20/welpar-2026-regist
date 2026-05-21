"use client";

import {
  useRouter,
} from "next/navigation";

import toast from "react-hot-toast";

import {
  LogOut,
} from "lucide-react";

export default function Navbar() {

  const router =
    useRouter();

  const handleLogout =
  async () => {

    try {

      const res =
        await fetch(
          "/api/logout",
          {
            method: "POST",
            credentials: "same-origin",
          }
        );

      if (!res.ok) {
        throw new Error(
          "Logout failed"
        );
      }

      const result =
        await res.json();

      if (!result.success) {
        toast.error(
          "Gagal logout"
        );
        return;
      }

      toast.success(
        "Logout berhasil"
      );

      // =========================
      // REDIRECT TO LOGIN
      // =========================

      router.push(
        "/admin/login"
      );

      router.refresh();

    } catch (err) {

      console.error(
        "Logout error:",
        err
      );

      toast.error(
        "Terjadi kesalahan saat logout"
      );
    }
  };

  return (
    <header className="
      h-16
      border-b
      border-[#222]
      bg-[#111]
      px-6
      flex
      items-center
      justify-between
    ">

      {/* LEFT */}

      <div>
        <h2 className="
          font-semibold
          text-lg
        ">
          Event Dashboard
        </h2>
      </div>

      {/* RIGHT */}

      <div className="
        flex
        items-center
        gap-4
      ">

        {/* PROFILE */}

        <div className="
          w-10
          h-10
          rounded-full
          bg-pink-500
          flex
          items-center
          justify-center
          font-bold
        ">
          A
        </div>

        {/* LOGOUT BUTTON */}

        <button
          onClick={handleLogout}

          className="
            flex
            items-center
            gap-2

            px-4
            py-2

            rounded-xl

            bg-red-500/10
            text-red-400

            hover:bg-red-500/20

            transition
          "
        >

          <LogOut size={18} />

          <span className="text-sm">
            Logout
          </span>

        </button>

      </div>
    </header>
  );
}