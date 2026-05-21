"use client";

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
} from "@tanstack/react-table";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { ArrowUp, ArrowDown, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { ageConvert } from "@/lib/ageConvert";
import ExportDropdown from "@/components/admin/ExportDropdown";
import type { Participant } from "@/lib/exportParticipants";

const columnHelper =
  createColumnHelper<any>();

export default function ParticipantsTable({
  data,
}: {
  data: any[];
}) {

  // =========================
  // STATES
  // =========================

  const [participants, setParticipants] =
    useState(data);

  useEffect(() => {
    setParticipants(data);
  }, [data]);

  const [search, setSearch] =
    useState("");

  const [sorting, setSorting] =
    useState<SortingState>([]);

  const [
    debouncedSearch,
    setDebouncedSearch,
  ] = useState("");

  const [loadingPhone,
    setLoadingPhone] =
    useState("");

  // =========================
  // DEBOUNCE SEARCH
  // =========================

  useEffect(() => {

    const timeout =
      setTimeout(() => {

        setDebouncedSearch(
          search
        );

      }, 300);

    return () =>
      clearTimeout(timeout);

  }, [search]);

  // =========================
  // ATTENDANCE HANDLER
  // =========================

  const handleAttendance =
  async (participant: any) => {
    try {

      setLoadingPhone(
        participant.Telepon
      );

      const res = await fetch(
        "/api/attendance",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            action: "attendance",

            source:
              "faith-game-web",

            phone:
              participant.Telepon,
          }),
        }
      );

      // =========================
      // CHECK HTTP ERROR
      // =========================

      if (!res.ok) {

        toast.error(
            `HTTP Error: ${res.status}`
        );

        return;
      }

      const result =
        await res.json();

      // =========================
      // HANDLE FAILED RESPONSE
      // =========================

      if (!result.success) {

        toast.error(
          result.message ||
          "Failed update attendance"
        );

        return;
      }

      // =========================
      // UPDATE LOCAL STATE
      // =========================

      setParticipants((prev) =>
        prev.map((p) =>
          p.Telepon ===
          participant.Telepon
            ? {
                ...p,
                Status:
                  result.status,
              }
            : p
        )
      );

      // =========================
      // SUCCESS ALERT
      // =========================

      toast.success(
        `Status berhasil diubah menjadi ${result.status}`
      );

    } catch (err: any) {

      console.error(err);

      toast.error(
        err.message ||
        "Terjadi kesalahan"
      );

    } finally {

      setLoadingPhone("");
    }
  };

  // =========================
  // FILTERED DATA
  // =========================

  const filteredData = useMemo(() => {
    return participants
      .filter((p) =>
        [p.Nama, p.Telepon, p.Domisili, p.Anggota]
          .join(" ")
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase())
      )
      // ✅ Tambahkan ini — yang sudah Hadir ke bawah
      .sort((a, b) => {
        const aHadir = a.Status === "Hadir" ? 1 : 0;
        const bHadir = b.Status === "Hadir" ? 1 : 0;
        return aHadir - bHadir;
      });
  }, [participants, debouncedSearch]);

  const totalCount = participants.length;

  const checkInCount = useMemo(
    () => participants.filter((p) => p.Status === "Hadir").length,
    [participants]
  );

  // =========================
  // COLUMNS
  // =========================

  const columns = useMemo(() => [

    columnHelper.accessor(
      "Nama",
      {
        header: "Nama",
      }
    ),

    columnHelper.accessor(
      "Telepon",
      {
        header: "Telepon",
      }
    ),

    columnHelper.display({
      id: "umur",

      header: "Umur",

      cell: (info) =>
        ageConvert(
          info.row.original.Umur
        ),
    }),

    columnHelper.accessor(
      "Domisili",
      {
        header: "Domisili",
      }
    ),

    columnHelper.accessor(
      "Anggota",
      {
        header:
          "Keanggotaan",
      }
    ),

    columnHelper.display({
      id: "status",

      header: "Kehadiran",

      cell: (info) => {

        const participant =
          info.row.original;

        const hadir =
          participant.Status ===
          "Hadir";

        const loading =
          loadingPhone ===
          participant.Telepon;

        return (
          <button
            onClick={() =>
              handleAttendance(
                participant
              )
            }

            disabled={loading}

            className={`
              min-w-[120px]
              px-4
              py-2
              rounded-lg
              text-sm
              font-medium
              transition
              flex
              items-center
              justify-center
              gap-2

              ${
                hadir
                  ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                  : "bg-pink-500 text-white hover:bg-pink-600"
              }

              ${
                loading
                  ? "opacity-70 cursor-not-allowed"
                  : ""
              }
            `}
          >

            {loading ? (
              <Loader2
                size={16}
                className="animate-spin"
              />
            ) : hadir ? (
              "Hadir"
            ) : (
              "Check In"
            )}
          </button>
        );
      },
    }),

  ], [loadingPhone]);

  // =========================
  // TABLE
  // =========================

  const table =
    useReactTable({

      data: filteredData,

      columns,

      getCoreRowModel:
        getCoreRowModel(),

      getPaginationRowModel:
        getPaginationRowModel(),

      initialState: {
        pagination: {
          pageSize: 4,
        },
      },

      state: {
        sorting,
      },

      onSortingChange:
        setSorting,

      getSortedRowModel:
        getSortedRowModel(),
    });

  // =========================
  // UI
  // =========================

  return (
    <div className="
      bg-[#111]
      border
      border-[#222]
      rounded-2xl
      overflow-hidden
    ">

      {/* TOOLBAR */}
        <div className="
          p-4 border-b border-[#222]
          flex flex-wrap gap-3
          justify-between items-center
        ">
          {/* Kiri — Stats */}
          <div className="flex items-center gap-5">
            <div className="text-sm text-neutral-400">
              Total{" "}
              <span className="text-white font-semibold">{totalCount}</span>{" "}
              peserta
            </div>

            <div className="w-px h-4 bg-[#2a2a2a]" />

            <div className="text-sm text-neutral-400">
              Hadir{" "}
              <span className="text-white font-semibold">{checkInCount}</span>
            </div>

            <div className="w-px h-4 bg-[#2a2a2a]" />

            <div className="text-sm text-neutral-400">
              <span className="text-white font-semibold">
                {totalCount > 0
                  ? Math.round((checkInCount / totalCount) * 100)
                  : 0}%
              </span>{" "}
              hadir
            </div>
          </div>

          {/* Kanan — Export + Search */}
          <div className="flex items-center gap-3">
            <ExportDropdown data={participants as Participant[]} />

            <input
              type="text"
              placeholder="Search participant..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                bg-black border border-[#222] rounded-lg
                px-4 py-2 text-sm w-64 outline-none
                focus:border-pink-500 transition-colors
              "
            />
          </div>
        </div>

      {/* TABLE */}

      <table className="w-full">

        <thead className="bg-black">

          {table
            .getHeaderGroups()
            .map((headerGroup) => (

              <tr key={headerGroup.id}>

                {headerGroup.headers.map(
                  (header) => (

                    <th
                      key={header.id}

                      onClick={
                        header.column.getToggleSortingHandler()
                      }

                      className="
                        p-4
                        text-left
                        text-sm
                        font-semibold
                        cursor-pointer
                        select-none
                        hover:text-pink-400
                        transition
                      "
                    >

                      <div className="
                        flex
                        items-center
                        gap-3
                        ">

                        {flexRender(
                            header.column
                            .columnDef
                            .header,

                            header.getContext()
                        )}

                        <span className="
                        text-pink-500
                        flex
                        items-center
                        ">

                        {header.column.getIsSorted() === "asc" && (
                            <ArrowUp size={14} />
                        )}

                        {header.column.getIsSorted() === "desc" && (
                            <ArrowDown size={14} />
                        )}

                        </span>

                        </div>

                    </th>
                  )
                )}

              </tr>
            ))}

        </thead>

        <tbody>

          {table
            .getRowModel()
            .rows.map((row) => (

              <tr
                key={row.id}

                className="
                  border-t
                  border-[#222]
                  hover:bg-white/[0.02]
                "
              >

                {row
                  .getVisibleCells()
                  .map((cell) => (

                    <td
                      key={cell.id}

                      className="
                        p-4
                        text-sm
                      "
                    >

                      {flexRender(
                        cell.column
                          .columnDef
                          .cell,

                        cell.getContext()
                      )}

                    </td>
                  ))}

              </tr>
            ))}

        </tbody>
      </table>

      {/* PAGINATION */}

      <div className="
        flex
        items-center
        justify-between
        p-4
        border-t
        border-[#222]
      ">

        <button
          onClick={() =>
            table.previousPage()
          }

          disabled={
            !table.getCanPreviousPage()
          }

          className="
            px-4
            py-2
            bg-[#222]
            rounded-lg
            disabled:opacity-40
          "
        >
          Previous
        </button>

        <span className="
          text-sm
          text-neutral-400
        ">
          Page
          {" "}
          {table.getState()
            .pagination.pageIndex + 1}
          {" "}
          of
          {" "}
          {table.getPageCount()}
        </span>

        <button
          onClick={() =>
            table.nextPage()
          }

          disabled={
            !table.getCanNextPage()
          }

          className="
            px-4
            py-2
            bg-[#222]
            rounded-lg
            disabled:opacity-40
          "
        >
          Next
        </button>

      </div>
    </div>
  );
}