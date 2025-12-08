import { deletePost } from "@/lib/blog";
import { NextResponse } from "next/server";

export const runtime = "edge";

function authorize(req: Request) {
  const key = req.headers.get("x-admin-key");
  const password = req.headers.get("x-admin-password");
  const envKey = process.env.ADMIN_SECRET_KEY;
  const envPass = process.env.ADMIN_PASSWORD;
  if (!envKey || !envPass) return false;
  return key === envKey && password === envPass;
}

export async function POST(req: Request) {
  if (!authorize(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  try {
    await deletePost(body.slug);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
