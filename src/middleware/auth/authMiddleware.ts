import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpError } from "../httpError.js";

// Extend Express Request để thêm user property
declare global {
  namespace Express {
    interface User {
      userId: string;
      email: string;
    }
  }
}

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined;

    // Ưu tiên lấy token từ cookie
    if (req.cookies && req.cookies.auth_token) {
      token = req.cookies.auth_token;
    } 
    // Fallback: lấy từ Authorization header (để hỗ trợ API clients)
    else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.substring(7); // Bỏ "Bearer " prefix
    }

    if (!token) {
      return next(new HttpError(401, "Authentication required. Please provide a valid token."));
    }

    // Verify token
    const secret: string = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as { userId: string; email: string };

    // Gắn thông tin user vào request
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new HttpError(401, "Invalid token"));
    }
    if (error instanceof jwt.TokenExpiredError) {
      return next(new HttpError(401, "Token expired"));
    }
    next(error);
  }
};
