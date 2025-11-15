import { NextFunction, Request, Response } from "express";
import { getFromCache, CACHE_EMPTY_MARKER } from "../../utils/cacheHelper.js";

export const cacheDailyHourWeather = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { lat, lon } = req.params;
        const cacheKey = `weather:daily-hour:${lat}:${lon}`;

        const cachedData = await getFromCache<any>(cacheKey);

        if (cachedData === CACHE_EMPTY_MARKER) {
            // console.log(`🔴 Cache EMPTY HIT: ${cacheKey}`);
            return res.status(404).json({ error: "Hourly weather data not found" });
        }

        if (cachedData !== null) {
            // console.log(`✅ Cache HIT: ${cacheKey}`);
            return res.json(cachedData);
        }

        // console.log(`❌ Cache MISS: ${cacheKey}`);
        next();
    } catch (error) {
        console.error("Cache middleware error:", error);
        next();
    }
};