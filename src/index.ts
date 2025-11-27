// import { serve } from "@hono/node-server";
// import { Hono } from "hono";
// import { logger } from "hono/logger";
// import { cors } from "hono/cors";
// import { auth } from "./lib/auth";

// const app = new Hono();

// // ---- Logger ----
// app.use(logger());

// // ---- CORS ----
// // Apply to all auth routes without touching the handler
// app.use(
//   "/api/auth/*",
//   cors({
//     origin: (origin) => {
//       if (!origin) return null; // allow requests without Origin
//       const allowedOrigins = [
//         "http://localhost:3000",
//         "http://localhost:9000",
//         "http://localhost:8081",
//         "debtsnowball-native://",
//       ];
//       return allowedOrigins.some((allowed) =>
//         typeof allowed === "string" ? allowed === origin : allowed.test(origin)
//       )
//         ? origin
//         : null;
//     },
//     allowMethods: ["GET", "POST", "OPTIONS"],
//     allowHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

// // ---- Test route ----
// app.get("/", (c) => c.text("Hello Hono!"));

// // ---- Better Auth handler (unchanged) ----
// app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

// // ---- Start server ----
// serve({ fetch: app.fetch, port: 9000, hostname: "0.0.0.0" }, (info) => {
//   console.log(`Server running: http://localhost:${info.port}`);
// });
import { serve } from "@hono/node-server";

import app from "./app";
import env from "./env";

const port = env.PORT;
// eslint-disable-next-line no-console
console.log(`Server is running on port http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});