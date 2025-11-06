import { initializeRedisClient } from "../utils/redisClient.js";
export const cacheSavedCityWeatherMiddleware = async (req, res, next) => {
    const savedCityId = req.params.id;
    if (!savedCityId) {
        return next();
    }
    const cacheKey = `weather:saved-city:${savedCityId}`;
    const redisClient = await initializeRedisClient();
    try {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            console.log(`Cache hit: saved city weather ${savedCityId}`);
            const weatherData = JSON.parse(cachedData);
            return res.json(weatherData);
        }
        return next();
    }
    catch (error) {
        console.error("Error fetching saved city weather data from cache:", error);
        return next();
    }
};
export const deleteCachedUnsavedCity = async (cityId) => {
    const cacheKey = `weather:saved-city:${cityId}`;
    const redisClient = await initializeRedisClient();
    try {
        await redisClient.del(cacheKey);
        console.log(`Cache deleted: saved city weather ${cityId}`);
    }
    catch (error) {
        console.error("Error deleting saved city weather data from cache:", error);
    }
};
