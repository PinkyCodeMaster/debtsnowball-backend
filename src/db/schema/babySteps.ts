import { pgTable, text, uuid, timestamp, decimal, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { toZodV4SchemaTyped } from "@/lib/zod-utils";
import { user } from "./users";
import { ZodObject, z } from "zod";

// ----------------------
// Baby Steps table
// ----------------------
export const babySteps = pgTable("baby_steps", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" })
    .unique(),
  currentStep: integer("current_step").notNull().default(1),
  step1Progress: decimal("step1_progress", { precision: 10, scale: 2 }).notNull().default("0"),
  step1Target: decimal("step1_target", { precision: 10, scale: 2 }).notNull().default("1000"),
  step1Completed: boolean("step1_completed").notNull().default(false),
  step2Completed: boolean("step2_completed").notNull().default(false),
  step3Progress: decimal("step3_progress", { precision: 10, scale: 2 }).notNull().default("0"),
  step3Target: decimal("step3_target", { precision: 10, scale: 2 }).notNull().default("0"),
  step3Completed: boolean("step3_completed").notNull().default(false),
  emergencyFundBalance: decimal("emergency_fund_balance", { precision: 10, scale: 2 })
    .notNull()
    .default("0"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ----------------------
// Types inferred from Drizzle
// ----------------------
export type BabyStep = typeof babySteps.$inferSelect;
export type NewBabyStep = typeof babySteps.$inferInsert;
export type BabyStepUpdate = Partial<NewBabyStep>;

// ----------------------
// Zod schemas
// ----------------------
export const selectBabyStepsSchema = toZodV4SchemaTyped(createSelectSchema(babySteps)).nullable();

const insertSchema = toZodV4SchemaTyped(
  createInsertSchema(babySteps, { userId: (field) => field.min(1) })
    .required({ currentStep: true })
    .omit({ id: true, updatedAt: true })
);

// ⚠️ Cast to ZodObject safely
export const insertBabyStepSchema = insertSchema as unknown as ZodObject<any>;

// Patch schema is partial of insert schema
export const patchBabyStepSchema = insertBabyStepSchema.partial();
