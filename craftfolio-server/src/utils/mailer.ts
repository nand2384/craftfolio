import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (email: string, otp: number) => {
  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
            body {
                margin: 0;
                padding: 0;
                background-color: #f8fafc;
                font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            }
            .container {
                max-width: 600px;
                margin: 40px auto;
                background: #ffffff;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 4px 20px rgba(0,0,0,0.03);
                border: 1px solid #f1f5f9;
            }
            .header {
                padding: 40px 40px 20px;
                text-align: center;
            }
            .logo-box {
                width: 44px;
                height: 44px;
                background-color: #0f172a;
                border-radius: 12px;
                display: inline-block;
                margin-bottom: 20px;
                line-height: 44px;
                text-align: center;
                color: white;
                font-size: 24px;
                font-weight: bold;
            }
            .content {
                padding: 0 40px 40px;
                text-align: center;
                color: #334155;
            }
            h1 {
                margin: 0 0 16px;
                font-size: 24px;
                font-weight: 800;
                color: #0f172a;
                letter-spacing: -0.025em;
            }
            p {
                margin: 0 0 24px;
                font-size: 16px;
                line-height: 1.6;
                color: #64748b;
            }
            .otp-container {
                background: #f8fafc;
                border: 2px dashed #e2e8f0;
                border-radius: 16px;
                padding: 30px;
                margin: 30px 0;
                position: relative;
            }
            .otp-code {
                font-size: 42px;
                font-weight: 800;
                letter-spacing: 12px;
                color: #4CAF7D;
                margin: 0;
            }
            .footer {
                padding: 30px 40px;
                background: #f8fafc;
                border-top: 1px solid #f1f5f9;
                text-align: center;
            }
            .footer p {
                font-size: 13px;
                margin: 0;
                color: #94a3b8;
            }
            .brand-name {
                font-weight: 700;
                color: #0f172a;
            }
            @media (max-width: 600px) {
                .container {
                    margin: 20px;
                }
                .header, .content {
                    padding-left: 20px;
                    padding-right: 20px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo-box">&lt;/&gt;</div>
                <h1>Craftfolio</h1>
            </div>
            <div class="content">
                <p>Hello there,</p>
                <p>To finish setting up your account and start building your premium portfolio, please use the verification code below:</p>
                
                <div class="otp-container">
                    <p style="text-transform: uppercase; font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 10px; letter-spacing: 0.1em;">Verification Code</p>
                    <div class="otp-code">${otp}</div>
                </div>

                <p style="font-size: 14px;">This code will expire in 5 minutes. If you didn't request this code, you can safely ignore this email.</p>
            </div>
            <div class="footer">
                <p>&copy; 2026 <span class="brand-name">Craftfolio</span>. All rights reserved.</p>
                <p>Built with passion for creators.</p>
            </div>
        </div>
    </body>
    </html>
  `;


  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification OTP",
    html: htmlTemplate,
  });
};