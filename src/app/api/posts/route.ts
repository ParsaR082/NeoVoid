import { getAllPosts } from "@/lib/blog";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const posts = await getAllPosts();
  return NextResponse.json(posts);
}
