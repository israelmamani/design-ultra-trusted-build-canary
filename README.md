# design-ultra-trusted-build-canary

A deliberately tiny, purpose-built repository whose only job is to prove
Design Ultra's real repository TRUSTED_BUILD path end-to-end:

```
Git repository @ exact SHA
  -> operator-issued PINNED_SHA trust grant
  -> trusted clone + SHA verification
  -> exact repository snapshot (no .git, no hooks)
  -> Bubblewrap sandbox (NODE_BASIC_V1 toolchain profile)
  -> npm ci --ignore-scripts (via the egress broker)
  -> npm run build (network disabled)
  -> npm test (network disabled)
  -> attestation with execution_input_type="repository"
  -> cleanup
```

This is not a real application and is never deployed. It has no framework,
no TypeScript, no browser, no database, no external API, no native modules,
and exactly one pure-JavaScript dependency (`is-number`) to prove real
dependency retrieval through the broker.

`npm run build` bundles `src/index.mjs` into `dist/index.mjs`
deterministically. `npm test` (Node's built-in test runner) exercises both
the source behavior and the build artifact.
