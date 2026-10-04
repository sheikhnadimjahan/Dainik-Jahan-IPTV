import { pgTable, uuid, foreignKey, timestamp, text, jsonb, index } from 'drizzle-orm/pg-core';
import { users } from './users';

export const adminLogs = pgTable(
  'admin_logs',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    adminId: uuid('admin_id').notNull(),
    action: text('action').notNull(),
    resourceType: text('resource_type'),
    resourceId: uuid('resource_id'),
    changes: jsonb('changes').$type<Record<string, unknown>>().default({}),
    ipAddress: text('ip_address'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  },
  (table) => [
    foreignKey({
      columns: [table.adminId],
      foreignColumns: [users.id],
      name: 'admin_logs_admin_id_fk',
    }).onDelete('cascade'),
    index('admin_logs_created_at_idx').on(table.createdAt),
  ]
);

export type AdminLog = typeof adminLogs.$inferSelect;
export type NewAdminLog = typeof adminLogs.$inferInsert;