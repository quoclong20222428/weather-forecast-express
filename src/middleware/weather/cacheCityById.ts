import { Request, Response, NextFunction } from 'express';
import { initializeRedisClient } from '../../utils/redisClient.js';

export const cacheCityByIdMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return next();
  }

  try {
    const redisClient = await initializeRedisClient();
    const cacheKey = `city:${id}`;

    const cached = await redisClient.get(cacheKey);
    if (cached) {
      console.log(`Cache hit for city:${id}`);
      return res.json(JSON.parse(cached));
    }

    // Attach redis client to request for controller to use
    res.locals.redisClient = redisClient;
    res.locals.cacheKey = cacheKey;
    next();
  } catch (err) {
    console.error('Cache middleware error:', err);
    next(); // Continue to controller even if cache fails
  }
};