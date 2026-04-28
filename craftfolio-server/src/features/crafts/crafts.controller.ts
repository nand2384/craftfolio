import { Request, Response } from "express";
import { saveCraft, getUserCrafts } from "./crafts.service.js";

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

export const getUserCraftsController = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.user_id;

        if(!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const result = await getUserCrafts(userId);

        if(result.success == false) {
            res.status(400).json({
                success: false,
                message: result.message
            });
        }

        return res.status(200).json({
            success: true,
            message: "Crafts fetched successfully",
            data: result.data
        })

    } catch (error: any) {
        console.error("Error fetching crafts: ", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
};