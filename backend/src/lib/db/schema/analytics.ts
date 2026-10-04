import { pgTable, uuid, foreignKey, timestamp, integer, text, index } from 'drizzle-orm/pg-core';
import { users } from './users';
import { channels } from './channels';

export const analytics = pgTable(
  'analytics',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    channelId: uuid('channel_id').notNull(),
    userId: uuid('user_id'),
    watchDuration: integer('watch_duration'),
    quality: text('quality'),
    device: text('device'),
    startTime: timestamp('start_time', { withTimezone: true }).defaultNow(),
    endTime: timestamp('end_time', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  },
  (table) => [
    foreignKey({
      columns: [table.channelId],
      foreignColumns: [channels.id],
      name: 'analytics_channel_id_fk',
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: 'analytics_user_id_fk',
    }).onDelete('cascade'),
    index('analytics_channel_id_created_at_idx').on(table.channelId, table.createdAt),
    index('analytics_user_id_idx').on(table.userId),
  ]
);

export type Analytics = typeof analytics.$inferSelect;
export type NewAnalytics = typeof analytics.$inferInsert;