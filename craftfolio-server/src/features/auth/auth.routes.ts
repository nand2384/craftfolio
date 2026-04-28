import express from "express";
const router = express.Router();
import { loginUser, registerUser, sendOtp, verifyOtp, googleAuth, googleAuthCallback, setUserPassword } from "./auth.controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { Request, Response } from "express";

router.post('/register', registerUser);
router.post('/login', loginUser);

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);

// Route for verifying if a user's token is valid and returning their data
router.get('/validate', authMiddleware, (req: Request, res: Response) => {
    res.status(200).json({ 
        success: true,
        message: "Session is valid", 
        user: req.user 
    });
});

router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback);

router.post('/set-password', authMiddleware, setUserPassword);

export default router;