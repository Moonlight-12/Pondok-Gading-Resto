"use server";

import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

type ContactData = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  message: string;
};

export async function sendContactEmail(formData: ContactData) {
  try {
    
    if (!process.env.EMAIL_USER) {
      throw new Error("EMAIL_USER is not defined");
    }
    if (!process.env.EMAIL_PASSWORD) {
      throw new Error("EMAIL_PASSWORD is not defined");
    }

    
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "465", 10),
      secure: process.env.EMAIL_SECURE === "true", 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      debug: true, 
      logger: true,
    });

    
    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          console.error("DETAILED TRANSPORTER VERIFICATION ERROR:", {
            message: error.message,
            name: error.name,
            code: (error as any).code,
            command: (error as any).command,
            stack: error.stack,
          });
          reject(error);
        } else {
          console.log("Transporter verification successful");
          resolve(success);
        }
      });
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: formData.email,
      subject: `Feedback from ${formData.firstname}`,
      html: `
        <h1>New Feedback</h1>
        <p><strong>First Name:</strong> ${formData.firstname}</p>
        <p><strong>Last Name:</strong> ${formData.lastname}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Message:</strong> ${formData.message}</p>
      `,
    };

    // Send the email with extensive logging
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sending successful:", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
    });

    return {
      success: true,
      message: "Feedback sent successfully!",
      details: info,
    };
  } catch (error) {
    console.error("COMPREHENSIVE EMAIL SENDING ERROR:", {
      errorName: error instanceof Error ? error.name : "Unknown Error",
      errorMessage: error instanceof Error ? error.message : "No error message",
      errorCode: (error as any).code,
      errorCommand: (error as any).command,
      errorStack: error instanceof Error ? error.stack : "No stack trace",
    });

    return {
      success: false,
      message: "Failed to send feedback email.",
      errorDetails: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
