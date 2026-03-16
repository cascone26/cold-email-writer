// Simple in-memory rate limiter for free tier
// In production with multiple instances, use Redis instead
const ipGenerations: Map<string, { count: number; resetAt: number }> = new Map();

const FREE_LIMIT = 3;
const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const record = ipGenerations.get(ip);

  if (!record || now > record.resetAt) {
    const resetAt = now + WINDOW_MS;
    ipGenerations.set(ip, { count: 1, resetAt });
    return { allowed: true, remaining: FREE_LIMIT - 1, resetAt };
  }

  if (record.count >= FREE_LIMIT) {
    return { allowed: false, remaining: 0, resetAt: record.resetAt };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: FREE_LIMIT - record.count,
    resetAt: record.resetAt,
  };
}

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  ipGenerations.forEach((record, ip) => {
    if (now > record.resetAt) {
      ipGenerations.delete(ip);
    }
  });
}, 60 * 60 * 1000); // Every hour
