import jwt from "jsonwebtoken";
import { JWTPayload } from "./types.js";

/**
 * Generate Access Token (2 hours)
 * Used for API authentication with short expiration for security
 */
export const generateAccessToken = (payload: JWTPayload): string => {
  const secret = process.env.JWT_SECRET!;
  
  return jwt.sign(payload, secret, { expiresIn: "2h" });
};

/**
 * Generate Refresh Token (10 hours)
 * Used to get new access tokens without re-authenticating
 * Stored in HttpOnly cookie
 */
export const generateRefreshToken = (payload: JWTPayload): string => {
  const secret = process.env.JWT_SECRET!;
  
  return jwt.sign(payload, secret, { expiresIn: "10h" });
};
