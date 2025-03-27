"use server"

import nodemailer from "nodemailer"

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

type ReservationData = {
  guests: string
  name: string
  date: string
  email: string
  time: string
  phone: string
}

export async function sendReservationEmail(formData: ReservationData) {
  // Log all environment variables (carefully)
  console.log("EMAIL CONFIGURATION CHECK:");
  console.log("EMAIL_USER:", process.env.EMAIL_USER ? 'PRESENT' : 'MISSING');
  console.log("EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD ? 'PRESENT (REDACTED)' : 'MISSING');
  console.log("EMAIL_HOST:", process.env.EMAIL_HOST);
  console.log("EMAIL_PORT:", process.env.EMAIL_PORT);
  console.log("EMAIL_SECURE:", process.env.EMAIL_SECURE);

  try {
    // Validate credentials explicitly
    if (!process.env.EMAIL_USER) {
      throw new Error("EMAIL_USER is not defined");
    }
    if (!process.env.EMAIL_PASSWORD) {
      throw new Error("EMAIL_PASSWORD is not defined");
    }

    // Create transporter with multiple authentication methods
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || "465", 10),
        secure: process.env.EMAIL_SECURE === "true", // Convert string to boolean
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
        debug: true, // Enable debug output
  logger: true, 
      });

    // Comprehensive transporter verification
    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          console.error("DETAILED TRANSPORTER VERIFICATION ERROR:", {
            message: error.message,
            name: error.name,
            code: (error as any).code,
            command: (error as any).command,
            stack: error.stack
          });
          reject(error);
        } else {
          console.log("Transporter verification successful");
          resolve(success);
        }
      });
    });

    // Format the date and time
    const formattedDate = new Date(formData.date).toLocaleDateString()

    // Prepare email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: formData.email,
      subject: `New Reservation from ${formData.name}`,
      html: `
        <h1>New Table Reservation</h1>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Number of Guests:</strong> ${formData.guests}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${formData.time}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
      `,
    }

    // Send the email with extensive logging
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sending successful:", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected
    });

    return { 
      success: true, 
      message: "Reservation email sent successfully!",
      details: info
    }
  } catch (error) {
    console.error("COMPREHENSIVE EMAIL SENDING ERROR:", {
      errorName: error instanceof Error ? error.name : 'Unknown Error',
      errorMessage: error instanceof Error ? error.message : 'No error message',
      errorCode: (error as any).code,
      errorCommand: (error as any).command,
      errorStack: error instanceof Error ? error.stack : 'No stack trace'
    });

    return { 
      success: false, 
      message: "Failed to send reservation email.",
      errorDetails: error instanceof Error ? error.message : "Unknown error"
    };
  }
}