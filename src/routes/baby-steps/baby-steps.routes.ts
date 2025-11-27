import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";
import {
    selectBabyStepsSchema,
    insertBabyStepSchema,
    patchBabyStepSchema,
} from "@/db/schema";

const tags = ["Baby Steps"];

// ----------------------
// List baby steps for the current user
// ----------------------
export const list = createRoute({
    path: "/baby-steps",
    method: "get",
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(selectBabyStepsSchema, "Baby steps progress"),
    },
});

// ----------------------
// Create a new baby steps record for the user
// ----------------------
export const create = createRoute({
    path: "/baby-steps",
    method: "post",
    request: {
        body: jsonContentRequired(insertBabyStepSchema, "New baby steps record"),
    },
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(selectBabyStepsSchema, "Created baby steps"),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(insertBabyStepSchema),
            "Validation errors"
        ),
    },
});

// ----------------------
// Patch/update baby steps for the current user
// ----------------------
export const patch = createRoute({
    path: "/baby-steps",
    method: "patch",
    request: {
        body: jsonContentRequired(patchBabyStepSchema, "Updates for baby steps"),
    },
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(selectBabyStepsSchema, "Updated baby steps"),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(patchBabyStepSchema),
            "Validation errors"
        ),
    },
});

// ----------------------
// Types for routes
// ----------------------
export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type PatchRoute = typeof patch;
