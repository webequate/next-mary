import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { ContactForm } from "@/interfaces/ContactForm";
import { siteConfig } from "@/lib/metadata";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");

const renderContactEmail = (formData: ContactForm) => {
  const name = escapeHtml(formData.name);
  const email = escapeHtml(formData.email);
  const subject = escapeHtml(formData.subject || "New contact form submission");
  const message = escapeHtml(formData.message).replace(/\n/g, "<br />");
  const logoUrl = `${siteConfig.url}/assets/logo-webequate-light.png`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${subject}</title>
  </head>
  <body style="margin:0; padding:24px; font-family: Arial, Helvetica, sans-serif; background:#0b1020; color:#e2e8f0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px; margin:0 auto; background:#0f172a; border-radius:16px; overflow:hidden; border:1px solid #1f2937;">
      <tr>
        <td style="padding:20px 24px; background:#0b1224; border-bottom:1px solid #1f2937;">
          <a href="https://webequate.com" target="_blank" rel="noopener" style="display:inline-block; text-decoration:none;">
            <img src="${logoUrl}" alt="" role="presentation" width="160" height="40" style="display:block; width:160px; height:auto; border:0; outline:none; text-decoration:none;" />
          </a>
        </td>
      </tr>
      <tr>
        <td style="padding:24px; color:#cbd5f5; font-size:14px;">
          <h1 style="margin:0 0 12px 0; font-size:20px; line-height:1.3; color:#f8fafc;">New contact form submission</h1>
          <p style="margin:0 0 20px 0; color:#94a3b8;">Website: <a href="https://maryjjohnson.com" style="color:#93c5fd; text-decoration:none;">MaryJJohnson.com</a></p>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b1224; border:1px solid #1f2937; border-radius:12px;">
            <tr>
              <td style="padding:16px 18px;">
                <p style="margin:0 0 6px 0; color:#94a3b8; font-size:12px; text-transform:uppercase; letter-spacing:0.06em;">Name</p>
                <p style="margin:0 0 14px 0; color:#e2e8f0; font-size:15px;">${name}</p>
                <p style="margin:0 0 6px 0; color:#94a3b8; font-size:12px; text-transform:uppercase; letter-spacing:0.06em;">Email</p>
                <p style="margin:0 0 14px 0; color:#e2e8f0; font-size:15px;"><a href="mailto:${email}" style="color:#93c5fd; text-decoration:none;">${email}</a></p>
                <p style="margin:0 0 6px 0; color:#94a3b8; font-size:12px; text-transform:uppercase; letter-spacing:0.06em;">Subject</p>
                <p style="margin:0 0 14px 0; color:#e2e8f0; font-size:15px;">${subject}</p>
                <p style="margin:0 0 6px 0; color:#94a3b8; font-size:12px; text-transform:uppercase; letter-spacing:0.06em;">Message</p>
                <p style="margin:0; color:#e2e8f0; line-height:1.7; font-size:15px;">${message}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 24px 22px 24px; color:#64748b; font-size:12px;">
          Need help? Reach out to <a href="mailto:webequate@gmail.com" style="color:#93c5fd; text-decoration:none;">WebEquate</a> at any time.
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

async function sendEmail(formData: ContactForm) {
  const to = process.env.EMAIL_TO;
  const from = process.env.EMAIL_FROM || process.env.GMAIL_USER;
  const cc = process.env.EMAIL_CC;

  if (!to || !from) {
    throw new Error("Email environment variables are not configured.");
  }

  const subject = formData.subject || "New contact form submission";
  const text = `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${subject}\nMessage: ${formData.message}`;

  await transport.sendMail({
    from,
    to,
    cc,
    subject,
    text,
    html: renderContactEmail(formData),
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
