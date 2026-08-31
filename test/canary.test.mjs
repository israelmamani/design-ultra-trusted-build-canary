import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { classify, sumIfNumbers } from '../src/index.mjs';

test('repository code behavior: classify uses the real is-number dependency', () => {
  assert.equal(classify(7), 'number');
  assert.equal(classify('7'), 'number');
  assert.equal(classify('abc'), 'not-a-number');
  assert.equal(classify(Infinity), 'not-a-number'); // is-number's own documented behavior
});

test('repository code behavior: sumIfNumbers filters and sums only numeric-like values', () => {
  assert.equal(sumIfNumbers([1, '2', 'three', 4]), 7);
  assert.equal(sumIfNumbers([]), 0);
});

test('build artifact: dist/index.mjs exists and behaves identically to src', async () => {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const distPath = path.join(here, '..', 'dist', 'index.mjs');
  assert.ok(existsSync(distPath), 'npm run build must have produced dist/index.mjs before tests run');
  const distContent = readFileSync(distPath, 'utf8');
  assert.match(distContent, /Built by design-ultra-trusted-build-canary's own build script/);
  const dist = await import(pathToFileURL(distPath).href);
  assert.equal(dist.classify(7), 'number');
  assert.equal(dist.sumIfNumbers([1, 2, 3]), 6);
});
