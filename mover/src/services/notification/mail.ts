// ✅ SIMPLIFIED: Optional mail service

export async function sendEmail(to: string, subject: string, html: string) {
  // Check if we're in a server environment
  if (typeof window !== "undefined") {
    console.warn("Mail service only available on server side");
    return false;
  }

  try {
    // Only import nodemailer on server side
    const nodemailer = require("nodemailer");
    
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || "localhost",
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER || "",
        pass: process.env.SMTP_PASS || "",
      },
    });

    const from = process.env.SMTP_FROM || "no-reply@404movers.ca";
    await transporter.sendMail({ from, to, subject, html });
    return true;
  } catch (error) {
    console.error("Mail sending failed:", error);
    return false;
  }
}
