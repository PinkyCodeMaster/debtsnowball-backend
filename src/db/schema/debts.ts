import { pgTable, text, uuid, timestamp, decimal, boolean, integer } from 'drizzle-orm/pg-core';
import { user } from './users';
import { debtTypeEnum, debtStatusEnum } from './enums';

export const debts = pgTable('debts', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    type: debtTypeEnum('type').notNull(),
    balance: decimal('balance', { precision: 10, scale: 2 }).notNull(),
    interestRate: decimal('interest_rate', { precision: 5, scale: 2 }).notNull(),
    minimumPayment: decimal('minimum_payment', { precision: 10, scale: 2 }).notNull(),
    paymentDay: integer('payment_day'),
    isCCJ: boolean('is_ccj').notNull().default(false),
    ccjDeadline: timestamp('ccj_deadline'),
    creditor: text('creditor').notNull(),
    accountNumber: text('account_number'),
    status: debtStatusEnum('status').notNull().default('active'),
    paidOffDate: timestamp('paid_off_date'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const debtPayments = pgTable('debt_payments', {
    id: uuid('id').primaryKey().defaultRandom(),
    debtId: uuid('debt_id')
        .notNull()
        .references(() => debts.id, { onDelete: 'cascade' }),
    amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
    paymentDate: timestamp('payment_date').notNull(),
    balanceAfter: decimal('balance_after', { precision: 10, scale: 2 }).notNull(),
    notes: text('notes'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Debt = typeof debts.$inferSelect;
export type NewDebt = typeof debts.$inferInsert;

export type DebtUpdate = Partial<NewDebt>;
export type DebtPayment = typeof debtPayments.$inferSelect;

export type NewDebtPayment = typeof debtPayments.$inferInsert;
export type DebtPaymentUpdate = Partial<NewDebtPayment>;    
