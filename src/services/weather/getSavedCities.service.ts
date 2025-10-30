import { prisma } from "../../config/db.js";

export const getSavedCities = () => (prisma as any).city.findMany({ orderBy: { name: "desc" } });
