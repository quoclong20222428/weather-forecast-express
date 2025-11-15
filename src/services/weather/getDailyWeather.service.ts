import axios from "axios";
import { setToCache, setEmptyCache } from "../../utils/cacheHelper.js";
import { DailyWeatherResponse } from "./types.js";
import { API_BASE, apiKey, CACHE_TTL } from "./utils.js";

export const getDailyWeather = async (
    lat: number,
    lon: number
): Promise<DailyWeatherResponse> => {
    if (!apiKey) {
        throw new Error("Missing OPENWEATHERMAP_API_KEY in environment");
    }

    // Xây dựng URL API
    const cnt = 7;
    const url = `${API_BASE}/forecast/daily?lat=${lat}&lon=${lon}&cnt=${cnt}&appid=${apiKey}&units=metric&lang=vi`;

    // Gọi API OpenWeatherMap
    const res = await axios.get<DailyWeatherResponse>(url);

    // Lưu vào Redis cache (chống cache avalanche & penetration)
    const cacheKey = `weather:daily:${lat}:${lon}:cnt${cnt}`;

    if (res.data) {
        await setToCache(cacheKey, res.data, CACHE_TTL);
    } else {
        await setEmptyCache(cacheKey, CACHE_TTL);
    }

    return res.data;
};