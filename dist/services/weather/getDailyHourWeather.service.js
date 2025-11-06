import axios from "axios";
import { apiKey } from "./utils.js";
import { initializeRedisClient } from "../../utils/redisClient.js";
export const getDailyHourWeather = async (lat, lon) => {
    if (!apiKey) {
        throw new Error("Missing OPENWEATHERMAP_API_KEY in environment");
    }
    const cnt = 6;
    const url = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&cnt=${cnt}&appid=${apiKey}&units=metric&lang=vi`;
    console.log('🌐 Calling OpenWeatherMap Hourly API:', url.replace(apiKey, 'API_KEY_HIDDEN'));
    const res = await axios.get(url);
    // Debug: Kiểm tra cấu trúc response từ API
    console.log('📡 API Response check:');
    console.log('  - Status:', res.status);
    console.log('  - Has list:', !!res.data.list);
    console.log('  - List length:', res.data.list?.length);
    console.log('  - First item has main:', !!res.data.list?.[0]?.main);
    console.log('  - First item has temp object:', typeof res.data.list?.[0]?.temp === 'object');
    if (res.data.list?.[0]) {
        console.log('  - First item structure keys:', Object.keys(res.data.list[0]));
    }
    const redisClient = await initializeRedisClient();
    const cacheKey = `weather:daily-hour:${lat}:${lon}:cnt${cnt}`;
    if (res.data) {
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(res.data));
        console.log('💾 Saved to Redis cache:', cacheKey);
    }
    return res.data;
};
