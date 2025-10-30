import { prisma } from "../../config/db.js";
import { initializeRedisClient } from "../../utils/redisClient.js";

export const unsaveCity = async (id: number, lat: number, lon: number, name: string) => {
  const db = prisma as any;

  // Tìm city theo id và validate với lat, lon, name
  const city = await db.city.findUnique({
    where: { id: id }
  });

  if (!city) {
    throw new Error("City not found");
  }

  // Validate thông tin khớp
  if (city.lat !== lat || city.lon !== lon || city.name !== name) {
    throw new Error("City information does not match");
  }

  // Xóa city
  await db.city.delete({
    where: { id: id }
  });

  // Xóa cache
  const redisClient = await initializeRedisClient();
  await redisClient.del("cities:saved");
  await redisClient.del(`weather:saved-city:${id}`);

  return city;
};
