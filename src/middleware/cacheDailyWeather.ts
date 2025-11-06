import { NextFunction, Request, Response } from "express";
import { initializeRedisClient } from "../utils/redisClient.js";

export const cacheDailyWeatherMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { lat, lon } = req.params;
    const cnt: number = 7;

    const redisClient = await initializeRedisClient();
    const cacheKey = `weather:daily:${lat}:${lon}:cnt${cnt}`;

    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log(`✅ Cache HIT: ${cacheKey}`);
      return res.json(JSON.parse(cachedData));
    }

    console.log(`❌ Cache MISS: ${cacheKey}`);
    next();
  } catch (error) {
    console.error("Cache middleware error:", error);
    // Nếu Redis lỗi, bỏ qua cache và gọi API
    next();
  }
};
