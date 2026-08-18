"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

type Participant = {
  Camping?: string;
};

type Props = {
  data: Participant[];
  isLoading?: boolean;
};

const campingOptions = [
  "Belum Pernah",
  "Pernah di Tumpang",
  "Pernah di Cikanyere",
  "Pernah di Tempat Lain",
];

const COLORS = ["#ec4899", "#8b5cf6", "#3b82f6", "#22c55e"];

export default function CampingChart({
  data,
  isLoading,
}: Props) {
  const chartData = campingOptions.map((option) => ({
    name: option,
    value: data.filter((participant) => participant.Camping === option).length,
  }));

  if (isLoading) {
    return (
      <div className="bg-[#111] border border-[#222] rounded-2xl p-6 h-[400px] flex items-center justify-center text-neutral-400">
        Memuat chart...
      </div>
    );
  }

  return (
    <div className="bg-[#111] border border-[#222] rounded-2xl p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Riwayat Camping Peserta
        </h2>

        <p className="text-sm text-neutral-400">
          Distribusi peserta berdasarkan pengalaman camping.
        </p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, value }) => `${name}: ${value}`}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {chartData.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: COLORS[index],
                }}
              />

              <span className="text-neutral-400">
                {item.name}
              </span>
            </div>

            <span className="font-semibold">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}