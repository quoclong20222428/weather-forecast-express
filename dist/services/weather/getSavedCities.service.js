import { prisma } from "../../config/db.js";
export const getSavedCities = () => prisma.city.findMany({ orderBy: { name: "desc" } });
