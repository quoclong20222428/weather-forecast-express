import { Response, NextFunction } from "express";
import { AuthRequest } from "../auth/index.js";
import { initializeRedisClient } from "../../utils/redisClient.js";

export const cacheSavedCityWeatherMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const savedCityId = req.params.id;
    const userId = req.user?.userId;

    if (!savedCityId || !userId) {
        return next();
    }

    const cacheKey = `weather:saved-city:${userId}:${savedCityId}`;
    const redisClient = await initializeRedisClient();

    try {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            console.log(`Cache hit: saved city weather ${savedCityId} for user ${userId}`);
            const weatherData = JSON.parse(cachedData);
            return res.json(weatherData);
        }
        return next();
    } catch (error) {
        console.error("Error fetching saved city weather data from cache:", error);
        return next();
    }
};
