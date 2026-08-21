import jwt from "jsonwebtoken";
import { JWTPayload } from "./types.js";

/**
 * Validate Refresh Token and extract payload
 * - Dùng JWT_REFRESH_SECRET riêng để verify
 * - Từ chối token có `type !== "refresh"` (chống tráo Access Token vào endpoint /refresh)
 * @param token Refresh token to validate
 * @returns Decoded payload nếu hợp lệ, null nếu không hợp lệ/hết hạn/sai loại
 */
export const validateRefreshToken = (token: string): JWTPayload | null => {
  try {
    // Ưu tiên JWT_REFRESH_SECRET; fallback về JWT_SECRET cũ để backward-compatible
    const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as JWTPayload & { type?: string };

    // Từ chối nếu token không phải loại "refresh" (chống tráo đổi Access Token)
    if (decoded.type && decoded.type !== "refresh") {
      return null;
    }

    // Chỉ trả về các trường cần thiết của JWTPayload (không rò rỉ trường type ra ngoài)
    return { userId: decoded.userId, email: decoded.email };
  } catch (error) {
    return null; // Token invalid or expired
  }
};
