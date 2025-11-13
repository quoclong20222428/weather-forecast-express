import { Request, Response, NextFunction } from "express";
import { deleteUserAccount } from "../../services/auth/index.js";
import { HttpError } from "../../middleware/httpError.js";

export const deleteAccountController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Lấy userId từ authenticated user (đã được set bởi authMiddleware)
    const userId = req.user?.userId;

    if (!userId) {
      return next(new HttpError(401, "Authentication required"));
    }

    // Xóa tài khoản user
    await deleteUserAccount(userId);

    // Xóa cookie
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("Record to delete does not exist")) {
      return next(new HttpError(404, "User not found"));
    }
    next(error);
  }
};
