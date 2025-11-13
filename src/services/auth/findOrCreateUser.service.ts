import { prisma } from "../../config/db.js";
import { OAuthUserData } from "./types.js";

export const findOrCreateUser = async (data: OAuthUserData) => {
  // Tìm user theo provider và providerId (dùng unique constraint)
  let user = await prisma.user.findUnique({
    where: {
      provider_providerId: {
        provider: data.provider,
        providerId: data.providerId,
      },
    },
  });

  // Nếu chưa có, tạo mới
  if (!user) {
    user = await prisma.user.create({
      data: {
        provider: data.provider,
        providerId: data.providerId,
        email: data.email,
        username: data.username,
        avatar: data.avatar,
      },
    });
  }

  return user;
};
