import { kv } from "@/lib/kv";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const kvWithPing = kv as typeof kv & { ping?: () => Promise<unknown> };
  const pong = await kvWithPing.ping?.().catch(() => null);
  return NextResponse.json({ ok: true, pong: pong ?? "ok" });
}
