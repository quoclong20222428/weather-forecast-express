import jwt from "jsonwebtoken";
import { JWTPayload } from "./types.js";

/**
 * Validate Refresh Token and extract payload
 * @param token Refresh token to validate
 * @returns Decoded payload if valid, null if invalid/expired
 */
export const validateRefreshToken = (token: string): JWTPayload | null => {
  try {
    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as JWTPayload;
    return decoded;
  } catch (error) {
    return null; // Token invalid or expired
  }
};
