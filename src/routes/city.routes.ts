import { Router } from "express";
import {
	listCities,
	saveCity,
	getCityDetail,
	refreshCityWeather,
	getWeatherByName,
	getWeatherById,
	unsaveCity,
} from "../controllers/city.controller.js";

const router = Router();

// Danh sách thành phố đã lưu
router.get("/", listCities);
// Lưu thành phố theo tên (gọi OpenWeather, map và lưu)
router.post("/", saveCity);
// Xóa thành phố đã lưu
router.delete("/", unsaveCity);
// Chi tiết 1 thành phố đã lưu
router.get("/:id", getCityDetail);
// Làm mới thời tiết cho 1 thành phố đã lưu theo id (id trong DB)
router.post("/:id/refresh", refreshCityWeather);
// Lấy thời tiết trực tiếp theo tên (không lưu)
router.get("/by-name/:name/weather", getWeatherByName);
// Lấy thời tiết trực tiếp theo owmId (không lưu)
router.get("/by-id/:owmId/weather", getWeatherById);

export default router;
