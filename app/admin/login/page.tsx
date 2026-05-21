"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import toast from "react-hot-toast";

import {
  Lock,
  Loader2,
} from "lucide-react";

export default function LoginPage() {

  const router =
    useRouter();

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin =
  async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    // =========================
    // VALIDATION
    // =========================

    if (
      !email.trim() ||
      !password.trim()
    ) {

      toast.error(
        "Email dan password wajib diisi"
      );

      return;
    }

    setLoading(true);

    try {

      const res =
        await fetch(
          "/api/login",
          {
            method: "POST",
            credentials: "same-origin",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              email: email.trim(),
              password: password.trim(),
            }),
          }
        );

      if (!res.ok) {

        const result =
          await res.json();

        toast.error(
          result.message ||
          "Login gagal"
        );

        return;
      }

      const result =
        await res.json();

      if (!result.success) {

        toast.error(
          result.message ||
          "Login gagal"
        );

        return;
      }

      toast.success(
        "Login berhasil"
      );

      // =========================
      // REDIRECT TO PROTECTED
      // =========================

      router.push(
        "/admin/participants"
      );

      router.refresh();

    } catch (err) {

      console.error(
        "Login error:",
        err
      );

      toast.error(
        "Terjadi kesalahan. Coba lagi."
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-black
      px-4
    ">

      <div className="
        w-full
        max-w-md
        bg-[#111]
        border
        border-[#222]
        rounded-3xl
        p-8
      ">

        <div className="
          flex
          justify-center
          mb-6
        ">

          <div className="
            w-16
            h-16
            rounded-2xl
            bg-pink-500/10
            flex
            items-center
            justify-center
          ">
            <Lock
              size={30}
              className="
                text-pink-500
              "
            />
          </div>
        </div>

        <h1 className="
          text-3xl
          font-bold
          text-center
          mb-2
          text-neutral-400
        ">
          Admin Login
        </h1>

        <p className="
          text-neutral-400
          text-center
          mb-8
        ">
          Faith Game Dashboard
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>
            <label
              htmlFor="email"
              className="
              text-sm
              text-neutral-400
              mb-2
              block
            ">
              Email
            </label>

            <input
              id="email"
              type="email"

              value={email}

              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }

              disabled={loading}

              className="
                w-full
                bg-black
                border
                border-[#222]
                text-neutral-500
                rounded-xl
                px-4
                py-3
                outline-none
                focus:border-pink-500
                disabled:opacity-50
                disabled:cursor-not-allowed
                transition
              "

              placeholder="email@gmail.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="
              text-sm
              text-neutral-400
              mb-2
              block
            ">
              Password
            </label>

            <input
              id="password"
              type="password"

              value={password}

              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }

              disabled={loading}

              className="
                w-full
                bg-black
                border
                border-[#222]
                text-neutral-500
                rounded-xl
                px-4
                py-3
                outline-none
                focus:border-pink-500
                disabled:opacity-50
                disabled:cursor-not-allowed
                transition
              "

              placeholder="********"
            />
          </div>

          <button
            type="submit"

            disabled={loading}

            className="
              w-full
              bg-pink-500
              hover:bg-pink-600
              disabled:bg-pink-500/50
              disabled:cursor-not-allowed
              rounded-xl
              py-3
              font-semibold
              transition
              flex
              items-center
              justify-center
              gap-2
            "
          >

            {loading ? (
              <>
                <Loader2
                  size={18}
                  className="
                    animate-spin
                  "
                />
                <span>
                  Loading...
                </span>
              </>
            ) : (
              "Login"
            )}

          </button>

        </form>
      </div>
    </div>
  );
}