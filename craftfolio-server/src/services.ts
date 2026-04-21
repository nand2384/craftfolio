import pool from "./config/db.js";
import { generateId } from "./utils/idGenerator.js";
import { generateJwtToken, extractJwtData } from "./utils/jwt.js";
import { loginUser, registerUser, setPassword } from "./features/auth/auth.service.js";
import { logAction } from "./features/audit/audit.service.js";
import { generateOTP, saveOTP, canResendOTP, verifyOTP } from "./utils/otpHandler.js";
import { sendOTPEmail } from "./utils/mailer.js";

const services = {
    pool,
    utils: {
        generateId,
        generateJwtToken,
        extractJwtData,
    },
    otp: {
        generateOTP,
        saveOTP,
        canResendOTP,
        verifyOTP,
    },
    mailer: {
        sendOTPEmail
    },
    auth: {
        registerUser,
        loginUser,
        setPassword,
    },
    audit: {
        logAction
    }
};

export default services;

export * from "./types.js";