import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();
        const { name, email, message, recaptchaToken } = data;

        if (!name || !email || !message || !recaptchaToken) {
            return new Response(JSON.stringify({ message: "Missing required fields" }), {
                status: 400,
            });
        }

        // Verify ReCaptcha
        const recaptchaResponse = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${import.meta.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
            { method: "POST" }
        );
        const recaptchaData = await recaptchaResponse.json();

        if (!recaptchaData.success || recaptchaData.score < 0.5) {
            return new Response(JSON.stringify({ message: "Recaptcha verification failed" }), {
                status: 400,
            });
        }

        // Send notification to owner
        await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>",
            to: [import.meta.env.CONTACT_EMAIL || "me@isaacmartinez.dev"],
            subject: `New Message from ${name}`,
            html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`,
            replyTo: email,
        });

        // Send confirmation to user
        await resend.emails.send({
            from: "Isaac Martinez <onboarding@resend.dev>",
            to: [email],
            subject: "Thanks for reaching out!",
            html: `<p>Hi ${name},</p><p>I received your message and will get back to you soon.</p><p>Best,<br>Isaac</p>`,
        });

        return new Response(JSON.stringify({ message: "Email sent successfully" }), {
            status: 200,
        });
    } catch (error) {
        console.error("Email error:", error);
        return new Response(JSON.stringify({ message: "Failed to send email", error }), {
            status: 500,
        });
    }
};
