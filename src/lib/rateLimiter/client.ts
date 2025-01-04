import Redis, { RedisOptions } from "ioredis";
import { Env } from "../config";
import { Result } from "./ipRateLimiter";

const redisOptions: RedisOptions = {
    port: Env.REDIS_PORT,
    host: Env.REDIS_HOST,
    password: Env.REDIS_PASSWORD,
}

export class RedisRateLimiter {

    private static redis = new Redis(redisOptions)
    private constructor() { }

    static async rateLimit(
        ip: string,
        limit: number,
        duration: number
    ): Promise<Result> {
        const key = `rate_limit:${ip}`;
        const currentCount = await this.redis.get(key);
        const count = parseInt(currentCount as string, 10) || 0;
        if (count === limit) {
            // Limit reached
            return { limit, remaining: limit - count, success: false };
        }
        this.redis.incr(key);
        this.redis.expire(key, duration);
        return { limit, remaining: limit - (count + 1), success: true };
    };


}