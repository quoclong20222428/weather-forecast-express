import { initializeRedisClient } from "./redisClient.js";

// Object đánh dấu cache empty/null (chống cache penetration)
export const CACHE_EMPTY_MARKER = { __empty: true };

// TTL cho cache empty (dài hơn để tránh query DB liên tục)
// export const CACHE_EMPTY_TTL = 300; // 5 phút

/**
 * Tạo random jitter để chống cache avalanche
 * @param baseTTL - TTL cơ bản (giây)
 * @param jitterPercent - Phần trăm jitter (mặc định 20%)
 * @returns TTL với jitter
 */
export const getTTLWithJitter = (baseTTL: number, jitterPercent: number = 20): number => {
  const jitter = Math.floor(Math.random() * baseTTL * (jitterPercent / 100));
  return baseTTL + jitter;
};

/**
 * Kiểm tra xem data có phải là empty marker không
 */
const isEmptyMarker = (data: any): boolean => {
  return data && typeof data === 'object' && data.__empty === true;
};

/**
 * Lấy dữ liệu từ cache
 * @param key - Cache key
 * @returns Dữ liệu từ cache, CACHE_EMPTY_MARKER nếu empty, hoặc null nếu không có cache
 */
export const getFromCache = async <T>(key: string): Promise<T | typeof CACHE_EMPTY_MARKER | null> => {
  try {
    const redisClient = await initializeRedisClient();
    const cachedData = await redisClient.get(key);
    
    if (!cachedData) {
      return null;
    }

    const parsed = JSON.parse(cachedData);

    // Kiểm tra nếu là empty marker
    if (isEmptyMarker(parsed)) {
      // console.log(`🔴 Cache EMPTY HIT: ${key}`);
      return CACHE_EMPTY_MARKER;
    }

    // console.log(`✅ Cache HIT: ${key}`);
    return parsed as T;
  } catch (error) {
    console.error(`❌ Cache GET Error for ${key}:`, error);
    return null;
  }
};

/**
 * Lưu dữ liệu vào cache với TTL có jitter (chống cache avalanche)
 * @param key - Cache key
 * @param data - Dữ liệu cần cache
 * @param baseTTL - TTL cơ bản (giây)
 */
export const setToCache = async <T>(key: string, data: T, baseTTL: number): Promise<void> => {
  try {
    const redisClient = await initializeRedisClient();
    const ttl = getTTLWithJitter(baseTTL);
    await redisClient.setEx(key, ttl, JSON.stringify(data));
    // console.log(`✅ Cache SET: ${key} (TTL: ${ttl}s)`);
  } catch (error) {
    console.error(`❌ Cache SET Error for ${key}:`, error);
  }
};

/**
 * Lưu cache EMPTY để chống cache penetration
 * Dùng khi query DB không trả về kết quả (empty array, null, v.v.)
 * @param key - Cache key
 * @param customTTL - TTL tùy chỉnh (mặc định CACHE_EMPTY_TTL)
 */
export const setEmptyCache = async (key: string, customTTL: number): Promise<void> => {
  try {
    const redisClient = await initializeRedisClient();
    const ttl = customTTL + 600;
    await redisClient.setEx(key, ttl, JSON.stringify(CACHE_EMPTY_MARKER));
    // console.log(`🔴 Cache EMPTY SET: ${key} (TTL: ${ttl}s)`);
  } catch (error) {
    console.error(`❌ Cache EMPTY SET Error for ${key}:`, error);
  }
};

/**
 * Xóa cache theo pattern
 * @param pattern - Pattern để xóa (ví dụ: "cities:saved:*")
 */
export const deleteCacheByPattern = async (pattern: string): Promise<void> => {
  try {
    const redisClient = await initializeRedisClient();
    const keys = await redisClient.keys(pattern);
    
    if (keys.length > 0) {
      await redisClient.del(keys);
      // console.log(`✅ Cache DELETED: ${keys.length} keys matching "${pattern}"`);
    } else {
      console.log(`No cache keys found for pattern: "${pattern}"`);
    }
  } catch (error) {
    console.error(`❌ Cache DELETE Error for pattern ${pattern}:`, error);
  }
};

/**
 * Xóa một cache key cụ thể
 * @param key - Cache key
 */
export const deleteCache = async (key: string): Promise<void> => {
  try {
    const redisClient = await initializeRedisClient();
    await redisClient.del(key);
    // console.log(`✅ Cache DELETED: ${key}`);
  } catch (error) {
    console.error(`❌ Cache DELETE Error for ${key}:`, error);
  }
};
