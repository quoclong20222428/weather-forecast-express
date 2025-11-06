import { prisma } from "../../config/db.js";
export const getCityById = (id) => prisma.city.findUnique({ where: { id } });
