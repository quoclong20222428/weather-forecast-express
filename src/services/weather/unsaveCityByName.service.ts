import { prisma } from "../../config/db.js";

export const unsaveCityByName = async (lat: number, lon: number, name: string, owmId: number) => {
  const db = prisma as any;
  const existing = await db.city.findFirst({
    where: {
      name: name,
      lat: lat,
      lon: lon
    }
  });
  
  if (!existing) throw new Error("Không tìm thấy thành phố");

  return db.city.delete({ where: { id: existing.id } });
};
