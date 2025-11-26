import { sendVerificationEmail, sendPasswordResetEmail, sendWelcomeEmail } from './email.service';
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from 'better-auth/plugins';
import { betterAuth } from "better-auth";
import * as schema from "@/db/schema";
import { db } from "@/db";

const APP_URL = process.env.EXPO_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3000';

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: process.env.REQUIRE_EMAIL_VERIFICATION === 'true',
        async sendVerificationEmail({ user, url }: { user: any; url: string }) {
            console.log('Sending verification email to:', user.email);
            await sendVerificationEmail(user.email, url, user.name);
        },
        async sendResetPasswordEmail({ user, url }: { user: any; url: string }) {
            console.log('Sending password reset email to:', user.email);
            await sendPasswordResetEmail(user.email, url, user.name);
        },
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
    },
    async onSignUp(user: any) {
        console.log('New user signed up:', user.email);
        await sendWelcomeEmail(user.email, user.name || 'there');
    },
    plugins: [
        openAPI()
    ],
});