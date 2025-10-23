import axios from "axios";
import { prisma } from "../config/db.js";
import { initializeRedisClient } from "../utils/redisClient.js";

export type OpenWeatherResponse = {
  coord: { lon: number; lat: number };
  weather: Array<{ id: number; main: string; description: string; icon: string }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility?: number;
  wind?: { speed: number; deg: number; gust?: number };
  clouds?: { all: number };
  dt: number;
  sys: { country: string; sunrise?: number; sunset?: number };
  timezone: number;
  id: number; // owm city id
  name: string;
  cod: number;
};

const API_BASE = process.env.OW_BASE_URL;
const apiKey = process.env.OW_API_KEY;
const CACHE_TTL = Number(process.env.CACHE_TTL); // 20 minutes

export const getWeatherByLatLon = async (lat: number, lon: number): Promise<OpenWeatherResponse> => {
  if (!apiKey) {
    throw new Error("Missing OPENWEATHERMAP_API_KEY in environment");
  }
  const url = `${API_BASE}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=vi`;
  const res = await axios.get<OpenWeatherResponse>(url);
  // Lưu lại vào Redis sau khi fetch thành công
  const redisClient = await initializeRedisClient();
  const cacheKey = `weather:latlon:${lat}:${lon}`;
  await redisClient.setEx(cacheKey, CACHE_TTL, JSON.stringify(res.data));
  return res.data;
}

export const getWeatherByCity = async (city: string): Promise<OpenWeatherResponse> => {
  if (!apiKey) {
    throw new Error("Missing OPENWEATHERMAP_API_KEY in environment");
  }
  const url = `${API_BASE}/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=vi`;
  const res = await axios.get<OpenWeatherResponse>(url);
  // Lưu lại vào Redis sau khi fetch thành công
  const redisClient = await initializeRedisClient();
  const cacheKey = `weather:${city.toLowerCase()}`;
  await redisClient.setEx(cacheKey, CACHE_TTL, JSON.stringify(res.data));
  return res.data;
};

export const getWeatherByCityId = async (owmId: number): Promise<OpenWeatherResponse> => {
  if (!apiKey) {
    throw new Error("Missing OPENWEATHERMAP_API_KEY in environment");
  }
  const url = `${API_BASE}/weather?id=${owmId}&appid=${apiKey}&units=metric`;
  const res = await axios.get<OpenWeatherResponse>(url);
  return res.data;
};

export const upsertCityFromWeather = async (data: OpenWeatherResponse) => {
  const db = prisma as any;
  const existing = await db.city.findFirst({ where: { owmId: data.id } });
  if (existing) {
    return db.city.update({
      where: { id: existing.id },
      data: {
        name: data.name,
        country: data.sys.country,
        lat: data.coord.lat,
        lon: data.coord.lon,
        timezone: data.timezone,
        lastWeather: data,
      },
    });
  }
  return db.city.create({
    data: {
      owmId: data.id,
      name: data.name,
      country: data.sys.country,
      lat: data.coord.lat,
      lon: data.coord.lon,
      timezone: data.timezone,
      lastWeather: data,
    },
  });
};

export const saveCityByName = async (name: string) => {
  const weather = await getWeatherByCity(name);
  return upsertCityFromWeather(weather);
};

export const unsaveCityByName = async (name: string) => {
  const db = prisma as any;
  const existing = await db.city.findFirst({ where: { name } });
  if (!existing) throw new Error("City not found");
  return db.city.delete({ where: { id: existing.id } });
}

export const getSavedCities = () => (prisma as any).city.findMany({ orderBy: { updatedAt: "desc" } });

export const getCityById = (id: number) => prisma.city.findUnique({ where: { id } });

export const updateCityWeather = async (id: number) => {
  const city = await prisma.city.findUnique({ where: { id } });
  if (!city) throw new Error("City not found");
  const weather = await getWeatherByCityId((city as any).owmId);
  const updated = await (prisma as any).city.update({
    where: { id },
    data: { lastWeather: weather },
  });
  return { city: updated, weather };
};