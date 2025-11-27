import { eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import type { AppRouteHandler } from "@/lib/types";
import { db } from "@/db";
import { babySteps } from "@/db/schema";
import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from "@/lib/constants";
import type { ListRoute, CreateRoute, PatchRoute } from "./baby-steps.routes";

// ----------------------
// Get authenticated user ID
// ----------------------
const getUserId = (c: any) => {
    const userId = c.req.header("x-user-id");
    if (!userId) throw new Error("Unauthorized");
    return userId;
};

// ----------------------
// List baby steps
// ----------------------
export const list: AppRouteHandler<ListRoute> = async (c) => {
    const userId = getUserId(c);

    const babyStep = await db.query.babySteps.findFirst({
        where(fields, operators) {
            return operators.eq(fields.userId, userId);
        },
    });

    return c.json(
        babyStep
            ? { ...babyStep, updatedAt: babyStep.updatedAt.toISOString() }
            : null, // null is compatible with nullable schema
        HttpStatusCodes.OK
    );
};

// ----------------------
// Create baby steps
// ----------------------
export const create: AppRouteHandler<CreateRoute> = async (c) => {
    const userId = getUserId(c);
    const newStep = c.req.valid("json");

    const [inserted] = await db.insert(babySteps)
        .values({ ...newStep, userId })
        .returning();

    return c.json(
        { ...inserted, updatedAt: inserted.updatedAt.toISOString() },
        HttpStatusCodes.OK
    );
};

// ----------------------
// Patch baby steps
// ----------------------
export const patch: AppRouteHandler<PatchRoute> = async (c) => {
    const userId = getUserId(c);
    const updates = c.req.valid("json");

    if (Object.keys(updates).length === 0) {
        return c.json(
            {
                success: false,
                error: {
                    issues: [
                        {
                            code: ZOD_ERROR_CODES.INVALID_UPDATES,
                            path: [],
                            message: ZOD_ERROR_MESSAGES.NO_UPDATES,
                        },
                    ],
                    name: "ZodError",
                },
            },
            HttpStatusCodes.UNPROCESSABLE_ENTITY
        );
    }

    const [updated] = await db.update(babySteps)
        .set(updates)
        .where(eq(babySteps.userId, userId))
        .returning();

    if (!updated) {
        return c.json(
            {
                success: false,
                error: {
                    issues: [{ code: "NOT_FOUND", path: [], message: "Baby step not found" }],
                    name: "NotFoundError",
                },
            },
            HttpStatusCodes.UNPROCESSABLE_ENTITY // 422
        );
    }

    return c.json(
        { ...updated, updatedAt: updated.updatedAt.toISOString() },
        HttpStatusCodes.OK
    );
};
