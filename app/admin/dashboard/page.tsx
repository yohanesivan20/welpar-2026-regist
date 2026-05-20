import {
  Users,
  UserCheck,
  Clock,
} from "lucide-react";

import {
  getRegistrations as getDashboardStats,
} from "@/lib/getRegistrations";

export default async function DashboardPage() {

  const stats =
    await getDashboardStats();

  const total = stats.length;
  const totalCheckIn =
    stats.filter(
        (p: any) =>
        p.Status === "Hadir"
    ).length;

  const totalCheckInPercentage =
    total > 0
      ? Math.round(
          (totalCheckIn / total) * 100
        )
      : 0;

  const cards = [
    {
      title:
        "Total Peserta",

      value:
        total,

      icon: Users,
    },

    {
      title:
        "Sudah Hadir",

      value:
        totalCheckIn,

      icon: UserCheck,
    },

    {
      title:
        "Persentase Kehadiran",

      value:
        totalCheckInPercentage,

      icon: Clock,
    },
  ];

  return (
    <div className="space-y-6">

      <div>
        <h1 className="
          text-3xl
          font-bold
        ">
          Dashboard
        </h1>

        <p className="
          text-neutral-400
        ">
          Monitor registrasi event
        </p>
      </div>

      <div className="
        grid
        md:grid-cols-3
        gap-5
      ">

        {cards.map((item) => {

          const Icon =
            item.icon;

          return (
            <div
              key={item.title}

              className="
                bg-[#111]
                border
                border-[#222]
                rounded-2xl
                p-6
              "
            >

              <div className="
                flex
                justify-between
                items-center
              ">

                <div>

                  <p className="
                    text-neutral-400
                    text-sm
                  ">
                    {item.title}
                  </p>

                  <h2 className="
                    text-4xl
                    font-bold
                    mt-2
                  ">
                    {item.value}
                  </h2>

                </div>

                <div className="
                  w-14
                  h-14
                  rounded-xl
                  bg-pink-500/10
                  flex
                  items-center
                  justify-center
                ">

                  <Icon
                    size={28}
                    className="
                      text-pink-500
                    "
                  />

                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}