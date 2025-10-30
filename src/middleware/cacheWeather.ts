import { NextFunction, Request, Response } from "express";
import { OpenWeatherResponse } from "../services/weather/index.js";
import { initializeRedisClient } from "../utils/redisClient.js";

export const cacheWeatherByLatLonMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
        return next();
    }

    const cacheKey = `weather:latlon:${lat}:${lon}`;
    const redisClient = await initializeRedisClient();

    try {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            const weatherData: OpenWeatherResponse = JSON.parse(cachedData);
            return res.json(weatherData);
        }
        return next();
    } catch (error) {
        console.error("Error fetching weather data from cache:", error);
        return next();
    }
}

export const cacheWeatherByCityNameMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const city = req.params.name?.toLowerCase();
    if (!city) {
        return next();
    }
    const cacheKey = `weather:${city}`;
    const redisClient = await initializeRedisClient();

    try {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            const weatherData: OpenWeatherResponse = JSON.parse(cachedData);
            return res.json(weatherData);
        }
        return next();
    } catch (error) {
        console.error("Error fetching weather data from cache:", error);
        return next();
    }
}