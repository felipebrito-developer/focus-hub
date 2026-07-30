import { type BaseSQLiteDatabase } from "drizzle-orm/sqlite-core";
import { count } from "drizzle-orm";
import type * as schema from "./schema/index";
import { 
  categoryType,
  frequencyType,
  tagType,
  meaning,
  goal,
  habit,
  task,
  resourceType,
} from "./schema/index";

// Import initial data
import { 
  INITIAL_CATEGORIES,
  INITIAL_TAGS,
  INITIAL_FREQUENCIES,
  INITIAL_MEANINGS,
  INITIAL_HABITS,
  INITIAL_GOALS,
  INITIAL_TASKS,
  INITIAL_RESOURCES
} from "./initial-data";

// Define a typed Drizzle database interface
export type SeedDb = BaseSQLiteDatabase<"async", unknown, typeof schema>;

export const seed = async (db: SeedDb): Promise<void> => {
  // Insert categories
  await db.insert(categoryType).values(INITIAL_CATEGORIES).onConflictDoNothing();

  // Insert tag types
  await db.insert(tagType).values(INITIAL_TAGS).onConflictDoNothing();

  // Insert frequencies
  await db.insert(frequencyType).values(INITIAL_FREQUENCIES).onConflictDoNothing();

  // Insert meanings
  await db.insert(meaning).values(INITIAL_MEANINGS).onConflictDoNothing();

  // Insert goals
  await db.insert(goal).values(INITIAL_GOALS).onConflictDoNothing();

  // Insert habits
  await db.insert(habit).values(INITIAL_HABITS).onConflictDoNothing();

  // Insert tasks
  await db.insert(task).values(INITIAL_TASKS).onConflictDoNothing();

  // Insert resources into resourceType table
  await db.insert(resourceType).values(INITIAL_RESOURCES).onConflictDoNothing();
};

export const seedReset = async (db: SeedDb): Promise<void> => {
  // Delete in reverse FK dependency order:
  // resourceType → task → habit → goal → meaning → frequencyType → tagType → categoryType
  
  await db.delete(resourceType);
  await db.delete(task);
  await db.delete(habit);
  await db.delete(goal);
  await db.delete(meaning);
  await db.delete(frequencyType);
  await db.delete(tagType);
  await db.delete(categoryType);
  
  // Then seed
  await seed(db);
};

// CLI entrypoint
const runCli = async () => {
  const isReset = process.argv.includes("--reset");
  
  // Dynamic import to avoid pulling node-only libsql driver into RN bundle
  const { createClient } = await import("@libsql/client");
  const { drizzle } = await import("drizzle-orm/libsql");
  
  // Default DB path: file:focus-hub.sqlite (relative to CWD)
  const dbPath = process.env.SEED_DB_URL || "file:focus-hub.sqlite";
  const client = createClient({ url: dbPath });
  const db = drizzle(client);
  
  try {
    if (isReset) {
      await seedReset(db);
      console.log("seeded reset completed");
    } else {
      await seed(db);
      console.log("seeded successfully");
    }
    
    // Print row counts using correct count() syntax
    const counts = await Promise.all([
      db.select({ n: count() }).from(categoryType),
      db.select({ n: count() }).from(tagType),
      db.select({ n: count() }).from(frequencyType),
      db.select({ n: count() }).from(meaning),
      db.select({ n: count() }).from(goal),
      db.select({ n: count() }).from(habit),
      db.select({ n: count() }).from(task),
      db.select({ n: count() }).from(resourceType),
    ]);
    
    const labels = ["categories","tags","freqs","meanings","goals","habits","tasks","resources"];
    console.log(`rows: ${labels.map((l, i) => `${l}=${counts[i][0].n}`).join(", ")}`);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
};

// Run only when invoked as a script, not when imported.
const isMain = process.argv[1]?.endsWith("seed.ts");
if (isMain) { void runCli(); }