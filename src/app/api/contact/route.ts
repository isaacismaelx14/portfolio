import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const Mailer = (await import('../../../config/Mailer')).default;
        const res = await request.json();

        const { body, subject, reply } = res;
        await Mailer.sendMail({
            from: 'Portfolio Contact <portfolio@example.net>',
            to: 'isaacismaelx14@gmail.com',
            subject,
            replyTo: reply,
            text: body,
        });

        return NextResponse.json({ message: 'Sent' });
    } catch (err: any) {
        console.log('Error sending email from contact form: ', err);
        return new Response(
            JSON.stringify({
                message: 'Error sending email',
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'json/application',
                },
            }
        );
    }
}
