import { pgTable, uuid, foreignKey, timestamp, text, jsonb, boolean, index } from 'drizzle-orm/pg-core';
import { users } from './users';

export const moderation = pgTable(
  'moderation',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    contentType: text('content_type').notNull(),
    contentId: uuid('content_id').notNull(),
    reason: text('reason').notNull(),
    description: text('description'),
    status: text('status').$type<'pending' | 'approved' | 'rejected'>().default('pending'),
    reviewedBy: uuid('reviewed_by'),
    metadata: jsonb('metadata').$type<Record<string, unknown>>().default({}),
    reviewedAt: timestamp('reviewed_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  },
  (table) => [
    foreignKey({
      columns: [table.reviewedBy],
      foreignColumns: [users.id],
      name: 'moderation_reviewed_by_fk',
    }).onDelete('set null'),
    index('moderation_status_idx').on(table.status),
    index('moderation_created_at_idx').on(table.createdAt),
  ]
);

export type Moderation = typeof moderation.$inferSelect;
export type NewModeration = typeof moderation.$inferInsert;