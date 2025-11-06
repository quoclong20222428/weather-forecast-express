import axios from "axios";
import { initializeRedisClient } from "../../utils/redisClient.js";
import { API_BASE, apiKey, CACHE_TTL } from "./utils.js";
export const getWeatherByLatLon = async (lat, lon) => {
    if (!apiKey) {
        throw new Error("Missing OPENWEATHERMAP_API_KEY in environment");
    }
    const url = `${API_BASE}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=vi`;
    const res = await axios.get(url);
    // Lưu lại vào Redis sau khi fetch thành công
    const redisClient = await initializeRedisClient();
    const cacheKey = `weather:place:${res.data.name}:latlon:${lat}:${lon}`;
    if (!res.data) {
        const extraTTL = CACHE_TTL + 600; // cache not found result for more 10 minutes
        await redisClient.setEx(cacheKey, extraTTL, JSON.stringify({ notFound: true }));
    }
    else {
        await redisClient.setEx(cacheKey, CACHE_TTL, JSON.stringify(res.data));
    }
    return res.data;
};
