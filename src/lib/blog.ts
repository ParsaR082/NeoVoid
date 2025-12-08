import { kv } from "./kv";
import type { PostMeta } from "./types";
import { marked } from "marked";

const POSTS_INDEX_KEY = "posts";

function normalizeSlug(slug: string | undefined | null) {
  if (!slug) return "";
  return slug.toLowerCase().trim();
}

function validateSlug(slug: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function createPost(post: {
  title: string;
  slug: string;
  summary: string;
  tags: string[];
  content: string;
  date?: string;
}) {
  const slug = normalizeSlug(post.slug);
  if (!validateSlug(slug)) {
    throw new Error("Invalid slug format");
  }
  const date = post.date ?? new Date().toISOString();
  const meta: PostMeta = {
    title: post.title,
    slug,
    summary: post.summary,
    tags: post.tags,
    date,
    readingMinutes: readingTime(post.content),
  };
  const pipeline = kv.pipeline();
  pipeline.set(`post:${slug}`, meta);
  pipeline.set(`post:${slug}:content`, post.content);
  pipeline.zadd(POSTS_INDEX_KEY, {
    score: Date.parse(date),
    member: `post:${slug}`,
  });
  await pipeline.exec();
  return meta;
}

export async function updatePost(post: {
  slug: string;
  title?: string;
  summary?: string;
  tags?: string[];
  content?: string;
  date?: string;
}) {
  const slug = normalizeSlug(post.slug);
  if (!validateSlug(slug)) {
    throw new Error("Invalid slug format");
  }
  const existing = await kv.get<PostMeta>(`post:${slug}`);
  if (!existing) throw new Error("Post not found");
  const content =
    post.content ??
    (await kv.get<string>(`post:${slug}:content`)) ??
    "";
  const next: PostMeta = {
    ...existing,
    ...("title" in post ? { title: post.title ?? existing.title } : {}),
    ...("summary" in post ? { summary: post.summary ?? existing.summary } : {}),
    ...("tags" in post ? { tags: post.tags ?? existing.tags } : {}),
    date: post.date ?? existing.date,
    readingMinutes: readingTime(content),
  };

  const pipeline = kv.pipeline();
  pipeline.set(`post:${slug}`, next);
  if (post.content !== undefined) {
    pipeline.set(`post:${slug}:content`, content);
  }
  pipeline.zadd(POSTS_INDEX_KEY, {
    score: Date.parse(next.date),
    member: `post:${slug}`,
  });
  await pipeline.exec();
  return next;
}

export async function deletePost(slug: string) {
  const s = normalizeSlug(slug);
  if (!validateSlug(s)) throw new Error("Invalid slug format");
  const pipeline = kv.pipeline();
  pipeline.del(`post:${s}`);
  pipeline.del(`post:${s}:content`);
  pipeline.zrem(POSTS_INDEX_KEY, `post:${s}`);
  await pipeline.exec();
  return true;
}

export async function getPost(slug: string) {
  const s = normalizeSlug(slug);
  if (!s || !validateSlug(s)) return null;
  const meta = await kv.get<PostMeta>(`post:${s}`);
  if (!meta) return null;
  const content =
    (await kv.get<string>(`post:${s}:content`)) ?? meta.content ?? "";
  const html = marked.parse(content) as string;
  const minutes = meta.readingMinutes ?? readingTime(content);
  return { ...meta, content, html, readingMinutes: minutes };
}

export async function getAllPosts() {
  const ids = (await kv.zrange(POSTS_INDEX_KEY, 0, -1, {
    rev: true,
  })) as string[];
  if (!ids.length) return [];
  const metas = await kv.mget<PostMeta[]>(ids);
  return metas.filter(Boolean) as PostMeta[];
}

export function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
