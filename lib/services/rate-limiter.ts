/**
 * Rate Limiter Service - Prevent API abuse
 * Implements token bucket algorithm for rate limiting
 */

interface RateLimitBucket {
  tokens: number;
  lastRefillTime: number;
}

interface RateLimitConfig {
  maxTokens: number;
  refillRate: number; // tokens per second
  windowSize: number; // milliseconds
}

export class RateLimiter {
  private buckets: Map<string, RateLimitBucket> = new Map();

  private config: RateLimitConfig = {
    maxTokens: 100, // 100 requests per window
    refillRate: 10, // 10 requests per second
    windowSize: 60000, // 1 minute window
  };

  /**
   * Configure rate limiting
   */
  configure(config: Partial<RateLimitConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Check if request is allowed
   */
  isAllowed(key: string, tokensRequired: number = 1): boolean {
    const now = Date.now();
    let bucket = this.buckets.get(key);

    if (!bucket) {
      bucket = {
        tokens: this.config.maxTokens,
        lastRefillTime: now,
      };
      this.buckets.set(key, bucket);
    }

    // Refill tokens based on time elapsed
    const timePassed = (now - bucket.lastRefillTime) / 1000; // Convert to seconds
    const tokensToAdd = timePassed * this.config.refillRate;

    bucket.tokens = Math.min(this.config.maxTokens, bucket.tokens + tokensToAdd);
    bucket.lastRefillTime = now;

    // Check if enough tokens available
    if (bucket.tokens >= tokensRequired) {
      bucket.tokens -= tokensRequired;
      return true;
    }

    return false;
  }

  /**
   * Get remaining tokens for a key
   */
  getRemainingTokens(key: string): number {
    const bucket = this.buckets.get(key);
    if (!bucket) {
      return this.config.maxTokens;
    }

    const now = Date.now();
    const timePassed = (now - bucket.lastRefillTime) / 1000;
    const tokensToAdd = timePassed * this.config.refillRate;

    return Math.min(this.config.maxTokens, bucket.tokens + tokensToAdd);
  }

  /**
   * Reset rate limit for a key
   */
  reset(key: string): void {
    this.buckets.delete(key);
  }

  /**
   * Clear all rate limits
   */
  clearAll(): void {
    this.buckets.clear();
  }

  /**
   * Get rate limit status
   */
  getStatus(key: string): {
    allowed: boolean;
    remaining: number;
    resetTime: number;
  } {
    const allowed = this.isAllowed(key, 0); // Check without consuming token
    const remaining = this.getRemainingTokens(key);
    const bucket = this.buckets.get(key);
    const resetTime = bucket
      ? bucket.lastRefillTime + this.config.windowSize
      : Date.now() + this.config.windowSize;

    return {
      allowed,
      remaining: Math.floor(remaining),
      resetTime,
    };
  }
}

/**
 * API-specific rate limiters
 */
export const apiRateLimiters = {
  // Video generation - 5 videos per hour
  videoGeneration: new RateLimiter(),

  // Course access - 100 requests per minute
  courseAccess: new RateLimiter(),

  // Community posts - 10 posts per hour
  communityPosts: new RateLimiter(),

  // Email sending - 5 emails per minute
  emailSending: new RateLimiter(),

  // Authentication - 10 attempts per minute
  authentication: new RateLimiter(),

  // General API - 1000 requests per minute
  general: new RateLimiter(),
};

// Configure specific rate limiters
apiRateLimiters.videoGeneration.configure({
  maxTokens: 5,
  refillRate: 5 / 3600, // 5 per hour
  windowSize: 3600000,
});

apiRateLimiters.courseAccess.configure({
  maxTokens: 100,
  refillRate: 100 / 60, // 100 per minute
  windowSize: 60000,
});

apiRateLimiters.communityPosts.configure({
  maxTokens: 10,
  refillRate: 10 / 3600, // 10 per hour
  windowSize: 3600000,
});

apiRateLimiters.emailSending.configure({
  maxTokens: 5,
  refillRate: 5 / 60, // 5 per minute
  windowSize: 60000,
});

apiRateLimiters.authentication.configure({
  maxTokens: 10,
  refillRate: 10 / 60, // 10 per minute
  windowSize: 60000,
});

apiRateLimiters.general.configure({
  maxTokens: 1000,
  refillRate: 1000 / 60, // 1000 per minute
  windowSize: 60000,
});

/**
 * Check rate limit and throw error if exceeded
 */
export function checkRateLimit(
  limiter: RateLimiter,
  key: string,
  tokensRequired: number = 1
): void {
  if (!limiter.isAllowed(key, tokensRequired)) {
    const status = limiter.getStatus(key);
    const resetIn = Math.ceil((status.resetTime - Date.now()) / 1000);

    throw new Error(
      `Rate limit exceeded. Try again in ${resetIn} seconds. Remaining: ${status.remaining}`
    );
  }
}
