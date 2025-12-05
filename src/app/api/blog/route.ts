import { kv } from "@/lib/kv";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const ids = await kv.zrange<string>("blog:index", 0, -1, { rev: true });
  const items = ids.length
    ? await kv.mget(ids.map((id) => `blog:post:${id}`))
    : [];
  return NextResponse.json(items.filter(Boolean));
}

export async function POST(req: Request) {
  const data = await req.json();
  const key = `blog:post:${data.id}`;
  await kv.set(key, data);
  await kv.zadd("blog:index", {
    score: data.publishedAt ?? Date.now(),
    member: data.id,
  });
  return NextResponse.json({ ok: true });
}
