import { NextResponse } from "next/server";

import { createToken } from "@/lib/auth";

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const {
      email,
      password,
    } = body;

    // =========================
    // ENV CHECK
    // =========================

    const adminEmail =
      process.env.ADMIN_EMAIL;

    const adminPassword =
      process.env.ADMIN_PASSWORD;

    if (
      !adminEmail ||
      !adminPassword
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Server configuration invalid",
        },
        {
          status: 500,
        }
      );
    }

    // =========================
    // INPUT VALIDATION
    // =========================

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Email dan password wajib diisi",
        },
        {
          status: 400,
        }
      );
    }

    // =========================
    // TRIM INPUT
    // =========================

    const trimmedEmail =
      email.trim().toLowerCase();

    const trimmedPassword =
      password.trim();

    // =========================
    // VERIFY LOGIN
    // =========================

    const isValid =
      trimmedEmail ===
        adminEmail.toLowerCase() &&
      trimmedPassword ===
        adminPassword;

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Email atau password salah",
        },
        {
          status: 401,
        }
      );
    }

    // =========================
    // GENERATE JWT
    // =========================

    const token =
      await createToken(
        trimmedEmail,
        "admin"
      );

    // =========================
    // RESPONSE
    // =========================

    const response =
      NextResponse.json({
        success: true,
        message:
          "Login berhasil",
      });

    // =========================
    // SET COOKIE
    // =========================

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",      // ⚠️ Harus sama dengan path di logout
      maxAge: 60 * 60 * 24, // 1 hari
    });

    return response;

  } catch (err) {

    console.error(
      "Login Error:",
      err
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}