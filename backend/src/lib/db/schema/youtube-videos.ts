import { pgTable, text, timestamp, uuid, foreignKey, integer, index } from 'drizzle-orm/pg-core';
import { categories } from './categories';

export const youtubeVideos = pgTable(
  'youtube_videos',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    videoId: text('video_id').notNull().unique(),
    title: text('title').notNull(),
    description: text('description'),
    thumbnailUrl: text('thumbnail_url'),
    duration: integer('duration'),
    categoryId: uuid('category_id'),
    publishedAt: timestamp('published_at', { withTimezone: true }),
    viewCount: integer('view_count').default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().onUpdateNow(),
  },
  (table) => [
    foreignKey({
      columns: [table.categoryId],
      foreignColumns: [categories.id],
      name: 'youtube_videos_category_id_fk',
    }).onDelete('set null'),
    index('youtube_videos_video_id_idx').on(table.videoId),
  ]
);

export type YoutubeVideo = typeof youtubeVideos.$inferSelect;
export type NewYoutubeVideo = typeof youtubeVideos.$inferInsert;