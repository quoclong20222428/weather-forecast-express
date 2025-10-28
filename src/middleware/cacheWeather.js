import { initializeRedisClient } from "../utils/redisClient.js";
export const cacheWeatherByLatLonMiddleware = async (req, res, next) => {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
        return next();
    }
    const cacheKey = `weather:latlon:${lat}:${lon}`;
    const redisClient = await initializeRedisClient();
    try {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            const weatherData = JSON.parse(cachedData);
            return res.json(weatherData);
        }
        return next();
    }
    catch (error) {
        console.error("Error fetching weather data from cache:", error);
        return next();
    }
};
export const cacheWeatherByCityNameMiddleware = async (req, res, next) => {
    const city = req.params.name?.toLowerCase();
    if (!city) {
        return next();
    }
    const cacheKey = `weather:${city}`;
    const redisClient = await initializeRedisClient();
    try {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            const weatherData = JSON.parse(cachedData);
            return res.json(weatherData);
        }
        return next();
    }
    catch (error) {
        console.error("Error fetching weather data from cache:", error);
        return next();
    }
};
export const cacheWeatherByCityIdMiddleware = async (req, res, next) => {
    const owmId = req.params.owmId;
    if (!owmId) {
        return next();
    }
    const cacheKey = `weather:id:${owmId}`;
    const redisClient = await initializeRedisClient();
    try {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            const weatherData = JSON.parse(cachedData);
            return res.json(weatherData);
        }
        return next();
    }
    catch (error) {
        console.error("Error fetching weather data from cache:", error);
        return next();
    }
};
