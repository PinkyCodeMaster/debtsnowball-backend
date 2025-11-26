import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set. Email sending will fail.');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export const EMAIL_FROM = process.env.EMAIL_FROM || 'onboarding@debtsnowball.app';
export const APP_NAME = 'Debt Snowball';
export const APP_URL = process.env.EXPO_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:8081';
