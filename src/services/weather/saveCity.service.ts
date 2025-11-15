import { prisma } from "../../config/db.js";
import { deleteCache } from "../../utils/cacheHelper.js";
import { getSavedCities } from "./getSavedCities.service.js";

export const saveCity = async (userId: string, lat: number, lon: number, name: string) => {
  // Tìm hoặc tạo city
  let city = await prisma.city.findFirst({
    where: {
      name: name,
      lat: lat,
      lon: lon
    }
  });

  if (!city) {
    city = await prisma.city.create({
      data: {
        name: name,
        lat: lat,
        lon: lon,
      },
    });
  }

  // Kiểm tra xem user đã lưu city này chưa
  const existingUserCity = await prisma.userCity.findUnique({
    where: {
      userId_cityId: {
        userId: userId,
        cityId: city.id
      }
    }
  });

  if (existingUserCity) {
    return {
      city: city,
      message: "Bạn đã lưu thành phố này trước đó",
      alreadyExists: true
    };
  }

  // 1. Cập nhật database trước (Write-Through Cache Pattern)
  await prisma.userCity.create({
    data: {
      userId: userId,
      cityId: city.id
    }
  });

  // 2. Xóa cache cũ
  const cacheKey = `cities:saved:${userId}`;
  await deleteCache(cacheKey);

  // 3. Tạo cache mới ngay lập tức (warm up cache)
  await getSavedCities(userId);

  return {
    city: city,
    message: "Thành phố đã được lưu thành công",
    alreadyExists: false
  };
};
