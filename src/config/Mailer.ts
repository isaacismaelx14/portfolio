import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_DIRECTION,
        pass: process.env.EMAIL_PASSWORD,
    },
});

mailer.verify().then(() => console.log('ready'));

export default mailer;
