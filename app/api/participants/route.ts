import { NextResponse } from "next/server";
import { getRegistrations } from "@/lib/getRegistrations";

export const dynamic = "force-dynamic"; // ✅ Wajib, agar tidak di-cache Next.js

export async function GET() {
  try {
    const data = await getRegistrations();
    
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch" },
      { status: 500 }
    );
  }
}