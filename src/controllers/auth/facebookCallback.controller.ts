import { Request, Response, NextFunction } from "express";
import { generateAccessToken, generateRefreshToken } from "../../services/auth/index.js";

export const facebookCallbackController = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as any;

    if (!user) {
      return res.redirect(`${process.env.CLIENT_URL!}/login?error=auth_failed`);
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

    // Set Access Token in regular cookie
    res.cookie("auth_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
    });

    // Set Refresh Token in HttpOnly cookie
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 10 * 60 * 60 * 1000, // 10 hours
    });

    // Redirect về client
    res.redirect(`${process.env.CLIENT_URL!}/login?success=true`);
  } catch (error) {
    next(error);
  }
};
