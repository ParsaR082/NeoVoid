import { Redis } from "@upstash/redis";

const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL ?? "";
const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN ?? "";

/**
 * Vercel builds can render public/static pages without the optional KV service.
 * Do not call Redis.fromEnv() when credentials are absent: it throws during
 * module initialization and can turn otherwise unrelated pages into 500s.
 */
export const kvConfigured = Boolean(url && token);
export const kv = kvConfigured ? new Redis({ url, token }) : null;
