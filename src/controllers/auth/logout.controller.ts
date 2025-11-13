import { Request, Response, NextFunction } from "express";

export const logoutController = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Xóa cookie
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.json({ 
      success: true, 
      message: "Logged out successfully" 
    });
  } catch (error) {
    next(error);
  }
};
