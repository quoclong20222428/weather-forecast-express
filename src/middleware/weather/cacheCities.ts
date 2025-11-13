import { Response, NextFunction } from "express";
import { AuthRequest } from "../auth/index.js";
import { initializeRedisClient } from "../../utils/redisClient.js";

export const cacheCities = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return next(); // Không có userId, skip cache
        }

        const key = `cities:saved:${userId}`;
        const redisClient = await initializeRedisClient();
        const cached = await redisClient.get(key);

        if (cached) {
            console.log(`Cache hit: cities list for user ${userId}`);
            return res.json(JSON.parse(cached));
        }

        console.log(`Cache miss: cities list for user ${userId}`);
        next();
    } catch (error) {
        console.error("Redis error: ", error);
        next();
    }
};