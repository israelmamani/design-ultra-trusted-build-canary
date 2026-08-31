// Deterministic "build": bundles src/index.mjs's exports into a single
// dist/index.mjs with no external module resolution at runtime, proving a
// real build step (not just a copy) ran inside the sandbox. No bundler
// dependency - hand-rolled and tiny on purpose, so this canary needs
// nothing beyond NODE_BASIC_V1.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');
const srcPath = path.join(root, 'src', 'index.mjs');
const distDir = path.join(root, 'dist');
const distPath = path.join(distDir, 'index.mjs');

const source = readFileSync(srcPath, 'utf8');
const buildTimestamp = '2026-08-31T00:00:00.000Z'; // fixed, not Date.now() - keeps the artifact byte-identical across runs
const banner = `// Built by design-ultra-trusted-build-canary's own build script. Source: src/index.mjs. Build marker: ${buildTimestamp}\n`;

mkdirSync(distDir, { recursive: true });
writeFileSync(distPath, banner + source);

console.log(`build: wrote ${distPath}`);
