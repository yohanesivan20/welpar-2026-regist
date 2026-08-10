"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import ParticipantsTable from "@/components/admin/ParticipantsTable";
import { Loader2 } from "lucide-react";

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Mencegah fetch bersamaan
  const fetchingRef = useRef(false);

  const fetchParticipants = useCallback(async () => {
    if (fetchingRef.current) return;

    fetchingRef.current = true;

    try {
      const res = await fetch(
        `/api/participants?t=${Date.now()}`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch participants");
      }

      const data = await res.json();

      setParticipants(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Failed to fetch participants:", err);
    } finally {
      fetchingRef.current = false;
      setLoading(false);
    }
  }, []);

  // Fetch hanya ketika halaman pertama kali dibuka
  useEffect(() => {
    fetchParticipants();
  }, [fetchParticipants]);

  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Participants
          </h1>

          <p className="text-neutral-400">
            Absensi Kehadiran Peserta Faith Game - KTM Muda Mudi Jakarta
          </p>
        </div>

        <div className="mt-1 flex items-center gap-2 text-xs text-neutral-500">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>

          {lastUpdated
            ? `Updated ${lastUpdated.toLocaleTimeString("id-ID")}`
            : "Connecting..."}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-neutral-400">
          <Loader2
            className="mr-2 animate-spin"
            size={20}
          />
          Memuat data...
        </div>
      ) : (
        <ParticipantsTable
          data={participants}
          onRefresh={fetchParticipants}
        />
      )}
    </div>
  );
}