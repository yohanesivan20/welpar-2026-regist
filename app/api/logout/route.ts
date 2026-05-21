import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logout berhasil",
    });

    // ✅ Hapus cookie dengan cara yang benar
    response.cookies.set("admin_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",       // ⚠️ Harus sama dengan path saat cookie di-set waktu login
      maxAge: 0,       // ✅ Paksa browser hapus cookie
      expires: new Date(0), // ✅ Double protection
    });

    return response;
  } catch (err) {
    console.error(
      "Logout error:",
      err instanceof Error ? err.message : "Unknown error"
    );

    return NextResponse.json(
      { success: false, message: "Gagal logout" },
      { status: 500 }
    );
  }
}