import { NextFunction, Request, Response } from "express";
import { getFromCache, CACHE_EMPTY_MARKER } from "../../utils/cacheHelper.js";

export const cacheDailyWeatherMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { lat, lon } = req.params;
    const cnt: number = 7;

    const cacheKey = `weather:daily:${lat}:${lon}:cnt${cnt}`;
    const cachedData = await getFromCache<any>(cacheKey);

    if (cachedData === CACHE_EMPTY_MARKER) {
      // console.log(`🔴 Cache EMPTY HIT: ${cacheKey}`);
      return res.status(404).json({ error: "Daily weather data not found" });
    }

    if (cachedData !== null) {
      // console.log(`✅ Cache HIT: ${cacheKey}`);
      return res.json(cachedData);
    }

    // console.log(`❌ Cache MISS: ${cacheKey}`);
    next();
  } catch (error) {
    console.error("Cache middleware error:", error);
    // Nếu Redis lỗi, bỏ qua cache và gọi API
    next();
  }
};
