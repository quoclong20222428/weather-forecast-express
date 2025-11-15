import { NextFunction, Request, Response } from "express";
import { OpenWeatherResponse } from "../../services/weather/index.js";
import { getFromCache, CACHE_EMPTY_MARKER } from "../../utils/cacheHelper.js";

export const cacheWeatherByLatLonMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { lat, lon, name} = req.query;
    if (!lat || !lon || !name) {
        return next();
    }

    const cacheKey = `weather:place:${name}:latlon:${lat}:${lon}`;

    try {
        const cachedData = await getFromCache<OpenWeatherResponse>(cacheKey);
        
        if (cachedData === CACHE_EMPTY_MARKER) {
            // Empty cache - không có data
            return res.status(404).json({ error: "Weather data not found" });
        }
        
        if (cachedData !== null) {
            // console.log(`✅ Cache HIT: weather for ${name}`);
            return res.json(cachedData);
        }
        
        // console.log(`❌ Cache MISS: weather for ${name}`);
        return next();
    } catch (error) {
        console.error("Error fetching weather data from cache:", error);
        return next();
    }
}