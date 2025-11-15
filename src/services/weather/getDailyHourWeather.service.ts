import axios from "axios";
import { DailyHourWeatherResponse } from "./types.js";
import { API_PRO_BASE, apiKey, CACHE_TTL } from "./utils.js";
import { setToCache, setEmptyCache } from "../../utils/cacheHelper.js";

export const getDailyHourWeather = async (lat: number, lon: number): Promise<DailyHourWeatherResponse> => {
    if (!apiKey) {
        throw new Error("Missing OPENWEATHERMAP_API_KEY in environment");
    }

    const cnt = 8; // Lấy 8 bản ghi
    const url = `${API_PRO_BASE}/forecast/hourly?lat=${lat}&lon=${lon}&cnt=${cnt}&appid=${apiKey}&units=metric&lang=vi`;
    
    const res = await axios.get<DailyHourWeatherResponse>(url);

    // Lưu vào Redis cache (chống cache avalanche & penetration)
    const cacheKey = `weather:daily-hour:${lat}:${lon}`;

    if (res.data) {
        await setToCache(cacheKey, res.data, CACHE_TTL);
    } else {
        await setEmptyCache(cacheKey, CACHE_TTL);
    }

    return res.data;
}   