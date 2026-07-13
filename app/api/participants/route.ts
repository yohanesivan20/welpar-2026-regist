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

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

    if(!scriptUrl){
        throw new Error("GOOGLE_SCRIPT_URL is missing");
    }

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "updateParticipant",
        source: "faith-game-web",
        ...body,
      }),
    });

    const text = await response.text();

    console.log("Apps Script Response :", text);

    const result = JSON.parse(text);

    return NextResponse.json(result);

  } catch (err) {

    console.error(err);

    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error ? err.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}