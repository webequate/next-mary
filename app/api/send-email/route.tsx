import { NextRequest, NextResponse } from "next/server";
import { ContactForm } from "@/interfaces/ContactForm";

export const dynamic = "force-dynamic";

async function sendEmail(formData: ContactForm) {
  const sendMail = (await import("@/emails")).default;
  const Contact = (await import("@/emails/Contact")).default;
  
  await sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    cc: process.env.EMAIL_CC,
    subject: formData.subject,
    component: (
      <Contact
        name={formData.name}
        email={formData.email}
        subject={formData.subject}
        message={formData.message}
      />
    ),
    text: `
      Name: ${formData.name}
      Email: ${formData.email}
      Subject: ${formData.subject}
      Message: ${formData.message}
    `,
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData: ContactForm = await request.json();

    // Honeypot check - if website field is filled, it's likely a bot
    if (formData.website) {
      return NextResponse.json(
        { message: "Invalid submission." },
        { status: 400 }
      );
    }

    await sendEmail(formData);
    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error sending email." },
      { status: 500 }
    );
  }
}
