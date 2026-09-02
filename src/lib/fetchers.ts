import { kv, kvConfigured } from "./kv";
import type { Member, Project, PostMeta } from "./types";

export async function getProjects(): Promise<Project[]> {
  if (!kvConfigured || !kv) return [];
  const ids = (await kv.zrange("portfolio:index", 0, -1, {
    rev: true,
  })) as string[];
  const items = ids.length
    ? await kv.mget(ids.map((id) => `portfolio:project:${id}`))
    : [];
  return items.filter(Boolean) as Project[];
}

export async function getPosts(limit?: number): Promise<PostMeta[]> {
  if (!kvConfigured || !kv) return [];
  const ids = (await kv.zrange("posts", 0, limit ? limit - 1 : -1, {
    rev: true,
  })) as string[];
  const items = ids.length ? await kv.mget(ids) : [];
  return (items.filter(Boolean) as PostMeta[]).map((p) => ({
    ...p,
    readingMinutes:
      p.readingMinutes ??
      Math.max(1, Math.ceil((p.content ?? "").split(/\s+/).length / 200)),
  }));
}

export async function getTeam(): Promise<Member[]> {
  if (!kvConfigured || !kv) return [];
  const ids = (await kv.zrange("team:index", 0, -1)) as string[];
  const items = ids.length
    ? await kv.mget(ids.map((id) => `team:member:${id}`))
    : [];
  return items.filter(Boolean) as Member[];
}
