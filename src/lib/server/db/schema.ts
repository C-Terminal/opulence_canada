// src/lib/server/db/schema.ts
import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
  numeric, // Added for potential custom fields
} from 'drizzle-orm/pg-core';
import type { AdapterAccount } from '@auth/core/adapters'; // Use AdapterAccount type for correctness
 // Use AdapterAccount type for correctness
import { type InferSelectModel, type InferInsertModel, relations } from 'drizzle-orm';

export const usersTable = pgTable('user', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(), // Ensure email is unique
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  // Add any custom user fields here
  // Example: role: text('role').default('user'),
  // Example: isActive: boolean('isActive').default(true),
  hashedPassword: text('hashedPassword')// ADD THIS LINE (nullable)
});

export const accountsTable = pgTable(
  'account',
  {
      userId: text('userId')
          .notNull()
          .references(() => usersTable.id, { onDelete: 'cascade' }),
      type: text('type').$type<AdapterAccount['type']>().notNull(),
      provider: text('provider').notNull(),
      providerAccountId: text('providerAccountId').notNull(),
      refresh_token: text('refresh_token'),
      access_token: text('access_token'),
      expires_at: integer('expires_at'),
      token_type: text('token_type'),
      scope: text('scope'),
      id_token: text('id_token'),
      session_state: text('session_state'),
  },
  (account) => ({
      compoundKey: primaryKey({
          columns: [account.provider, account.providerAccountId],
      }),
  })
);

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').notNull().primaryKey(),
  userId: text('userId')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
  'verificationToken',
  {
      identifier: text('identifier').notNull(),
      token: text('token').notNull(),
      expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => ({
      compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

// Define relations
export const usersRelations = relations(usersTable, ({ many }) => ({
  accounts: many(accountsTable),
  sessions: many(sessions)
}));

export const accountsRelations = relations(accountsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [accountsTable.userId],
    references: [usersTable.id]
  })
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(usersTable, {
    fields: [sessions.userId],
    references: [usersTable.id]
  })
}));


export const transactions = pgTable('transactions', {
  id: serial('id').primaryKey(),
  merchant: text('merchant').notNull(),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  date: timestamp('date').defaultNow().notNull(),
  status: text('status').default('completed'),
  logo: text('logo')
});

export const bills = pgTable('bills', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  dueDate: timestamp('due_date').notNull(),
  category: text('category').notNull(),
  logo: text('logo')
});

export const wallets = pgTable('wallets', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  balance: numeric('balance', { precision: 12, scale: 2 }).notNull(),
  type: text('type').notNull()
});




// --- Types for convenience ---
export type User = InferSelectModel<typeof usersTable>;
export type NewUser = InferInsertModel<typeof usersTable>;
export type Account = InferSelectModel<typeof accountsTable>;
export type NewAccount = InferInsertModel<typeof accountsTable>;
export type Session = InferSelectModel<typeof sessions>;
export type NewSession = InferInsertModel<typeof sessions>;
export type VerificationToken = InferSelectModel<typeof verificationTokens>;
export type NewVerificationToken = InferInsertModel<typeof verificationTokens>;