import { pgTable, text, timestamp, uuid, foreignKey, boolean, index } from 'drizzle-orm/pg-core';
import { categories } from './categories';

export const channels = pgTable(
  'channels',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description'),
    logoUrl: text('logo_url'),
    categoryId: uuid('category_id'),
    streamUrl: text('stream_url').notNull(),
    backupUrls: text('backup_urls').$type<string[]>().default([]),
    tvgId: text('tvg_id'),
    tvgName: text('tvg_name'),
    tvgLogo: text('tvg_logo'),
    quality: text('quality').$type<'sd' | 'hd' | '4k' | 'auto'>().default('auto'),
    isActive: boolean('is_active').default(true),
    epgUrl: text('epg_url'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().onUpdateNow(),
  },
  (table) => [
    foreignKey({
      columns: [table.categoryId],
      foreignColumns: [categories.id],
      name: 'channels_category_id_fk',
    }).onDelete('set null'),
    index('channels_tvg_id_idx').on(table.tvgId),
    index('channels_is_active_idx').on(table.isActive),
  ]
);

export type Channel = typeof channels.$inferSelect;
export type NewChannel = typeof channels.$inferInsert;