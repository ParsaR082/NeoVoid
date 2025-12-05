import { kv } from "@/lib/kv";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const pong = await kv.ping().catch(() => null);
  return NextResponse.json({ ok: true, pong: pong ?? "ok" });
}
