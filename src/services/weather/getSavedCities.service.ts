import { prisma } from "../../config/db.js";

export const getSavedCities = async (userId: string) => {
  const userCities = await prisma.userCity.findMany({
    where: {
      userId: userId
    },
    include: {
      city: true
    },
    orderBy: {
      savedAt: "desc"
    }
  });

  // Trả về danh sách cities
  return userCities.map(uc => uc.city);
};
