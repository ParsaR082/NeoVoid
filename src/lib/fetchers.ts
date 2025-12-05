import { kv } from "./kv";
import type { Member, Post, Project } from "./types";

function kvReady() {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  );
}

export async function getProjects(): Promise<Project[]> {
  if (!kvReady()) return [];
  const ids = (await kv.zrange("portfolio:index", 0, -1, {
    rev: true,
  })) as string[];
  const items = ids.length
    ? await kv.mget(ids.map((id) => `portfolio:project:${id}`))
    : [];
  return items.filter(Boolean) as Project[];
}

export async function getPosts(limit?: number): Promise<Post[]> {
  if (!kvReady()) return [];
  const ids = (await kv.zrange(
    "blog:index",
    0,
    limit ? limit - 1 : -1,
    { rev: true }
  )) as string[];
  const items = ids.length
    ? await kv.mget(ids.map((id) => `blog:post:${id}`))
    : [];
  return items.filter(Boolean) as Post[];
}

export async function getTeam(): Promise<Member[]> {
  if (!kvReady()) return [];
  const ids = (await kv.zrange("team:index", 0, -1)) as string[];
  const items = ids.length
    ? await kv.mget(ids.map((id) => `team:member:${id}`))
    : [];
  return items.filter(Boolean) as Member[];
}
