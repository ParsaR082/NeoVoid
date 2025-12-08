import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  const body = await req.json();
  const key = body.key as string;
  const password = body.password as string;
  const envKey = process.env.ADMIN_SECRET_KEY;
  const envPass = process.env.ADMIN_PASSWORD;

  if (!envKey || !envPass) {
    return NextResponse.json({ error: "Admin not configured" }, { status: 500 });
  }
  if (key !== envKey) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (password !== envPass) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
