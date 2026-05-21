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

type Result = { success: boolean; message?: string; playerNumber?: string };

export async function submitRegistration(data: FormData): Promise<Result> {
  const url = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

  if (!url || url.includes("YOUR_SCRIPT_ID")) {
    return {
      success: true,
      playerNumber: "001",
    };
  }

  const sanitizePhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    // Prefix ' agar Google Sheets tidak konversi ke angka
    return digits.startsWith("0") ? `'${digits}` : digits;
  };

  try {
    const payload = {
      source: "faith-game-web",       // ✅ Wajib ada untuk lolos validasi
      nama: `${data.firstName} ${data.lastName}`,
      email: data.email,
      telepon: sanitizePhone(data.telepon),
      umur: data.umur,
      domisili: data.domisili,
      anggota: data.anggota,
      informan: data.informan,
      camping: data.camping,
    };

    // ✅ Kirim sebagai JSON agar Apps Script bisa JSON.parse(e.postData.contents)
    const response = await fetch(url, {
      method: "POST",
      // ✅ Hapus mode: "no-cors" agar response bisa dibaca
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.success) {
      // Ambil player number dari registrationId yang dikembalikan Apps Script
      // Format: "B2B-001" → ambil bagian angkanya
      const playerNumber = result.registrationId
        ? result.registrationId.split("-")[1]
        : "000";

      return { success: true, playerNumber };
    }

    return {
      success: false,
      message: result.message || "Pendaftaran gagal.",
    };

  } catch {
    return { success: false, message: "Gagal mengirim. Coba lagi." };
  }
}