import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, content } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !content) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate environment variables
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error("Missing email configuration");
      return NextResponse.json(
        { error: "Email service not configured properly" },
        { status: 500 }
      );
    }

    // Debug: Log credentials format (without revealing actual password)
    console.log("Gmail User:", process.env.GMAIL_USER);
    console.log("App Password length:", process.env.GMAIL_APP_PASSWORD?.length);
    console.log(
      "App Password format check:",
      /^[a-z]{16}$/.test(process.env.GMAIL_APP_PASSWORD || "")
    );

    // Create transporter using Gmail service (alternative approach)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `TextTube Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">
            New Contact Form Submission - TextTube
          </h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #7c3aed; margin-bottom: 5px;">From:</h3>
            <p style="margin: 0; font-size: 16px;">${name}</p>
            <p style="margin: 0; color: #666; font-size: 14px;">${email}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #7c3aed; margin-bottom: 5px;">Subject:</h3>
            <p style="margin: 0; font-size: 16px;">${subject}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #7c3aed; margin-bottom: 5px;">Message:</h3>
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; border-left: 4px solid #7c3aed;">
              <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${content}</p>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>This email was sent from your TextTube contact form at ${new Date().toLocaleString()}.</p>
          </div>
        </div>
      `,
      replyTo: email,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending failed:", error);

    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
