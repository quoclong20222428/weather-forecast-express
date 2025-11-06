import axios from "axios";
import { DailyHourWeatherResponse } from "./types.js";
import { API_PRO_BASE, apiKey } from "./utils.js";
import { initializeRedisClient } from "../../utils/redisClient.js";


export const getDailyHourWeather = async (lat: number, lon: number): Promise<DailyHourWeatherResponse> => {
    if (!apiKey) {
        throw new Error("Missing OPENWEATHERMAP_API_KEY in environment");
    }

    const cnt = 8; // Lấy 8 bản ghi
    const url = `${API_PRO_BASE}/forecast/hourly?lat=${lat}&lon=${lon}&cnt=${cnt}&appid=${apiKey}&units=metric&lang=vi`;
    
    const res = await axios.get<DailyHourWeatherResponse>(url);

    const redisClient = await initializeRedisClient();
    // const cacheKey = `weather:daily-hour:${lat}:${lon}:cnt${cnt}`;
    const cacheKey = `weather:daily-hour:${lat}:${lon}`;

    if (res.data) {
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(res.data));
    }

    return res.data;
}   