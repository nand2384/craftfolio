import { Router } from "express";
import { saveCraftController } from "./crafts.controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = Router();

router.post('/save', authMiddleware, saveCraftController);

export default router;