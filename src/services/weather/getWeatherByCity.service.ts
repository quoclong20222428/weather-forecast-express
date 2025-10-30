import axios from "axios";
import { initializeRedisClient } from "../../utils/redisClient.js";
import { OpenWeatherResponse } from "./types.js";
import { API_BASE, apiKey, CACHE_TTL } from "./utils.js";

export const getWeatherByCity = async (city: string): Promise<OpenWeatherResponse> => {
  if (!apiKey) {
    throw new Error("Missing OPENWEATHERMAP_API_KEY in environment");
  }
  const url = `${API_BASE}/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=vi`;
  const res = await axios.get<OpenWeatherResponse>(url);
  
  // Lưu lại vào Redis sau khi fetch thành công
  const redisClient = await initializeRedisClient();
  const cacheKey = `weather:${city.toLowerCase()}`;
  
  if (!res.data) {
    const extraTTL = CACHE_TTL + 600; // cache not found result for more 10 minutes
    await redisClient.setEx(cacheKey, extraTTL, JSON.stringify({ notFound: true }));
  } else {
    await redisClient.setEx(cacheKey, CACHE_TTL, JSON.stringify(res.data));
  }
  
  return res.data;
};
