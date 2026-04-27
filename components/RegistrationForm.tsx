"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitRegistration } from "@/lib/submitRegistration";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  telepon: string;
  umur: string;
  domisili: string;
  anggota: string;
  informan: string;
  camping: string;
  agreeTerms: boolean;
  playerNumber?: string;
};

const inputClass =
  "bg-[#111] border-[#222] text-white placeholder:text-neutral-500 " +
  "focus:border-pink-500 focus-visible:ring-0 focus-visible:ring-offset-0 rounded h-10";

const labelClass = "text-[9px] tracking-[2px] text-neutral-300 uppercase mb-1 block";
const errorClass = "text-[11px] text-pink-500 mt-1";

// Pilihan select
const DOMISILI_OPTIONS = [
    "Jakarta Utara",
    "Jakarta Timur",
    "Jakarta Selatan",
    "Jakarta Barat",
    "Jakarta Pusat",
    "Bekasi",
    "Tangerang",
    "Lainnya",
];

const ANGGOTA_OPTIONS = [
  "Belum Bergabung KTM",
  "Anggota KTM",
];

const INFORMAN_OPTIONS = [
  "Sosial Media",
  "Keluarga / Kerabat",
  "Camping Rohani",
  "Teman",
  "Lainnya",
];

const CAMPING_OPTIONS = [
  "Belum Pernah",
  "Pernah di Tumpang",
  "Pernah di Cikanyere",
  "Pernah di Tempat Lain",
];

