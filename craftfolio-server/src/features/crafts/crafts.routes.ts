import { Router } from "express";
import { saveCraftController, getUserCraftsController } from "./crafts.controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = Router();

router.post('/save', authMiddleware, saveCraftController);
router.get('/fetch', authMiddleware, getUserCraftsController);

export default router;