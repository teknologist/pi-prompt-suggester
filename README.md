# pi-autoprompter

A pi extension that suggests the user's likely next prompt after each assistant turn.

## Core idea

Instead of naive autocomplete, `pi-autoprompter` uses a two-stage approach:

1. **Seeding pass (meta-meta prompt, infrequent):**
   - Explore repository intent (vision/docs/code signals)
   - Produce a compact, reusable `intent seed`
   - Recompute when important files change (hash-based invalidation)

2. **Suggestion pass (meta prompt, frequent):**
   - Use recent conversation trajectory + latest assistant turn + `intent seed`
   - Generate a high-quality next-prompt suggestion
   - Prefill editor / accept with key action (e.g. Tab)

## Status

Architecture scaffold initialized (module boundaries + ports/adapters + config schema).
Implementations are intentionally pending.

See:
- [`vision.md`](./vision.md)
- [`docs/architecture.md`](./docs/architecture.md)
- [`docs/meta-prompts.md`](./docs/meta-prompts.md)
- [`docs/implementation-plan.md`](./docs/implementation-plan.md)
- [`docs/architecture-plan.md`](./docs/architecture-plan.md)
- [`config/autoprompter.config.example.json`](./config/autoprompter.config.example.json)
