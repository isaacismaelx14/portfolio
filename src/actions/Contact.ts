'use server';

export type IRes = {
    status: number | null;
    data?: Object;
    error?: {
        code: string;
        message: string;
    };
};

export async function ContactAction(
    prevState: any,
    formData: FormData
): Promise<IRes> {
    const data = {
        email: formData.get('email'),
        message: formData.get('message'),
    };

    if (!data.email || !data.message)
        return {
            status: 400,
            error: {
                code: 'MISSING_DATA',
                message: 'Missing email or message',
            },
        };

    return {
        status: 200,
        data: {
            message: 'Sent',
        },
    };
}
