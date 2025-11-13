import { Router } from "express";
import {
  getSavedCityWeather,
  getWeatherCityByLatLon,
  getDailyWeatherController,
  listCities,
  saveCity,
  searchLocations,
  unsaveCity,
  getDailyHourWeatherController,
} from "../controllers/city/index.js";
import {
  cacheCities,
  cacheDailyHourWeather,
  cacheDailyWeatherMiddleware,
  cacheSavedCityWeatherMiddleware,
  cacheWeatherByLatLonMiddleware
} from "../middleware/index.js";
import { authMiddleware } from "../middleware/auth/index.js";
const router = Router();

/* --------------------- Route cố định --------------------- */
// Lấy thời tiết trực tiếp theo tọa độ lat/lon (không lưu)
router.get("/by-lat-lon/:lat/:lon/weather", cacheWeatherByLatLonMiddleware, getWeatherCityByLatLon);

// Lấy dự báo thời tiết trong 7 ngày theo tọa độ lat/lon (không lưu)
router.get("/by-lat-lon/:lat/:lon/daily", cacheDailyWeatherMiddleware, getDailyWeatherController);

// Lấy dự báo thời tiết theo giờ trong 6 giờ theo tọa độ lat/lon (không lưu)
router.get("/by-lat-lon/:lat/:lon/hourly", cacheDailyHourWeather, getDailyHourWeatherController);

// Danh sách thành phố đã lưu (yêu cầu authentication)
router.get("/all-cities", authMiddleware, cacheCities, listCities);

// Lấy thời tiết của thành phố đã lưu theo id (yêu cầu authentication)
router.get("/by-id/:id", authMiddleware, cacheSavedCityWeatherMiddleware, getSavedCityWeather);

router.get("/search/:q", searchLocations);

/* --------------------- Route thao tác với thành phố --------------------- */
// Lưu thành phố (yêu cầu authentication)
router.post("/save/:lat/:lon/:name", authMiddleware, cacheSavedCityWeatherMiddleware, saveCity);

// Xóa thành phố đã lưu (yêu cầu authentication)
router.delete("/by-id/:id", authMiddleware, unsaveCity);

export default router;
