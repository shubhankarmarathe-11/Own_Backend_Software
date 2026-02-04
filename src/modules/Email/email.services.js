import { EmailModel } from "./email.model.js";
import nodemailer from "nodemailer";

export const sendWelcomeEmail = async ({ to, firstName, appName }) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false for 587
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Email template
    const mailOptions = {
      from: `"${appName} Team" <${process.env.GMAIL_USER}>`,
      to,
      subject: `Welcome to ${appName} 🎉`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Hi ${firstName},</h2>

          <p>Welcome to <strong>${appName}</strong>! We're excited to have you onboard.</p>

          <p>Your account has been successfully created. You can now start exploring all the features.</p>


          <p style="margin-top:20px;">
            If you have any questions, just reply to this email — we're happy to help.
          </p>

          <p>— The ${appName} Team</p>
        </div>
      `,
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    console.log("✅ Welcome email sent successfully");

    let Dataentry = await EmailModel.create({
      TypeofEmail: "Welcome Email",
      To: to,
    });
    await Dataentry.save();

    return true;
  } catch (error) {
    console.error("❌ Error sending welcome email:", error);
    return false;
  }
};
