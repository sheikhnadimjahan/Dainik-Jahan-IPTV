import { pgTable, uuid, foreignKey, timestamp, primaryKey } from 'drizzle-orm/pg-core';
import { users } from './users';
import { channels } from './channels';

export const favorites = pgTable(
  'favorites',
  {
    userId: uuid('user_id').notNull(),
    channelId: uuid('channel_id').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.channelId] }),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: 'favorites_user_id_fk',
    }).onDelete('cascade'),
    foreignKey({
      columns: [table.channelId],
      foreignColumns: [channels.id],
      name: 'favorites_channel_id_fk',
    }).onDelete('cascade'),
  ]
);

export type Favorite = typeof favorites.$inferSelect;
export type NewFavorite = typeof favorites.$inferInsert;