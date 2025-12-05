import { kv } from "@/lib/kv";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const ids = (await kv.zrange("portfolio:index", 0, -1, {
    rev: true,
  })) as string[];
  const items = ids.length
    ? await kv.mget(ids.map((id) => `portfolio:project:${id}`))
    : [];
  return NextResponse.json(items.filter(Boolean));
}

export async function POST(req: Request) {
  const data = await req.json();
  const key = `portfolio:project:${data.id}`;
  await kv.set(key, data);
  await kv.zadd("portfolio:index", {
    score: data.order ?? Date.now(),
    member: data.id,
  });
  return NextResponse.json({ ok: true });
}
