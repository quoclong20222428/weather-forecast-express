import { Request, Response, NextFunction } from "express";
import { validateRefreshToken, generateAccessToken } from "../../services/auth/index.js";

/**
 * Refresh Access Token endpoint
 * POST /api/auth/refresh
 * 
 * Takes refresh token from HttpOnly cookie and returns new access token
 */
export const refreshTokenController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get refresh token from cookie
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token not found" });
    }

    // Validate refresh token
    const payload = validateRefreshToken(refreshToken);

    if (!payload) {
      // Clear invalid refresh token
      res.clearCookie("refresh_token");
      res.clearCookie("auth_token");
      return res.status(401).json({ error: "Refresh token invalid or expired" });
    }

    // Generate new access token
    const newAccessToken = generateAccessToken({
      userId: payload.userId,
      email: payload.email,
    });

    // Set new access token in cookie
    res.cookie("auth_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
    });

    return res.status(200).json({
      message: "Access token refreshed successfully",
      accessToken: newAccessToken, // Also return in response body for flexibility
    });
  } catch (error) {
    next(error);
  }
};
