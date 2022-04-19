import type { NextApiRequest, NextApiResponse } from 'next';
import Mailer from '../../config/Mailer';
type Data = {
    message: string;
    error?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
   if (req.method !== 'POST') {
       res.status(405).send({ message: 'Request not allowed' });
       return;
    }
    
    try {
        const { body, subject } = req.body;
        await Mailer.sendMail({
            from: 'Portfolio Contact <portfolio@example.net>',
            to: 'isaacismaelx14@gmail.com',
            subject,
            text: body,
        });
        res.status(200).json({ message: 'Sent' });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}
