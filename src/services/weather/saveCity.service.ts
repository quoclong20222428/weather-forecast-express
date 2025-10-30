import { prisma } from "../../config/db.js";
import { initializeRedisClient } from "../../utils/redisClient.js";

export const saveCity = async (lat: number, lon: number, name: string, owmId: number) => {
  const db = prisma as any;

  // Kiểm tra xem city đã tồn tại chưa (theo lat, lon, name)
  const existing = await db.city.findFirst({
    where: {
      name: name,
      lat: lat,
      lon: lon
    }
  });

  if (existing) {
    return {
      city: existing,
      message: "Thành phố đã được lưu trước đó",
      alreadyExists: true
    };
  }

  const newCity = await db.city.create({
    data: {
      owmId: owmId,
      name: name,
      lat: lat,
      lon: lon,
    },
  });

  // Xóa cache danh sách cities
  const redisClient = await initializeRedisClient();
  await redisClient.del("cities:saved");

  return {
    city: newCity,
    message: "Thành phố đã được lưu thành công",
    alreadyExists: false
  };
};
