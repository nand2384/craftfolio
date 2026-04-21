import { Request, Response, NextFunction } from "express";
import { extractJwtData } from "../utils/jwt.js";
import { getContext } from "../utils/context.js";

declare global {
  namespace Express {
    interface User {
      user_id: number;
      email: string;
      role_id: number;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = extractJwtData(token);

    if (decoded.isExpired) {
        return res.status(401).json({ error: "Token has expired." });
    }

    if (!decoded.userId) {
        return res.status(401).json({ error: "Invalid token." });
    }

    // 1. Attach user to the request object
    req.user = {
        user_id: decoded.userId,
        email: decoded.email!,
        role_id: decoded.role_id!
    };

    // 2. Update context for audit logging
    const context = getContext();
    if (context) {
        context.user_id = decoded.userId;
    }

    next();
};
