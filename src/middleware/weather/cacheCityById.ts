import { Request, Response, NextFunction } from 'express';
import { getFromCache, CACHE_EMPTY_MARKER } from '../../utils/cacheHelper.js';

export const cacheCityByIdMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return next();
  }

  try {
    const cacheKey = `city:${id}`;
    const cached = await getFromCache<any>(cacheKey);
    
    if (cached === CACHE_EMPTY_MARKER) {
      // console.log(`🔴 Cache EMPTY HIT for city:${id}`);
      return res.status(404).json({ error: "City not found" });
    }
    
    if (cached !== null) {
      // console.log(`✅ Cache HIT for city:${id}`);
      return res.json(cached);
    }

    // console.log(`❌ Cache MISS for city:${id}`);
    // Attach cache key to response locals for controller to use
    res.locals.cacheKey = cacheKey;
    next();
  } catch (err) {
    console.error('Cache middleware error:', err);
    next(); // Continue to controller even if cache fails
  }
};