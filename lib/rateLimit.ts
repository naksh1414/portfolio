// ponytail: in-memory, per server instance. On serverless each warm instance keeps its own
// counts, so this caps bursts rather than being a hard global limit. Move to Upstash/Vercel KV
// if spam gets through.
const hits = new Map<string, number[]>()

export function rateLimit(key: string, limit: number, windowMs: number, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)
  if (recent.length >= limit) {
    hits.set(key, recent)
    return false
  }
  recent.push(now)
  hits.set(key, recent)
  // Keep the map from growing forever on a long-lived instance.
  if (hits.size > 5000) hits.clear()
  return true
}
