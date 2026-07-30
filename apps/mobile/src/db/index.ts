import * as schema from "@focus-hub/shared/db/schema";
import { open } from "@op-engineering/op-sqlite";
import { drizzle } from "drizzle-orm/op-sqlite";
import { seedIfEmpty } from "./bootstrap";

export const sqliteDb = open({ name: "focus-hub.sqlite", location: "default" });
export const db = drizzle(sqliteDb, { schema });

export const initDb = async () => {
	await sqliteDb.execute("PRAGMA foreign_keys = ON");
	await seedIfEmpty(db); // first-launch bootstrap
};
