import jwt from "jsonwebtoken";
import { JWTPayload } from "./types.js";

/**
 * Generate Access Token (2 hours)
 * - Dùng JWT_ACCESS_SECRET riêng để ngăn tráo đổi với Refresh Token
 * - Thêm trường `type: "access"` vào payload để authMiddleware kiểm tra
 */
export const generateAccessToken = (payload: JWTPayload): string => {
  // Ưu tiên JWT_ACCESS_SECRET; fallback về JWT_SECRET cũ để backward-compatible
  const secret = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET!;

  return jwt.sign({ ...payload, type: "access" }, secret, { expiresIn: "2h" });
};

/**
 * Generate Refresh Token (10 hours)
 * - Dùng JWT_REFRESH_SECRET riêng để ngăn tráo đổi với Access Token
 * - Thêm trường `type: "refresh"` vào payload để validateRefreshToken kiểm tra
 * - Lưu trong HttpOnly cookie
 */
export const generateRefreshToken = (payload: JWTPayload): string => {
  // Ưu tiên JWT_REFRESH_SECRET; fallback về JWT_SECRET cũ để backward-compatible
  const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET!;

  return jwt.sign({ ...payload, type: "refresh" }, secret, { expiresIn: "10h" });
};
