import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const platformSettings = pgTable('platform_settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
  description: text('description'),
  updatedBy: uuid('updated_by'),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().onUpdateNow(),
});

export type PlatformSetting = typeof platformSettings.$inferSelect;
export type NewPlatformSetting = typeof platformSettings.$inferInsert;

export const featureFlags = pgTable('feature_flags', {
  key: text('key').primaryKey(),
  enabled: text('enabled').default('false'),
  description: text('description'),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().onUpdateNow(),
});

export type FeatureFlag = typeof featureFlags.$inferSelect;
export type NewFeatureFlag = typeof featureFlags.$inferInsert;