import { prisma } from "../../config/db.js";
import { initializeRedisClient } from "../../utils/redisClient.js";
import { getCityById } from "./getCityById.service.js";
import { getWeatherByLatLon } from "./getWeatherByLatLon.service.js";
import { CACHE_TTL } from "./utils.js";

export const getSavedCityWeather = async (userId: string, cityId: number) => {
  // 1. Kiểm tra user có lưu city này không
  const userCity = await prisma.userCity.findUnique({
    where: {
      userId_cityId: {
        userId: userId,
        cityId: cityId
      }
    },
    include: {
      city: true
    }
  });

  if (!userCity) {
    throw new Error("Không tìm thấy thành phố trong danh sách đã lưu của bạn");
  }

  const city = userCity.city;

  // 2. Lấy thông tin thời tiết từ API OpenWeather sử dụng lat/lon của city
  const weather = await getWeatherByLatLon(city.lat, city.lon);

  // 3. Thay thế name từ API bằng name từ database (giữ tên do user đặt)
  const weatherWithSavedName = {
    ...weather,
    name: city.name,      // Override tên từ database
    savedCityId: cityId,  // Thêm id của city đã lưu để reference
  };

  const redisClient = await initializeRedisClient();
  const cacheKey = `weather:saved-city:${userId}:${cityId}`;
  await redisClient.setEx(cacheKey, CACHE_TTL, JSON.stringify(weatherWithSavedName));

  return weatherWithSavedName;
};
