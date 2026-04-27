import Link from "next/link";
import ShapesBackground from "@/components/ShapesBackground";
import RegistrationForm from "@/components/RegistrationForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 py-8 relative sm:py-10">
      <ShapesBackground />
      <div className="w-full max-w-2xl relative z-10">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] tracking-[3px] text-pink-500 uppercase font-bold mb-2">
              Masuk ke Arena
            </p>
            <h1 className="text-2xl sm:text-3xl font-['Black_Han_Sans'] tracking-tight text-black">
              Formulir Pendaftaran
            </h1>
          </div>
          <Link
            href="/"
            className="inline-flex rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-2 text-xs sm:text-sm uppercase tracking-[2px] text-neutral-300 transition hover:border-pink-500 hover:text-white whitespace-nowrap"
          >
            ← Kembali
          </Link>
        </div>
        <div className="bg-[#0d0d0d] border border-[#1c1c1c] rounded-2xl px-6 py-8 sm:px-10 sm:py-10">
          <RegistrationForm />
        </div>
      </div>
      <footer className="mt-auto py-8 text-[11px] text-neutral-300 tracking-[2px] text-center relative z-10">
        <div className="mb-3 text-sm text-neutral-400">
          Follow kami: 
          <a
            href="https://www.instagram.com/ktmmmjkt/"
            target="_blank"
            rel="noreferrer"
            className="text-pink-500 hover:underline"
          >
            @ktmmmjkt
          </a>
          <span className="mx-2">•</span>
          <a
            href="https://www.instagram.com/b2bktmjkt/"
            target="_blank"
            rel="noreferrer"
            className="text-pink-500 hover:underline"
          >
            @b2bktmjkt
          </a>
        </div>
        ◯ △ □ &nbsp; © 2026 Stay Sane or Fall Apart &nbsp; ◯ △ □
        <div className="mt-2">KTM Muda Mudi Jakarta 2026</div>
      </footer>
    </main>
  );
}
