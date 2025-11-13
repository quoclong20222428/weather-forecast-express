import { prisma } from "../../config/db.js";
import { initializeRedisClient } from "../../utils/redisClient.js";

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

  // Tạo liên kết giữa user và city
  await prisma.userCity.create({
    data: {
      userId: userId,
      cityId: city.id
    }
  });

  // Xóa cache danh sách cities của user này
  const redisClient = await initializeRedisClient();
  await redisClient.del(`cities:saved:${userId}`);

  return {
    city: city,
    message: "Thành phố đã được lưu thành công",
    alreadyExists: false
  };
};
