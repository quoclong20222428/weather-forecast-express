import { NextFunction, Request, Response } from "express";
import { initializeRedisClient } from "../../utils/redisClient.js";

export const cacheDailyHourWeather = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { lat, lon } = req.params;
        // const cnt: number = 8;

        const redisClient = await initializeRedisClient();
        // const cacheKey = `weather:daily-hour:${lat}:${lon}:cnt${cnt}`;
        const cacheKey = `weather:daily-hour:${lat}:${lon}`;

        const cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
            console.log(`✅ Cache HIT: ${cacheKey}`);
            return res.json(JSON.parse(cachedData));
        }

        console.log(`❌ Cache MISS: ${cacheKey}`);
        next();
    } catch (error) {
        console.error("Cache middleware error:", error);
        next();
    }
};