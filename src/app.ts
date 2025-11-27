import babySteps from "@/routes/baby-steps/baby-steps.index";
import configureOpenAPI from "@/lib/configure-open-api";
import createApp from "@/lib/create-app";
import index from "@/routes/index.route";
import { auth } from "./lib/auth";

const app = createApp();

configureOpenAPI(app);

// // ---- Better Auth handler (unchanged) ----
app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

const routes = [
    index,
    babySteps
] as const;

routes.forEach((route) => {
    app.route("/", route);
});

export type AppType = typeof routes[number];

export default app;