// Komponen Select reusable
function FormSelect({
  label,
  required,
  options,
  error,
  onValueChange,
  placeholder = "Pilih...",
}: {
  label: string;
  required?: boolean;
  options: string[];
  error?: string;
  onValueChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <Label className={labelClass}>
        {label} {required && <span className="text-pink-500">*</span>}
      </Label>
      <Select onValueChange={onValueChange}>
        <SelectTrigger
          className={`${inputClass} w-full text-sm`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-[#111] border-[#222] text-white">
          {options.map((opt) => (
            <SelectItem
              key={opt}
              value={opt}
              className="focus:bg-pink-500/20 focus:text-white"
            >
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className={errorClass}>{error}</p>}
    </div>
  );
}

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [playerNumber, setPlayerNumber] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const res = await submitRegistration(data);
      if (res.success) {
        setPlayerNumber(res.playerNumber || "000");
        setSuccess(true);
        reset();
        toast.success("Pendaftaran berhasil! Selamat datang di arena.");
      } else {
        toast.error(res.message || "Terjadi kesalahan.");
      }
    } catch {
      toast.error("Gagal menghubungi server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const setSelect = (field: keyof FormData) => (value: string) => {
    setValue(field, value, { shouldValidate: true });
  };

  return (
    <AnimatePresence mode="wait">
      {success ? (
        /* ===== SUCCESS STATE ===== */
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="relative text-center"
        >

          <motion.div
            className="flex justify-center gap-4 text-2xl text-pink-500/50 mb-6"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>◯</span>
            <span>△</span>
            <span>□</span>
          </motion.div>

          <p className="text-[9px] tracking-[4px] text-neutral-300 uppercase mb-2">
            PLAYER NUMBER
          </p>
          <motion.p
            className="font-['Black_Han_Sans'] text-5xl sm:text-6xl text-pink-500 leading-none mb-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            #{playerNumber}
          </motion.p>
          <h2 className="font-['Black_Han_Sans'] text-neutral-300 text-xl sm:text-2xl mb-3">
            Kamu Sudah Terdaftar
          </h2>
          <div className="flex w-full max-w-xs flex-col gap-3 mx-auto mb-6">
            <a
              href=""
              className="inline-flex w-full items-center justify-center rounded-full border border-pink-500 bg-pink-500/10 px-5 py-3 text-sm font-semibold uppercase tracking-[2px] text-pink-500 transition hover:bg-pink-500 hover:text-black"
              aria-label="Gabung grup WhatsApp"
            >
              Gabung ke WhatsApp Group
            </a>
            <Button
              variant="outline"
              className="w-full border-neutral-800 text-neutral-400 hover:border-pink-500 hover:text-pink-500 bg-transparent text-[11px] tracking-[3px] uppercase"
              onClick={() => setSuccess(false)}
            >
              Daftarkan Peserta Lain
            </Button>
          </div>
        </motion.div>
      ) : (
        /* ===== FORM STATE ===== */
        <motion.section
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative overflow-hidden"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* ── Nama ── */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <Label className={labelClass}>
                  Nama Depan <span className="text-pink-500">*</span>
                </Label>
                <Input
                  className={inputClass}
                  placeholder="Nama Depan"
                  {...register("firstName", {
                    required: "Wajib diisi",
                    minLength: { value: 2, message: "Min 2 karakter" },
                  })}
                />
                {errors.firstName && (
                  <p className={errorClass}>{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <Label className={labelClass}>
                  Nama Belakang <span className="text-pink-500">*</span>
                </Label>
                <Input
                  className={inputClass}
                  placeholder="Nama Belakang"
                  {...register("lastName", { required: "Wajib diisi" })}
                />
                {errors.lastName && (
                  <p className={errorClass}>{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* ── Email ── */}
            <div>
              <Label className={labelClass}>
                Email <span className="text-pink-500">*</span>
              </Label>
              <Input
                type="email"
                className={inputClass}
                placeholder="player@gmail.com"
                {...register("email", {
                  required: "Wajib diisi",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Format email tidak valid",
                  },
                })}
              />
              {errors.email && (
                <p className={errorClass}>{errors.email.message}</p>
              )}
            </div>

            {/* ── Telepon ── */}
            <div>
              <Label className={labelClass}>
                No. Telepon <span className="text-pink-500">*</span>
              </Label>
              <Input
                type="tel"
                className={inputClass}
                placeholder="08xxxxxxxxxx"
                {...register("telepon", {
                  required: "Wajib diisi",
                  pattern: {
                    value: /^(\+62|62|0)[0-9]{8,13}$/,
                    message: "Format nomor tidak valid",
                  },
                })}
              />
              {errors.telepon && (
                <p className={errorClass}>{errors.telepon.message}</p>
              )}
            </div>

            {/* ── Umur + Domisili ── */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <Label className={labelClass}>
                  Tanggal Lahir <span className="text-pink-500">*</span>
                </Label>
                <Input
                  type="date"
                  className={`${inputClass} date-input`}
                  {...register("umur", {
                    required: "Pilih tanggal lahir",
                  })}
                />
                {errors.umur && (
                  <p className={errorClass}>{errors.umur.message}</p>
                )}
              </div>
              <div>
                <input
                  type="hidden"
                  {...register("domisili", { required: "Pilih domisili" })}
                />
                <FormSelect
                  label="Domisili"
                  required
                  options={DOMISILI_OPTIONS}
                  error={errors.domisili?.message}
                  onValueChange={setSelect("domisili")}
                />
              </div>
            </div>

            {/* ── Anggota KTM ── */}
            <div>
              <input
                type="hidden"
                {...register("anggota", { required: "Pilih status keanggotaan" })}
              />
              <FormSelect
                label="Status Keanggotaan KTM"
                required
                options={ANGGOTA_OPTIONS}
                error={errors.anggota?.message}
                onValueChange={setSelect("anggota")}
              />
            </div>

            {/* ── Informan + Camping ── */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <input
                  type="hidden"
                  {...register("informan", { required: "Pilih sumber info" })}
                />
                <FormSelect
                  label="Tahu dari mana?"
                  required
                  options={INFORMAN_OPTIONS}
                  error={errors.informan?.message}
                  onValueChange={setSelect("informan")}
                />
              </div>
              <div>
                <input
                  type="hidden"
                  {...register("camping", { required: "Pilih pengalaman camping" })}
                />
                <FormSelect
                  label="Pengalaman Camping"
                  required
                  options={CAMPING_OPTIONS}
                  error={errors.camping?.message}
                  onValueChange={setSelect("camping")}
                />
              </div>
            </div>

            {/* ── Terms ── */}
            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                className="border-neutral-700 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500 mt-1.5 shrink-0"
                onCheckedChange={(v) =>
                  setValue("agreeTerms", Boolean(v), { shouldValidate: true })
                }
              />
              <div>
                <label
                  htmlFor="terms"
                  className="text-[12px] text-neutral-400 leading-5 cursor-pointer"
                >
                  Saya menyetujui{" "}
                  <a href="#" className="text-pink-500 hover:underline">
                    Syarat & Ketentuan
                  </a>{" "}
                  dan bersedia mengikuti seluruh rangkaian acara.
                </label>
                <input
                  type="hidden"
                  {...register("agreeTerms", {
                    validate: (v) => v === true || "Harus disetujui terlebih dahulu",
                  })}
                />
                {errors.agreeTerms && (
                  <p className={errorClass}>{errors.agreeTerms.message}</p>
                )}
              </div>
            </div>

            {/* ── Submit ── */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-pink-500 hover:bg-pink-600 active:scale-[0.99] text-white font-['Black_Han_Sans'] tracking-[4px] text-sm rounded py-6 mt-1 transition-all"
            >
              {isSubmitting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  <span>STEP INTO THE GAME</span>
                  <ChevronRight size={14} className="" />
                </>
              )}
            </Button>

            <p className="text-[11px] text-neutral-400 text-center">
              Data kamu aman dan hanya digunakan untuk keperluan event.
            </p>
          </form>
        </motion.section>
      )}
    </AnimatePresence>
  );
}