import { initializeRedisClient } from "../../utils/redisClient.js";
import { getCityById } from "./getCityById.service.js";
import { getWeatherByLatLon } from "./getWeatherByLatLon.service.js";
import { CACHE_TTL } from "./utils.js";
export const getSavedCityWeather = async (id) => {
    // 1. Lấy thông tin city từ database
    const city = await getCityById(id);
    if (!city) {
        throw new Error("Không tìm thấy thành phố trong danh sách đã lưu");
    }
    // 2. Lấy thông tin thời tiết từ API OpenWeather sử dụng lat/lon của city
    const weather = await getWeatherByLatLon(city.lat, city.lon);
    // 3. Thay thế name từ API bằng name từ database (giữ tên do user đặt)
    const weatherWithSavedName = {
        ...weather,
        name: city.name, // Override tên từ database
        savedCityId: id, // Thêm id của city đã lưu để reference
    };
    const redisClient = await initializeRedisClient();
    const cacheKey = `weather:saved-city:${id}`;
    await redisClient.setEx(cacheKey, CACHE_TTL, JSON.stringify(weatherWithSavedName));
    return weatherWithSavedName;
};
