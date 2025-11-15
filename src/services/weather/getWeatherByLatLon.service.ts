import axios from "axios";
import { setToCache, setEmptyCache } from "../../utils/cacheHelper.js";
import { OpenWeatherResponse } from "./types.js";
import { API_BASE, apiKey, CACHE_TTL } from "./utils.js";

export const getWeatherByLatLon = async (lat: number, lon: number): Promise<OpenWeatherResponse> => {
  if (!apiKey) {
    throw new Error("Missing OPENWEATHERMAP_API_KEY in environment");
  }
  const url = `${API_BASE}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=vi`;
  const res = await axios.get<OpenWeatherResponse>(url);
  
  // Lưu lại vào Redis sau khi fetch thành công (chống cache avalanche & penetration)
  const cacheKey = `weather:place:${res.data.name}:latlon:${lat}:${lon}`;
  
  if (!res.data) {
    // Cache empty với TTL dài hơn (chống cache penetration)
    await setEmptyCache(cacheKey, CACHE_TTL);
  } else {
    // Cache data với TTL có jitter (chống cache avalanche)
    await setToCache(cacheKey, res.data, CACHE_TTL);
  }
  
  return res.data;
};
