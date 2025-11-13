import { prisma } from "../../config/db.js";
import { initializeRedisClient } from "../../utils/redisClient.js";

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

  // Xóa liên kết giữa user và city
  await prisma.userCity.delete({
    where: {
      userId_cityId: {
        userId: userId,
        cityId: cityId
      }
    }
  });

  // Xóa cache
  const redisClient = await initializeRedisClient();
  await redisClient.del(`cities:saved:${userId}`);
  await redisClient.del(`weather:saved-city:${cityId}`);

  return true;
};
