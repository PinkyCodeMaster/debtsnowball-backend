import { pgTable, text, uuid, timestamp, decimal, boolean, integer } from 'drizzle-orm/pg-core';
import { user } from './users';
import { incomeTypeEnum, incomeFrequencyEnum } from './enums';

export const incomes = pgTable('incomes', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  type: incomeTypeEnum('type').notNull(),
  name: text('name').notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  frequency: incomeFrequencyEnum('frequency').notNull(),
  isNet: boolean('is_net').notNull().default(true),
  startDate: timestamp('start_date').notNull(),
  paymentDay: integer('payment_day'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const universalCredit = pgTable('universal_credit', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' })
    .unique(),
  baseAmount: decimal('base_amount', { precision: 10, scale: 2 }).notNull(),
  workAllowance: decimal('work_allowance', { precision: 10, scale: 2 }).notNull().default('404'),
  taperRate: decimal('taper_rate', { precision: 5, scale: 2 }).notNull().default('0.55'),
  housingIncluded: boolean('housing_included').notNull().default(false),
  councilTaxIncluded: boolean('council_tax_included').notNull().default(false),
  paymentDay: integer('payment_day').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Income = typeof incomes.$inferSelect;
export type NewIncome = typeof incomes.$inferInsert;
export type IncomeUpdate = Partial<NewIncome>;