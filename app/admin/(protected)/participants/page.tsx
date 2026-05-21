"use client";

import { useEffect, useState, useCallback } from "react";
import ParticipantsTable from "@/components/admin/ParticipantsTable";
import { Loader2 } from "lucide-react";

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchParticipants = useCallback(async () => {
    try {
      // ✅ Tambahkan ?t= agar tidak kena browser cache
      const res = await fetch(`/api/participants?t=${Date.now()}`);
      const data = await res.json();
      setParticipants(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Failed to fetch participants:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Fetch pertama kali
    fetchParticipants();

    // ✅ Auto-refresh setiap 5 detik
    const interval = setInterval(fetchParticipants, 5000);

    // Cleanup saat unmount
    return () => clearInterval(interval);
  }, [fetchParticipants]);

  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Participants</h1>
          <p className="text-neutral-400">
            Absensi Kehadiran Peserta Faith Game - KTM Muda Mudi Jakarta
          </p>
        </div>

        {/* ✅ Indikator last updated */}
        <div className="flex items-center gap-2 text-xs text-neutral-500 mt-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          {lastUpdated
            ? `Updated ${lastUpdated.toLocaleTimeString("id-ID")}`
            : "Connecting..."}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-neutral-400">
          <Loader2 className="animate-spin mr-2" size={20} />
          Memuat data...
        </div>
      ) : (
        <ParticipantsTable data={participants} />
      )}
    </div>
  );
}