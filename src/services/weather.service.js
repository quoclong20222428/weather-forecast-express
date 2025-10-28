import axios from "axios";
import { prisma } from "../config/db.js";
import { initializeRedisClient } from "../utils/redisClient.js";
const getRandomizedCacheTTL = (min, max) => {
    const baseTTL = Number(process.env.CACHE_TTL);
    const jitter = Math.floor(Math.random() * (max - min + 1)) + min;
    return baseTTL + jitter;
};
const API_BASE = process.env.OW_BASE_URL;
const apiKey = process.env.OW_API_KEY;
const CACHE_TTL = getRandomizedCacheTTL(-20, 20); // get a TTL with randomization between -20 and +20 seconds
export const getWeatherByLatLon = async (lat, lon) => {
    if (!apiKey) {
        throw new Error("Missing OPENWEATHERMAP_API_KEY in environment");
    }
    const url = `${API_BASE}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=vi`;
    const res = await axios.get(url);
    // Lưu lại vào Redis sau khi fetch thành công
    const redisClient = await initializeRedisClient();
    const cacheKey = `weather:latlon:${lat}:${lon}`;
    if (!res.data) {
        const extraTTL = CACHE_TTL + 600; // cache not found result for more 10 minutes
        await redisClient.setEx(cacheKey, extraTTL, JSON.stringify({ notFound: true }));
    }
    else {
        await redisClient.setEx(cacheKey, CACHE_TTL, JSON.stringify(res.data));
    }
    return res.data;
};
export const getWeatherByCity = async (city) => {
    if (!apiKey) {
        throw new Error("Missing OPENWEATHERMAP_API_KEY in environment");
    }
    const url = `${API_BASE}/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=vi`;
    const res = await axios.get(url);
    // Lưu lại vào Redis sau khi fetch thành công
    const redisClient = await initializeRedisClient();
    const cacheKey = `weather:${city.toLowerCase()}`;
    if (!res.data) {
        const extraTTL = CACHE_TTL + 600; // cache not found result for more 10 minutes
        await redisClient.setEx(cacheKey, extraTTL, JSON.stringify({ notFound: true }));
    }
    else {
        await redisClient.setEx(cacheKey, CACHE_TTL, JSON.stringify(res.data));
    }
    return res.data;
};
export const getWeatherByCityId = async (owmId) => {
    if (!apiKey) {
        throw new Error("Missing OPENWEATHERMAP_API_KEY in environment");
    }
    const url = `${API_BASE}/weather?id=${owmId}&appid=${apiKey}&units=metric`;
    const res = await axios.get(url);
    const redisClient = await initializeRedisClient();
    const cacheKey = `weather:id:${owmId}`;
    if (!res.data) {
        const extraTTL = CACHE_TTL + 600; // cache not found result for more 10 minutes
        await redisClient.setEx(cacheKey, extraTTL, JSON.stringify({ notFound: true }));
    }
    else {
        await redisClient.setEx(cacheKey, CACHE_TTL, JSON.stringify(res.data));
    }
    return res.data;
};
export const upsertCityFromWeather = async (data) => {
    const db = prisma;
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
export const saveCityByName = async (name) => {
    const weather = await getWeatherByCity(name);
    const city = await upsertCityFromWeather(weather);
    // return upsertCityFromWeather(weather);
    const redisClient = await initializeRedisClient();
    await redisClient.del("cities:saved");
    return city;
};
export const unsaveCityByName = async (name) => {
    const db = prisma;
    const existing = await db.city.findFirst({ where: { name } });
    if (!existing)
        throw new Error("City not found");
    return db.city.delete({ where: { id: existing.id } });
};
export const getSavedCities = () => prisma.city.findMany({ orderBy: { updatedAt: "desc" } });
export const getCityById = (id) => prisma.city.findUnique({ where: { id } });
export const updateCityWeather = async (id) => {
    const city = await prisma.city.findUnique({ where: { id } });
    if (!city)
        throw new Error("City not found");
    const weather = await getWeatherByCityId(city.owmId);
    const updated = await prisma.city.update({
        where: { id },
        data: { lastWeather: weather },
    });
    return { city: updated, weather };
};
