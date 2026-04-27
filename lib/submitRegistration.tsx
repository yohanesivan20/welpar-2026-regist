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
};

type Result = { success: boolean; message?: string; playerNumber?: string };

export async function submitRegistration(data: FormData): Promise<Result> {
  const url = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

  if (!url || url.includes("YOUR_SCRIPT_ID")) {
    await new Promise(r => setTimeout(r, 1500));
    return {
      success: true,
      playerNumber: String(Math.floor(Math.random() * 456) + 1).padStart(3, "0"),
    };
  }

  try {
    const fd = new FormData();
    fd.append("nama", `${data.firstName} ${data.lastName}`);
    fd.append("email", data.email);
    fd.append("telepon", data.telepon);
    fd.append("umur", data.umur);
    fd.append("domisili", data.domisili);
    fd.append("anggota", data.anggota);
    fd.append("informan", data.informan);
    fd.append("camping", data.camping);
    fd.append("timestamp", new Date().toISOString());

    await fetch(url, { method: "POST", body: fd, mode: "no-cors" });

    let hash = 0;
    for (const c of data.email) {
      hash = ((hash << 5) - hash + c.charCodeAt(0)) | 0;
    }
    return {
      success: true,
      playerNumber: String((Math.abs(hash) % 456) + 1).padStart(3, "0"),
    };
  } catch {
    return { success: false, message: "Gagal mengirim. Coba lagi." };
  }
}