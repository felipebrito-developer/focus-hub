import { test, expect } from 'bun:test';
import * as schema from '@focus-hub/shared/db/schema';

test('schema resolves and exports expected tables', () => {
  // Check that key tables are exported
  expect(schema).toHaveProperty('activity');
  expect(schema).toHaveProperty('goal');
  expect(schema).toHaveProperty('task');
  expect(schema).toHaveProperty('meaning');
  expect(Object.keys(schema).length).toBeGreaterThan(60);
});