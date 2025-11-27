import { pgTable, text, uuid, timestamp, decimal, boolean, integer } from 'drizzle-orm/pg-core';
import { user } from './users';
import { expenseCategoryEnum, expensePriorityEnum, expenseFrequencyEnum } from './enums';

export const expenses = pgTable('expenses', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  category: expenseCategoryEnum('category').notNull(),
  priority: expensePriorityEnum('priority').notNull(),
  frequency: expenseFrequencyEnum('frequency').notNull(),
  dueDate: integer('due_date'),
  isUCPaid: boolean('is_uc_paid').notNull().default(false),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Expense = typeof expenses.$inferSelect;
export type NewExpense = typeof expenses.$inferInsert;
export type ExpenseUpdate = Partial<NewExpense>;
