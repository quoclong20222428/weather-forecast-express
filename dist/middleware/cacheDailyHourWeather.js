import { initializeRedisClient } from "../utils/redisClient.js";
export const cacheDailyHourWeather = async (req, res, next) => {
    try {
        const { lat, lon } = req.params;
        const cnt = 6;
        const redisClient = await initializeRedisClient();
        const cacheKey = `weather:daily-hour:${lat}:${lon}:cnt${cnt}`;
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            console.log(`✅ Cache HIT: ${cacheKey}`);
            const parsedData = JSON.parse(cachedData);
            // Debug: Log để kiểm tra cấu trúc dữ liệu từ cache
            console.log('📦 Cache data structure check:');
            console.log('  - Has list:', !!parsedData.list);
            console.log('  - List length:', parsedData.list?.length);
            console.log('  - First item has main:', !!parsedData.list?.[0]?.main);
            console.log('  - First item has temp object:', typeof parsedData.list?.[0]?.temp === 'object');
            return res.json(parsedData);
        }
        console.log(`❌ Cache MISS: ${cacheKey}, calling API...`);
        next();
    }
    catch (error) {
        console.error("Cache middleware error:", error);
        next();
    }
};
