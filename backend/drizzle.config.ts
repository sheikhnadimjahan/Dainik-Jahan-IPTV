import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/lib/db/schema/*',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/dainik_jahan',
  },
  migrations: {
    table: '__drizzle_migrations__',
    schema: 'public',
  },
  introspect: {
    casing: 'snake_case',
  },
  verbose: true,
  strict: true,
});
