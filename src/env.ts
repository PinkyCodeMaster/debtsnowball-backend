/* eslint-disable node/no-process-env */
import { expand } from "dotenv-expand";
import { config } from "dotenv";
import path from "node:path";
import { z } from "zod";

expand(config({
    path: path.resolve(
        process.cwd(),
        process.env.NODE_ENV === "test" ? ".env.test" : ".env",
    ),
}));

const EnvSchema = z.object({
    NODE_ENV: z.string().default("development"),
    PORT: z.coerce.number().default(9000),
    LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]),
    DATABASE_URL: z.url(),
    HONO_PUBLIC_API_URL: z.url().optional(),
    BETTER_AUTH_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    EMAIL_FROM: z.email().optional(),
    EXPO_PUBLIC_API_URL: z.url().optional(),
    REQUIRE_EMAIL_VERIFICATION: z.coerce.boolean().default(true),
});

export type env = z.infer<typeof EnvSchema>;

// eslint-disable-next-line ts/no-redeclare
const { data: env, error } = EnvSchema.safeParse(process.env);

if (error) {
    console.error("❌ Invalid env:");
    console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
    process.exit(1);
}

export default env!;