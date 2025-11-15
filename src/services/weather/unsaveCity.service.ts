import { prisma } from "../../config/db.js";
import { deleteCache, deleteCacheByPattern } from "../../utils/cacheHelper.js";
import { getSavedCities } from "./getSavedCities.service.js";

export const unsaveCity = async (userId: string, cityId: number) => {
  // Kiểm tra xem user có lưu city này không
  const userCity = await prisma.userCity.findUnique({
    where: {
      userId_cityId: {
        userId: userId,
        cityId: cityId
      }
    }
  });

  if (!userCity) {
    return false;
  }

  // 1. Cập nhật database trước (Write-Through Cache Pattern)
  await prisma.userCity.delete({
    where: {
      userId_cityId: {
        userId: userId,
        cityId: cityId
      }
    }
  });

  // 2. Xóa cache liên quan
  const cacheKey = `cities:saved:${userId}`;
  await deleteCache(cacheKey);
  
  // Xóa cache weather của city này cho user
  await deleteCacheByPattern(`weather:saved-city:${userId}:${cityId}`);

  // 3. Tạo cache mới ngay lập tức (warm up cache)
  await getSavedCities(userId);

  return true;
};
