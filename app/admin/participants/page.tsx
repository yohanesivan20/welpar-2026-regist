import { getRegistrations } from "@/lib/getRegistrations";
import ParticipantsTable from "@/components/admin/ParticipantsTable";

export default async function ParticipantsPage() {
  const participants =
    await getRegistrations();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Participants
        </h1>

        <p className="text-neutral-400">
          Absensi Kehadiran Peserta Faith Game - KTM Muda Mudi Jakarta
        </p>
      </div>

      <ParticipantsTable
        data={participants}
      />
    </div>
  );
}