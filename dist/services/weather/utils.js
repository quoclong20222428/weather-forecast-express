// Shared utilities for weather services
export const getRandomizedCacheTTL = (min, max) => {
    const baseTTL = Number(process.env.CACHE_TTL);
    const jitter = Math.floor(Math.random() * (max - min + 1)) + min;
    return baseTTL + jitter;
};
export const API_BASE = process.env.OW_BASE_URL;
export const apiKey = process.env.OW_API_KEY;
export const CACHE_TTL = getRandomizedCacheTTL(-20, 20);
