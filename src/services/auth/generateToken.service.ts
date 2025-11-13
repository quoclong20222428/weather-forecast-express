import jwt from "jsonwebtoken";
import { JWTPayload } from "./types.js";

export const generateToken = (payload: JWTPayload): string => {
  const secret = process.env.JWT_SECRET!;
  
  return jwt.sign(payload, secret, { expiresIn: "6h" });
};
