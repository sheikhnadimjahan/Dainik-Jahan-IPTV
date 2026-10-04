import { pgTable, text, timestamp, uuid, foreignKey, index, integer } from 'drizzle-orm/pg-core';
import { channels } from './channels';

export const programs = pgTable(
  'programs',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    channelId: uuid('channel_id').notNull(),
    tvgId: text('tvg_id'),
    title: text('title').notNull(),
    description: text('description'),
    category: text('category'),
    startTime: timestamp('start_time', { withTimezone: true }).notNull(),
    endTime: timestamp('end_time', { withTimezone: true }).notNull(),
    duration: integer('duration'),
    thumbnailUrl: text('thumbnail_url'),
    rating: text('rating'),
    language: text('language').default('en'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().onUpdateNow(),
  },
  (table) => [
    foreignKey({
      columns: [table.channelId],
      foreignColumns: [channels.id],
      name: 'programs_channel_id_fk',
    }).onDelete('cascade'),
    index('programs_channel_id_start_time_idx').on(table.channelId, table.startTime),
    index('programs_tvg_id_idx').on(table.tvgId),
  ]
);

export type Program = typeof programs.$inferSelect;
export type NewProgram = typeof programs.$inferInsert;