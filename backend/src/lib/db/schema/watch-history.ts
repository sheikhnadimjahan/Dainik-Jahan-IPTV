import { pgTable, uuid, foreignKey, timestamp, integer, index } from 'drizzle-orm/pg-core';
import { users } from './users';
import { channels } from './channels';

export const watchHistory = pgTable(
  'watch_history',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull(),
    channelId: uuid('channel_id').notNull(),
    positionSeconds: integer('position_seconds').default(0),
    duration: integer('duration'),
    watchedAt: timestamp('watched_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().onUpdateNow(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: 'watch_history_user_id_fk',
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.channelId],
      foreignColumns: [channels.id],
      name: 'watch_history_channel_id_fk',
    }).onDelete('cascade'),
    index('watch_history_user_id_updated_at_idx').on(table.userId, table.updatedAt),
  ]
);

export type WatchHistory = typeof watchHistory.$inferSelect;
export type NewWatchHistory = typeof watchHistory.$inferInsert;