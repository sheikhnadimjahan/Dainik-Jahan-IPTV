import { pgTable, text, timestamp, uuid, jsonb, boolean } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  username: text('username').unique(),
  avatarUrl: text('avatar_url'),
  role: text('role').$type<'user' | 'moderator' | 'admin' | 'superadmin'>().default('user'),
  locale: text('locale').default('en'),
  timezone: text('timezone').default('UTC'),
  emailVerified: boolean('email_verified').default(false),
  preferences: jsonb('preferences').$type<Record<string, unknown>>().default({}),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().onUpdateNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;