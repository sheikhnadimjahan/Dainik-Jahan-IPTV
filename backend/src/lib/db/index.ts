import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema/index';

let db: ReturnType<typeof drizzle> | null = null;

export function getDatabase() {
  if (!db) {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    db = drizzle(pool, { schema });
  }
  return db;
}

export { schema };
export type Database = ReturnType<typeof drizzle>;