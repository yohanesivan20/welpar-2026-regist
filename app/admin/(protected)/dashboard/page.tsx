"use client";

import { useEffect, useState, useCallback } from "react";
import { Users, UserCheck, Clock, Loader2 } from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`/api/participants?t=${Date.now()}`);
      const data = await res.json();
      setStats(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  // =========================
  // COMPUTE STATS
  // =========================

  const total = stats.length;

  const totalCheckIn = stats.filter(
    (p: any) => p.Status === "Hadir"
  ).length;

  const totalCheckInPercentage =
    total > 0 ? Math.round((totalCheckIn / total) * 100) : 0;

  const cards = [
    {
      title: "Total Peserta",
      value: total,
      icon: Users,
    },
    {
      title: "Sudah Hadir",
      value: totalCheckIn,
      icon: UserCheck,
    },
    {
      title: "Persentase Kehadiran",
      value: `${totalCheckInPercentage}%`,
      icon: Clock,
    },
  ];

  // =========================
  // LOADING STATE
  // =========================

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-neutral-400">
        <Loader2 className="animate-spin mr-2" size={20} />
        Memuat data...
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-neutral-400">Monitor registrasi event</p>
        </div>

        {/* ✅ Live indicator */}
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

      <div className="grid md:grid-cols-3 gap-5">
        {cards.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-[#111] border border-[#222] rounded-2xl p-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-neutral-400 text-sm">{item.title}</p>
                  <h2 className="text-4xl font-bold mt-2">{item.value}</h2>
                </div>

                <div className="w-14 h-14 rounded-xl bg-pink-500/10 flex items-center justify-center">
                  <Icon size={28} className="text-pink-500" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}