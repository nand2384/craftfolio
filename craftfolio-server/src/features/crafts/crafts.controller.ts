import { Request, Response } from "express";
import { saveCraft } from "./crafts.service.js";

export const saveCraftController = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.user_id; 
        if(!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const craft = await saveCraft(userId, req.body);

        res.status(200).json({
            success: true,
            message: "Craft saved successfully",
            data: craft
        });
    } catch (error: any) {
        console.error("Save Craft Error: ", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};