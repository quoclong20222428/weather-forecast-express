import { prisma } from "../../config/db.js";

export const getCityById = (id: number) => prisma.city.findUnique({ where: { id } });
