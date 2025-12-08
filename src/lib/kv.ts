import { Redis } from "@upstash/redis";

const url =
  process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL ?? "";
const token =
  process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN ?? "";

// Prefer explicit config, fallback to default env-based bootstrap.
export const kv = url && token ? new Redis({ url, token }) : Redis.fromEnv();
