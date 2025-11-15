import { Response, NextFunction } from "express";
import { AuthRequest } from "../auth/index.js";
import { getFromCache, CACHE_EMPTY_MARKER } from "../../utils/cacheHelper.js";

/**
 * Middleware cache cho saved city weather
 * Chống cache avalanche với TTL jitter
 * Chống cache penetration với EMPTY marker
 */
export const cacheSavedCityWeatherMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const savedCityId = req.params.id;
    const userId = req.user?.userId;

    if (!savedCityId || !userId) {
        return next();
    }

    const cacheKey = `weather:saved-city:${userId}:${savedCityId}`;

    try {
        const cachedData = await getFromCache<any>(cacheKey);
        
        if (cachedData === CACHE_EMPTY_MARKER) {
            // console.log(`🔴 Cache EMPTY HIT: saved city weather ${savedCityId} for user ${userId}`);
            return res.status(404).json({ error: "City weather data not found" });
        }
        
        if (cachedData !== null) {
            // console.log(`✅ Cache HIT: saved city weather ${savedCityId} for user ${userId}`);
            return res.json(cachedData);
        }
        
        // console.log(`❌ Cache MISS: saved city weather ${savedCityId} for user ${userId}`);
        return next();
    } catch (error) {
        console.error("Error fetching saved city weather data from cache:", error);
        return next();
    }
};
