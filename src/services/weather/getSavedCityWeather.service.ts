import { prisma } from "../../config/db.js";
import { setToCache, setEmptyCache } from "../../utils/cacheHelper.js";
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
    // Cache empty để chống penetration
    const cacheKey = `weather:saved-city:${userId}:${cityId}`;
    await setEmptyCache(cacheKey, CACHE_TTL);
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

  // 4. Cache kết quả với TTL jitter (chống avalanche)
  const cacheKey = `weather:saved-city:${userId}:${cityId}`;
  await setToCache(cacheKey, weatherWithSavedName, CACHE_TTL);

  return weatherWithSavedName;
};
