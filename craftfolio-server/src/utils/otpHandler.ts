import dotenv from "dotenv";
import otpGenerator from "otp-generator";
const otpStore = new Map();
dotenv.config()

const otpExpireTime: string | undefined = process.env.OTP_EXPIRE_TIME;
const otpResendCooldown: string | undefined = process.env.OTP_RESEND_COOLDOWN;

export const generateOTP = () => {
  return otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
};

export const saveOTP = (email: string, otp: number): void => {
  const now = Date.now();

  const expiryMinutes = parseInt(otpExpireTime || "5", 10);
  const expiresAt: number = now + expiryMinutes * 60 * 1000;

  otpStore.set(email, { otp, expiresAt, lastSentAt: now });
};

export const canResendOTP = (email: string): boolean => {
  const record = otpStore.get(email);

  if (!record) return true;

  const cooldownMinutes = parseInt(otpResendCooldown || "1", 10);
  const cooldown: number = cooldownMinutes * 60 * 1000;

  return Date.now() - record.lastSentAt >= cooldown;
};

export const verifyOTP = (email: string, userOTP: number): boolean => {
  const record = otpStore.get(email);

  if (!record) return false;

  if (Date.now() > record.expiresAt) {
    otpStore.delete(email);
    return false;
  }

  const isValid = record.otp === userOTP;

  if (isValid) {
    otpStore.delete(email);
  }

  return isValid;
};

setInterval(
  () => {
    const now = Date.now();

    for (const [email, record] of otpStore.entries()) {
      if (now > record.expiresAt) {
        otpStore.delete(email);
      }
    }
  },
  5 * 60 * 1000,
);