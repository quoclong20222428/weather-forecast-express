import { Request, Response, NextFunction } from "express";
import { generateToken } from "../../services/auth/index.js";
import { prisma } from "../../config/db.js";

export const githubCallbackController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authUser = req.user as any;

    if (!authUser || !authUser.userId) {
      return res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}/login?error=auth_failed`);
    }

    // Fetch full user data from database
    const user = await prisma.user.findUnique({
      where: { id: authUser.userId },
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        provider: true,
      },
    });

    if (!user) {
      return res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}/login?error=user_not_found`);
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    // Set httpOnly cookie
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Chuẩn bị user data để gửi về frontend
    const userData = {
      id: user.id,
      email: user.email,
      name: user.username, // Frontend expects 'name' field
      avatar: user.avatar || null,
      provider: user.provider,
    };

    // URL encode user JSON
    const encodedUser = encodeURIComponent(JSON.stringify(userData));

    // Redirect về client với user info và token
    res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}/auth/callback?success=true&token=${token}&provider=${user.provider}&user=${encodedUser}`);
  } catch (error) {
    next(error);
  }
};
