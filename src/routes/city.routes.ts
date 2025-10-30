import { Router } from "express";
import {
  getSavedCityWeather,
  getWeatherCityByLatLon,
  listCities,
  saveCity,
  unsaveCity,
} from "../controllers/city/index.js";
import {
  cacheCities,
  cacheSavedCityWeatherMiddleware,
  cacheWeatherByLatLonMiddleware,
  deleteCachedUnsavedCity
} from "../middleware/index.js";
const router = Router();

/* --------------------- Route cố định --------------------- */
// Lấy thời tiết trực tiếp theo tọa độ lat/lon (không lưu)
router.get("/by-lat-lon/:lat/:lon/weather", cacheWeatherByLatLonMiddleware, getWeatherCityByLatLon);

// Danh sách thành phố đã lưu
router.get("/", cacheCities, listCities);

// Lấy thời tiết của thành phố đã lưu theo id (từ database)
router.get("/by-id/:id", cacheSavedCityWeatherMiddleware, getSavedCityWeather);

/* --------------------- Route thao tác với thành phố --------------------- */
// Lưu thành phố theo tên (gọi OpenWeather, map và lưu)
router.post("/", cacheSavedCityWeatherMiddleware, saveCity);

// Xóa thành phố đã lưu
router.delete("/by-id/:id", unsaveCity, deleteCachedUnsavedCity);

export default router;
