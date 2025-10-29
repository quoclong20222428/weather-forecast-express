import { Router } from "express";
import {
  getCityDetail,
  getWeatherById,
  getWeatherByName,
  getWeatherCityByLatLon,
  listCities,
  refreshCityWeather,
  // saveCity,
  // unsaveCity,
  getAllCities,
  createCity,
  deleteCity,
} from "../controllers/city.controller.js";
import { 
  cacheWeatherByCityIdMiddleware, 
  cacheWeatherByCityNameMiddleware, 
  cacheWeatherByLatLonMiddleware 
} from "../middleware/index.js";
import { cacheCityByIdMiddleware } from "../middleware/cacheCityById.js";
const router = Router();

/* --------------------- Route cố định --------------------- */
// Lấy tất cả thành phố
router.get("/all", getAllCities);

// Lấy thời tiết trực tiếp theo tên (không lưu)
router.get("/by-name/:name/weather", cacheWeatherByCityNameMiddleware, getWeatherByName);

// Lấy thời tiết trực tiếp theo tọa độ lat/lon (không lưu)
router.get("/by-lat-lon/:lat/:lon/weather", cacheWeatherByLatLonMiddleware, getWeatherCityByLatLon);

// Lấy thời tiết trực tiếp theo owmId (không lưu)
router.get("/by-id/:owmId/weather", cacheWeatherByCityIdMiddleware, getWeatherById);

// Danh sách thành phố đã lưu
// router.get("/", listCities);

/* --------------------- Route thao tác với thành phố --------------------- */
// Lưu thành phố theo tên (gọi OpenWeather, map và lưu)
// router.post("/", saveCity);

// Tạo thành phố mới
router.post("/saved-city/:name/:country/:lat/:lon", createCity);

// Làm mới thời tiết cho 1 thành phố đã lưu theo id (id trong DB)
router.post("/:id/refresh", refreshCityWeather);

// Chi tiết 1 thành phố đã lưu
router.get('/by-id/:id', cacheCityByIdMiddleware, getCityDetail);

// Xóa thành phố đã lưu
// router.delete("/by-id/:id", unsaveCity);

// Xóa thành phố theo id
router.delete("/by-id/:id", deleteCity);

export default router;
