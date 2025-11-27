import type { Schema } from "hono";

import { OpenAPIHono } from "@hono/zod-openapi";
import { requestId } from "hono/request-id";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";
import { cors } from "hono/cors";

import { pinoLogger } from "@/middlewares/pino-logger";

import type { AppBindings, AppOpenAPI } from "./types";

export function createRouter() {
    return new OpenAPIHono<AppBindings>({
        strict: false,
        defaultHook,
    });
}

export default function createApp() {
    const app = createRouter();
    app.use(requestId())
        .use(serveEmojiFavicon("📝"))
        .use(pinoLogger());

    app.notFound(notFound);
    app.onError(onError);

    // // ---- CORS ----
    // // Apply to all auth routes without touching the handler
    app.use(
        "/api/auth/*",
        cors({
            origin: (origin) => {
                if (!origin) return null; // allow requests without Origin
                const allowedOrigins = [
                    "http://localhost:3000",
                    "http://localhost:9000",
                    "http://localhost:8081",
                    "debtsnowball-native://",
                ];
                return allowedOrigins.some((allowed) =>
                    allowed === origin
                )
                    ? origin
                    : null;
            },
            allowMethods: ["GET", "POST", "OPTIONS"],
            allowHeaders: ["Content-Type", "Authorization"],
            credentials: true,
        })
    );

    return app;
}

export function createTestApp<S extends Schema>(router: AppOpenAPI<S>) {
    return createApp().route("/", router);
}