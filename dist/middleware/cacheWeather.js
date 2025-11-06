import { initializeRedisClient } from "../utils/redisClient.js";
export const cacheWeatherByLatLonMiddleware = async (req, res, next) => {
    const { lat, lon, name } = req.query;
    if (!lat || !lon || !name) {
        return next();
    }
    const cacheKey = `weather:place:${name}:latlon:${lat}:${lon}`;
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
