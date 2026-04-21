import type { JwtPayload } from "../types.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.JWT_KEY as string;

export const generateJwtToken = (user_id: number, email: string, role_id: number) => {
  const payload: JwtPayload = {
    user_id: null,
    email: null,
    role_id: null,
  };

  if (user_id !== undefined && user_id !== null) payload.user_id = user_id;
  if (email !== undefined && email !== null) payload.email = email;
  if (role_id !== undefined && role_id !== null) payload.role_id = role_id;

  try {
    const authToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    return authToken;
  } catch (error) {
    console.log("Error generating token: ", error);
    throw new Error("Error generating token");
  }
};

export const extractJwtData = (authToken: string) => {
  try {
    const payload: JwtPayload = jwt.verify(authToken, SECRET_KEY) as any;
    
    const userId = payload.user_id ?? null;
    const email = payload.email ?? null;
    const role_id = payload.role_id ?? null;
    return { userId, email, role_id, isExpired: false };
    
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      console.log("Token has expired");
      return { isExpired: true };
    }

    console.log("Error extracting token data: ", error.message);
    return { isExpired: false, error: "Invalid Token" };
  }
};