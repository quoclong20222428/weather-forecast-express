import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getMeController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // User đã được gắn vào req.user bởi authMiddleware
    const authUser = req.user;

    if (!authUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Lấy thông tin đầy đủ từ database
    const user = await prisma.user.findUnique({
      where: { id: authUser.userId },
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        provider: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        provider: user.provider,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};
