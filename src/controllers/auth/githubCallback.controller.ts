import { Request, Response, NextFunction } from "express";
import { generateAccessToken, generateRefreshToken } from "../../services/auth/index.js";
import { prisma } from "../../config/db.js";

export const githubCallbackController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authUser = req.user as any;

    if (!authUser || !authUser.userId) {
      return res.redirect(`${process.env.CLIENT_URL!}/login?error=auth_failed`);
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
      return res.redirect(`${process.env.CLIENT_URL!}/login?error=user_not_found`);
    }

    // Generate Access Token (2 hours) and Refresh Token (10 hours)
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
    });

    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
    });

    // Set Access Token in regular cookie (can also be in localStorage on frontend)
    res.cookie("auth_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // "none" for cross-origin in production
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
    });

    // Set Refresh Token in HttpOnly cookie (more secure)
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // "none" for cross-origin in production
      maxAge: 10 * 60 * 60 * 1000, // 10 hours
    });

    // Set user data to localStorage via redirect with user data
    const userData = {
      id: user.id,
      email: user.email,
      name: user.username,
      avatar: user.avatar || null,
      provider: user.provider,
    };

    // URL encode user JSON
    const encodedUser = encodeURIComponent(JSON.stringify(userData));

    // Redirect trực tiếp về homepage
    // Frontend sẽ nhận user data từ URL params hoặc từ /auth/me endpoint bằng httpOnly cookie
    res.redirect(`${process.env.CLIENT_URL!}/?success=true&user=${encodedUser}`);
  } catch (error) {
    next(error);
  }
};
