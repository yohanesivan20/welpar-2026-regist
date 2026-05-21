"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

type Participant = {
  Nama: string;
  Domisili: string;
  Anggota: string;
  Status: string;
};

type Props = {
  data: Participant[];
  isLoading?: boolean;
};

// =========================
// CUSTOM TOOLTIP
// =========================

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 shadow-xl">
      <p className="text-xs text-neutral-400 mb-1">{label}</p>
      <p className="text-white font-semibold text-sm">
        {payload[0].value}{" "}
        <span className="text-neutral-400 font-normal">peserta</span>
      </p>
    </div>
  );
};

// =========================
// SKELETON
// =========================

const Skeleton = () => (
  <div className="animate-pulse space-y-3 pt-4">
    {[80, 65, 50, 40, 30].map((w, i) => (
      <div key={i} className="flex items-center gap-3">
        <div className="h-3 bg-[#222] rounded w-20 shrink-0" />
        <div
          className="h-7 bg-[#222] rounded-lg"
          style={{ width: `${w}%` }}
        />
      </div>
    ))}
  </div>
);

// =========================
// COMPONENT
// =========================

export default function DomisiliChart({ data, isLoading }: Props) {
  const chartData = useMemo(() => {
    if (!data?.length) return [];

    const map = new Map<string, number>();
    data.forEach((p) => {
      const key = p.Domisili || "Tidak diketahui";
      map.set(key, (map.get(key) ?? 0) + 1);
    });

    return Array.from(map.entries())
      .map(([domisili, total]) => ({ domisili, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5); // Top 5
  }, [data]);

  const maxValue = useMemo(
    () => Math.max(...chartData.map((d) => d.total), 0),
    [chartData]
  );

  return (
    <div className="bg-[#111] border border-[#222] rounded-2xl p-6">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[10px] tracking-[3px] text-neutral-500 uppercase mb-1">
          Breakdown
        </p>
        <h3 className="text-white font-semibold text-lg">By Domisili</h3>
        <p className="text-neutral-500 text-xs mt-0.5">Top 5 kota terbanyak</p>
      </div>

      {/* Chart */}
      {isLoading ? (
        <Skeleton />
      ) : chartData.length === 0 ? (
        <div className="flex items-center justify-center h-48 text-neutral-600 text-sm">
          Belum ada data
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
            barCategoryGap="30%"
          >
            <CartesianGrid
              horizontal={false}
              strokeDasharray="3 3"
              stroke="#1f1f1f"
            />
            <XAxis
              type="number"
              tick={{ fill: "#525252", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              domain={[0, maxValue + 1]}
              allowDecimals={false}
            />
            <YAxis
              type="category"
              dataKey="domisili"
              tick={{ fill: "#a3a3a3", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={90}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
            />
            <Bar dataKey="total" radius={[0, 6, 6, 0]} maxBarSize={28}>
              {chartData.map((entry, index) => (
                <Cell
                  key={entry.domisili}
                  // Opacity gradient — bar terbesar paling terang
                  fill={`rgba(236, 72, 153, ${1 - index * 0.15})`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}