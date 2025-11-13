import { Request, Response, NextFunction } from "express";
import { generateToken } from "../../services/auth/index.js";

export const facebookCallbackController = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as any;

    if (!user) {
      return res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}/login?error=auth_failed`);
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    // Redirect về client với token
    res.redirect(`${process.env.CLIENT_URL || "http://localhost:5173"}/auth/callback?token=${token}`);
  } catch (error) {
    next(error);
  }
};
