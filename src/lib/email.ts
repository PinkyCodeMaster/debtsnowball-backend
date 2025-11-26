import env from '../env';
import { Resend } from 'resend';

if (!env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set. Email sending will fail.');
}

export const resend = new Resend(env.RESEND_API_KEY);
export const EMAIL_FROM = env.EMAIL_FROM || 'onboarding@debtsnowball.app';
export const APP_NAME = 'Debt Snowball';