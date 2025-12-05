import { kv } from "./kv";
import type { Member, Post, Project } from "./types";

export async function getProjects(): Promise<Project[]> {
  const ids = await kv.zrange<string>("portfolio:index", 0, -1, { rev: true });
  const items = ids.length
    ? await kv.mget(ids.map((id) => `portfolio:project:${id}`))
    : [];
  return items.filter(Boolean) as Project[];
}

export async function getPosts(limit?: number): Promise<Post[]> {
  const ids = await kv.zrange<string>(
    "blog:index",
    0,
    limit ? limit - 1 : -1,
    { rev: true }
  );
  const items = ids.length
    ? await kv.mget(ids.map((id) => `blog:post:${id}`))
    : [];
  return items.filter(Boolean) as Post[];
}

export async function getTeam(): Promise<Member[]> {
  const ids = await kv.zrange<string>("team:index", 0, -1);
  const items = ids.length
    ? await kv.mget(ids.map((id) => `team:member:${id}`))
    : [];
  return items.filter(Boolean) as Member[];
}
