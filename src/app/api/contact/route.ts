// app/api/contact/route.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();

  try {
    const { error } = await resend.emails.send({
      from: "Test From <onboarding@resend.dev>", // You can change this after verifying a domain/sender
      to: ["mudasarofficial237@email.com"], // your actual email to receive messages
      subject: `Contact Form: ${subject}`,
      replyTo: email,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: "Failed to send email" }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Unexpected error:", err);
    return Response.json({ error: "Unexpected error" }, { status: 500 });
  }
}
