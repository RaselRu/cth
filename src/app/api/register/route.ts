import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

type OcrResult = {
  username?: string;
  code?: string;
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const screenshot = formData.get("screenshot");
    const refCode = formData.get("ref_code")?.toString().trim();
    const tiktokUsername = formData.get("tiktok_username")?.toString().trim();

    if (!(screenshot instanceof File)) {
      return NextResponse.json(
        { success: false, error: "Screenshot is required" },
        { status: 400 }
      );
    }

    const ocrWorkerUrl = process.env.OCR_WORKER_URL;
    let ocrResult: OcrResult = {
      username: tiktokUsername || "guest",
      code: "demo",
    };

    if (ocrWorkerUrl) {
      const ocrResponse = await fetch(ocrWorkerUrl, {
        method: "POST",
        body: screenshot,
      });
      if (ocrResponse.ok) {
        ocrResult = (await ocrResponse.json()) as OcrResult;
      }
    }

    const tiktokVerifyUrl = process.env.TIKTOK_VERIFY_URL;
    let tiktokVerified = true;
    if (tiktokVerifyUrl && ocrResult.code) {
      const verifyResponse = await fetch(
        `${tiktokVerifyUrl}/${encodeURIComponent(ocrResult.code)}`
      );
      tiktokVerified = verifyResponse.ok;
    }

    let user = null;
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
      });

      const { data, error } = await supabase
        .from("users")
        .insert({
          tiktok_username: ocrResult.username ?? tiktokUsername ?? "guest",
          ref_code: crypto.randomUUID().slice(0, 8),
          balance: 100,
          xp: 0,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      user = data;
    }

    return NextResponse.json({
      success: true,
      verified: tiktokVerified,
      referrer: refCode || null,
      user,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Registration failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
