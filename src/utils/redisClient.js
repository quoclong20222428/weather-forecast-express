import dotenv from 'dotenv';
import { createClient } from 'redis';
const redisUrl = process.env.REDIS_URL;
dotenv.config();
let redisClient = null;
const isRedisEnabled = (redisClient) => {
    return !!redisClient && redisClient.isOpen;
};
export const initializeRedisClient = async () => {
    if (!isRedisEnabled(redisClient)) {
        redisClient = createClient({
            url: redisUrl,
        });
        redisClient.on("error", (err) => console.error("❌ Redis Error:", err));
        redisClient.on("connect", () => console.log("✅ Connected to Redis"));
        await redisClient.connect();
    }
    return redisClient;
};
