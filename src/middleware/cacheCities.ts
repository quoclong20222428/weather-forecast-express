import { Request, Response, NextFunction } from "express";
import { initializeRedisClient } from "../utils/redisClient.js";


export const cacheCities = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const key = "cities:all";
        const redisClient = await initializeRedisClient();
        const cached = await redisClient.get(key);

        if (cached) {
            console.log("Cache hit: cities list");
            return res.json(JSON.parse(cached));
        }

        console.log("Cache miss: cities list");
        next();
    } catch (error) {
        console.error("Redis error: ", error);
        next();
    }
};