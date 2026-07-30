import { drizzle } from 'drizzle-orm/op-sqlite';
import { open } from '@op-engineering/op-sqlite';
// Import schema from shared package once it's populated
// import * as schema from '@focus-hub/shared/db/schema';

// 1. Open the local SQLite database using op-sqlite
export const sqliteDb = open({
  name: 'focus-hub.sqlite',
  location: 'default',
});

// 2. Initialize Drizzle ORM with the op-sqlite connection
export const db = drizzle(sqliteDb, {
  // schema: schema,
  // logger: true, // Enable for debugging
});

// Helper to initialize tables if needed (usually handled via migrations, but for simple setups we can use raw queries)
export const initDb = async () => {
  try {
    // Basic initialization queries can go here if not using drizzle-kit migrate directly on mobile
    // sqliteDb.execute('PRAGMA foreign_keys = ON');
    console.log('Database initialized');
  } catch (error) {
    console.error('Failed to init DB', error);
  }
};
