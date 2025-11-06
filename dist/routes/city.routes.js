import { Router } from "express";
import { getSavedCityWeather, getWeatherCityByLatLon, getDailyWeatherController, listCities, saveCity, searchLocations, unsaveCity, getDailyHourWeatherController, } from "../controllers/city/index.js";
import { cacheCities, cacheDailyWeatherMiddleware, cacheSavedCityWeatherMiddleware, cacheWeatherByLatLonMiddleware, deleteCachedUnsavedCity } from "../middleware/index.js";
const router = Router();
/* --------------------- Route cố định --------------------- */
// Lấy thời tiết trực tiếp theo tọa độ lat/lon (không lưu)
router.get("/by-lat-lon/:lat/:lon/weather", cacheWeatherByLatLonMiddleware, getWeatherCityByLatLon);
// Lấy dự báo thời tiết trong 7 ngày theo tọa độ lat/lon (không lưu)
router.get("/by-lat-lon/:lat/:lon/daily", cacheDailyWeatherMiddleware, getDailyWeatherController);
// Lấy dự báo thời tiết theo giờ trong 6 giờ theo tọa độ lat/lon (không lưu)
router.get("/by-lat-lon/:lat/:lon/hourly", cacheDailyWeatherMiddleware, getDailyHourWeatherController);
// DEBUG: Xóa cache hourly forecast
router.delete("/cache/hourly/:lat/:lon", async (req, res) => {
    try {
        const { lat, lon } = req.params;
        const { initializeRedisClient } = await import("../utils/redisClient.js");
        const redisClient = await initializeRedisClient();
        const cacheKey = `weather:daily-hour:${lat}:${lon}:cnt6`;
        const deleted = await redisClient.del(cacheKey);
        res.json({ message: `Cache cleared: ${cacheKey}`, deleted });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to clear cache" });
    }
});
// Danh sách thành phố đã lưu
router.get("/", cacheCities, listCities);
// Lấy thời tiết của thành phố đã lưu theo id (từ database)
router.get("/by-id/:id", cacheSavedCityWeatherMiddleware, getSavedCityWeather);
router.get("/search/:q", searchLocations);
/* --------------------- Route thao tác với thành phố --------------------- */
// Lưu thành phố
router.post("/save/:lat/:lon/:name", cacheSavedCityWeatherMiddleware, saveCity);
// Xóa thành phố đã lưu
router.delete("/by-id/:id", unsaveCity, deleteCachedUnsavedCity);
export default router;
