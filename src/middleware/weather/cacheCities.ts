import { Response, NextFunction } from "express";
import { AuthRequest } from "../auth/index.js";
import { getFromCache } from "../../utils/cacheHelper.js";

/**
 * Middleware cache cho danh sách saved cities
 * Chống cache avalanche với TTL jitter
 * Chống cache penetration với NULL cache
 */
export const cacheCities = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return next(); // Không có userId, skip cache
        }

        const cacheKey = `cities:saved:${userId}`;
        const cachedCities = await getFromCache<any[]>(cacheKey);

        if (cachedCities !== null) {
            // console.log(`✅ Cache HIT: saved cities for user ${userId}`);
            return res.json(cachedCities);
        }

        // console.log(`❌ Cache MISS: saved cities for user ${userId}`);
        next();
    } catch (error) {
        console.error("❌ Redis error: ", error);
        next();
    }
};