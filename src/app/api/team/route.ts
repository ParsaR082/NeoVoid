import { kv } from "@/lib/kv";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const ids = await kv.zrange<string>("team:index", 0, -1);
  const items = ids.length
    ? await kv.mget(ids.map((id) => `team:member:${id}`))
    : [];
  return NextResponse.json(items.filter(Boolean));
}

export async function POST(req: Request) {
  const data = await req.json();
  const key = `team:member:${data.id}`;
  await kv.set(key, data);
  await kv.zadd("team:index", {
    score: data.order ?? Date.now(),
    member: data.id,
  });
  return NextResponse.json({ ok: true });
}
