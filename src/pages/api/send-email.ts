export const prerender = false;

import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
    const data = await request.json();
    const { name, email, message, recaptchaToken } = data;

    if (!name || !email || !message || !recaptchaToken) {
        return new Response(JSON.stringify({ message: "Missing required fields" }), {
            status: 400,
        });
    }

    // Verify reCAPTCHA
    const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${import.meta.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;

    try {
        const recaptchaRes = await fetch(recaptchaVerifyUrl, { method: "POST" });
        const recaptchaData = await recaptchaRes.json();

        if (!recaptchaData.success || recaptchaData.score < 0.5) {
            return new Response(JSON.stringify({ message: "Invalid reCAPTCHA or low score" }), {
                status: 400,
            });
        }

        // Send email to owner
        await resend.emails.send({
            from: import.meta.env.EMAIL_FROM,
            to: import.meta.env.EMAIL_TO,
            subject: `New Contact Form Submission from ${name}`,
            html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        });

        // Send confirmation email to user
        await resend.emails.send({
            from: import.meta.env.EMAIL_FROM,
            to: email,
            subject: "Thank you for contacting me!",
            html: `
        <p>Hi ${name},</p>
        <p>Thank you for reaching out. I have received your message and will get back to you as soon as possible.</p>
        <p>Best regards,</p>
        <p>Isaac Martinez</p>
      `,
        });

        return new Response(
            JSON.stringify({ message: "Email sent successfully" }),
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Internal server error" }), {
            status: 500,
        });
    }
};
