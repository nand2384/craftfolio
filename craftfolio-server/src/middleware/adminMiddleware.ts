import { Request, Response, NextFunction } from "express";
import { Role } from "../types.js";
import services from "../services.js";

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // Ensure user is authenticated first
    if(!req.user) {
        return res.status(401).json({
            success: false,
            error: "Authentication required"
        });
    }

    try {
        // Fetch the LATEST role from the database
        const userResult = await services.pool.query(
            "SELECT role_id FROM users WHERE user_id = $1",
            [req.user.user_id]
        );

        // Verify user exists and has the ADMIN role
        if(userResult.rowCount === 0 || userResult.rows[0].role_id !== Role.ADMIN) {
            return res.status(403).json({
                success: false,
                error: "Access denied. Admin privileges required."
            });
        }

        next();
    } catch (error: any) {
        console.error("Admin Authorization Error:", error);
        res.status(500).json({ 
            success: false, 
            error: "Authorization check failed" 
        });
    }
}
