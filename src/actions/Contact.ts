'use server';

import { ConfirmationEmail } from '../templates/confirmation';

export type IRes = {
    status: number | null;
    data?: Object;
    error?: {
        code: string;
        message: string;
        input?: string;
    };
};

export async function ContactAction(
    prevState: any,
    formData: FormData
): Promise<IRes> {
    const body = {
        email: formData.get('email'),
        message: formData.get('message'),
        name: formData.get('name'),
    };

    if (!body.name)
        return {
            status: 400,
            error: {
                code: 'MISSING_DATA',
                message: 'Missing name',
                input: 'name',
            },
        };

    if (!body.email || !body.message)
        return {
            status: 400,
            error: {
                code: 'MISSING_DATA',
                message: !body.email ? 'Missing email' : 'Missing message',
                input: !body.email ? 'email' : 'message',
            },
        };

    if (!body.email.toString().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
        return {
            status: 400,
            error: {
                code: 'INVALID_EMAIL',
                message: 'Invalid email',
                input: 'email',
            },
        };

    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY || '');

    try {
        const clientData = await resend.emails.send({
            from: 'Isaac Martinez <not-reply@isaacmartinez.dev>',
            to: [body.email.toString()],
            subject: 'Isaac Martinez - Contact',
            html: ConfirmationEmail({ name: body.name.toString() }),
            reply_to: 'Isaac Martinez <isaacismaelx14@gmail.com>',
        });

        const ownerData = await resend.emails.send({
            from: 'Isaac Martinez <contact@isaacmartinez.dev>',
            to: ['isaacismaelx14@gmail.com'],
            subject: 'Isaac Martinez - Contact',
            html: `<p>Hi Isaac, you have a new message from your website.</p>
            <p><strong>Name:</strong> ${body.name.toString()}</p>
            <p><strong>Email:</strong> ${body.email.toString()}</p>
            <p><strong>Message:</strong> ${body.message.toString()}</p>`,
            reply_to: `'${body.name.toString()} <${body.email.toString()}>`,
        });

        return {
            status: 200,
            data: {
                message: 'Email sent',
                client: clientData.data?.id,
                owner: ownerData.data?.id,
            },
        };
    } catch (error) {
        return {
            status: 500,
            error: {
                code: 'SENDING_EMAIL_FAILED',
                message: 'Sending email failed',
            },
        };
    }
}
