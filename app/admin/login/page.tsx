"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      window.location.href =
        "/admin/dashboard";
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#111] border border-[#222] rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-pink-500 mb-2">
          Admin Login
        </h1>

        <p className="text-center text-neutral-400 text-sm mb-8">
          Login untuk mengakses dashboard
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <div>
            <label className="text-sm mb-2 block">
              Email
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-3 text-neutral-500"
              />

              <Input
                type="email"
                placeholder="admin@email.com"
                className="pl-10 bg-black border-[#222]"
              />
            </div>
          </div>

          <div>
            <label className="text-sm mb-2 block">
              Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-3 text-neutral-500"
              />

              <Input
                type="password"
                placeholder="********"
                className="pl-10 bg-black border-[#222]"
              />
            </div>
          </div>

          <Button
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600"
          >
            {loading
              ? "Loading..."
              : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}