import { test } from "bun:test";
import assert from "node:assert";
import * as schema from "../db/schema/index.ts";
import drizzleConfig from "../drizzle.config.ts";

/**
 * FEL-37: drizzle.config.ts exists, exports correct shape, schema glob resolves,
 * and the schema module loads cleanly under node (guards against op-sqlite-only
 * imports leaking into the shared schema, which would break `drizzle-kit push`).
 *
 * The runtime AC "bun run db:push exits 0" is verified via CLI (Phase 4.5);
 * this test covers the structural + schema-load contract.
 */
test("FEL-37: drizzle.config.ts exports the spec-defined shape", () => {
	assert.equal(drizzleConfig.dialect, "sqlite", 'dialect must be "sqlite"');
	assert.equal(
		drizzleConfig.schema,
		"./db/schema/index.ts",
		"schema glob must point to ./db/schema/index.ts",
	);
	assert.equal(drizzleConfig.out, "./drizzle", 'out must be "./drizzle"');
	assert.ok(
		drizzleConfig.dbCredentials && "url" in drizzleConfig.dbCredentials,
		"dbCredentials.url must be defined",
	);
	assert.equal(
		drizzleConfig.dbCredentials.url,
		":memory:",
		'dbCredentials.url must be ":memory:" per spec (CLI push target; app uses op-sqlite at runtime)',
	);
});

test("FEL-37: schema module loads under node with table exports", () => {
	const keys = Object.keys(schema);
	assert.ok(keys.length > 0, "schema index must export at least one symbol");
	// spot-check a few canonical tables from the 9 schema modules
	assert.ok("activity" in schema, "schema must export `activity` table");
	assert.ok("goal" in schema, "schema must export `goal` table");
	assert.ok("task" in schema, "schema must export `task` table");
});
