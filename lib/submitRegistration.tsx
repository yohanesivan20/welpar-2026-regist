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

  const generatePlayerNumber = (count: number) => {
    return String(count + 1).padStart(3, "0");
  };

  if (!url || url.includes("YOUR_SCRIPT_ID")) {
    await new Promise((r) => setTimeout(r, 1500));
    const fallbackNumber = generatePlayerNumber(0);
    return {
      success: true,
      playerNumber: fallbackNumber,
    };
  }

  try {
    const countResponse = await fetch(url);
    const countData = await countResponse.json();
    const currentRegistered = Number(countData.registered || 0);
    const playerNumber = generatePlayerNumber(currentRegistered);

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
    fd.append("playerNumber", playerNumber);

    await fetch(url, { method: "POST", body: fd, mode: "no-cors" });

    return {
      success: true,
      playerNumber,
    };
  } catch {
    return { success: false, message: "Gagal mengirim. Coba lagi." };
  }
}