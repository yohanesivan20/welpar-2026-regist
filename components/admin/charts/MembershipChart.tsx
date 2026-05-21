"use client";

import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
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

const COLORS = {
  member: "rgba(236, 72, 153, 0.85)",   // pink — Anggota KTM
  non: "rgba(82, 82, 82, 0.85)",         // neutral — Non Anggota
};

// =========================
// CUSTOM TOOLTIP
// =========================

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const { name, value, percent } = payload[0].payload;

  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 shadow-xl">
      <p className="text-xs text-neutral-400 mb-1">{name}</p>
      <p className="text-white font-semibold text-sm">
        {value}{" "}
        <span className="text-neutral-400 font-normal">peserta</span>
      </p>
      <p className="text-pink-400 text-xs mt-0.5">
        {(percent * 100).toFixed(1)}%
      </p>
    </div>
  );
};

// =========================
// CUSTOM LABEL (center donut)
// =========================

const CenterLabel = ({
  cx,
  cy,
  total,
}: {
  cx: number;
  cy: number;
  total: number;
}) => (
  <>
    <text
      x={cx}
      y={cy - 8}
      textAnchor="middle"
      fill="#737373"
      fontSize={11}
      letterSpacing={2}
    >
      TOTAL
    </text>
    <text
      x={cx}
      y={cy + 16}
      textAnchor="middle"
      fill="#ffffff"
      fontSize={28}
      fontWeight={700}
    >
      {total}
    </text>
  </>
);

// =========================
// SKELETON
// =========================

const Skeleton = () => (
  <div className="flex flex-col items-center gap-4 py-4 animate-pulse">
    <div className="w-40 h-40 rounded-full bg-[#222]" />
    <div className="flex gap-4">
      <div className="h-3 w-24 bg-[#222] rounded" />
      <div className="h-3 w-24 bg-[#222] rounded" />
    </div>
  </div>
);

// =========================
// COMPONENT
// =========================

export default function MembershipChart({ data, isLoading }: Props) {
  const chartData = useMemo(() => {
    if (!data?.length) return [];

    const member = data.filter((p) => p.Anggota === "Anggota KTM").length;
    const non = data.length - member;

    return [
      { name: "Anggota KTM", value: member, color: COLORS.member },
      { name: "Non Anggota", value: non, color: COLORS.non },
    ].filter((d) => d.value > 0); // skip jika 0
  }, [data]);

  const total = useMemo(
    () => chartData.reduce((sum, d) => sum + d.value, 0),
    [chartData]
  );

  return (
    <div className="bg-[#111] border border-[#222] rounded-2xl p-6">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[10px] tracking-[3px] text-neutral-500 uppercase mb-1">
          Breakdown
        </p>
        <h3 className="text-white font-semibold text-lg">By Keanggotaan</h3>
        <p className="text-neutral-500 text-xs mt-0.5">
          Anggota KTM vs Non Anggota
        </p>
      </div>

      {/* Chart */}
      {isLoading ? (
        <Skeleton />
      ) : chartData.length === 0 ? (
        <div className="flex items-center justify-center h-48 text-neutral-600 text-sm">
          Belum ada data
        </div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={88}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
                // ✅ Render center label via prop
                label={false}
                labelLine={false}
                >
                {chartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                ))}
                </Pie>
                {/* ✅ Center label pakai layer terpisah */}
                <text x="50%" y="46%" textAnchor="middle" fill="#737373" fontSize={11} letterSpacing={2}>
                TOTAL
                </text>
                <text x="50%" y="58%" textAnchor="middle" fill="#ffffff" fontSize={28} fontWeight={700}>
                {total}
                </text>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-4">
            {chartData.map((entry) => {
              const pct =
                total > 0
                  ? ((entry.value / total) * 100).toFixed(1)
                  : "0";

              return (
                <div key={entry.name} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: entry.color }}
                  />
                  <div>
                    <p className="text-neutral-400 text-xs">{entry.name}</p>
                    <p className="text-white text-sm font-semibold">
                      {entry.value}{" "}
                      <span className="text-neutral-500 font-normal text-xs">
                        ({pct}%)
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}