import { sendVerificationEmail, sendPasswordResetEmail, sendWelcomeEmail } from './email.service';
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { openAPI } from 'better-auth/plugins';
import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import * as schema from "../db/schema";
import { db } from "../db";

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
    // async onSignUp(user: any) {
    //     console.log('New user signed up:', user.email);
    //     await sendWelcomeEmail(user.email, user.name || 'there');
    // },
    plugins: [
        openAPI({ theme: "deepSpace", }),
        expo(),
        nextCookies()
    ],
    trustedOrigins: [
        "debtsnowball-native://",
        "http://localhost:3000",
        // Development mode - Expo's exp:// scheme with local IP ranges
        ...(process.env.NODE_ENV === "development" ? [
            "exp://*/*",                 // Trust all Expo development URLs
            "exp://10.0.0.*:*/*",        // Trust 10.0.0.x IP range
            "exp://192.168.*.*:*/*",     // Trust 192.168.x.x IP range
            "exp://172.*.*.*:*/*",       // Trust 172.x.x.x IP range
            "exp://localhost:*/*"        // Trust localhost
        ] : []),
        "withbetterauth://"
    ],
    logger: {
        log: (level, message, ...args) => {
            console.log(`${level}: ${message}`);
            console.log(JSON.stringify(args, null, 2));
        },
    },
});