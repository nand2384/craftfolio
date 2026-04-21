import services from "../../services.js";
import type { RegisterUserData, LoginUserData } from "../../services.js";
import { Request, Response, NextFunction } from "express";
import passport from "passport";
import "../../features/auth/google.strategy.js";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { userData }: { userData: RegisterUserData } = req.body;

    try {
        const result = await services.auth.registerUser(userData);

        if(result.success == true) {
            res.status(201).json({ success: true, jwt: result.jwt, role_id: result.role_id, userData: result.userData });
        } else {
            res.status(400).json({ success: false, error: result.error });
        }
    } catch (error) {
        console.log(error);
        console.log("Error registering user");
        res.status(500).json({ success: false, error: error || "Internal Server Error, please try again." });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { userData }: { userData: LoginUserData } = req.body;

    try {
        const result = await services.auth.loginUser(userData);

        if(result.success == true) {
            res.status(200).json({ success: true, jwt: result.jwt, role_id: result.role_id, userData: result.userData });
        } else {
            res.status(400).json({ success: false, error: result.error });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error || "Internal Server Error, please try again." });
    }
};

export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    if (!services.otp.canResendOTP(email)) {
      return res.status(429).json({
        error: "Please wait before requesting another OTP",
      });
    }

    const otp = services.otp.generateOTP();

    services.otp.saveOTP(email, Number(otp));
    await services.mailer.sendOTPEmail(email, Number(otp));

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

export const verifyOtp = (req: Request, res: Response) => {
    try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        error: "Email and OTP are required",
      });
    }

    const isValid = services.otp.verifyOTP(email, Number(otp));

    if (!isValid) {
      console.log(`${email} is not verified`);
      return res.status(400).json({
        error: "Invalid or expired OTP",
      });
    }

    console.log(`${email} is verified`);
    res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Verify OTP error:", error);

    res.status(500).json({
      error: "OTP verification failed",
    });
  }
};

export const googleAuth = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
};

export const googleAuthCallback = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", { session: false }, async (err, data) => {
        if (err || !data) {
            console.error("Google Auth Error:", err);
            return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
        }

        const { token, user } = data;
        const userData = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        };

        // Standardized redirect with token and JSON-stringified userData
        const redirectUrl = `${process.env.FRONTEND_URL}/login?token=${token}&userData=${encodeURIComponent(JSON.stringify(userData))}&role_id=${user.role_id}`;
        res.redirect(redirectUrl);
    })(req, res, next);
};