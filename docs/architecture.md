# Architecture (Draft)

## Overview

`pi-autoprompter` is a pi extension with two pipelines:

1. **Seeding pipeline** (slow, infrequent)
2. **Suggestion pipeline** (fast, every turn)

---

## 1) Seeding pipeline (meta-meta)

### Inputs
- Repository tree + selected high-signal files
- Optional git metadata (recent commit subjects)

### Steps
1. Discover candidate files (README, vision, docs, ADRs, architecture notes, roadmap files, key config/code entrypoints).
2. Rank candidates for intent relevance.
3. Run meta-meta prompt to infer durable user/project intent.
4. Emit normalized seed artifact.

### Outputs
`./.pi/autoprompter/seed.json` (proposed)

Example fields:
- `projectIntentSummary`
- `topObjectives[]`
- `constraints[]`
- `keyFiles[]` with `path`, `whyImportant`, `hash`
- `openQuestions[]`
- `confidence`
- `generatedAt`
- `seedVersion`

### Invalidation
Recompute if:
- any `keyFiles[].hash` changes
- explicit `/autoprompter reseed`
- optional periodic staleness rule

---

## 2) Suggestion pipeline (meta)

### Trigger
- `turn_end` or `agent_end` in pi extension lifecycle.

### Runtime context pack (budgeted)
- Last assistant turn summary
- Last N user prompts (initially 8-12)
- Current execution state hints (errors/failures/touched files)
- Intent seed excerpt

### Prompting
- Use strict output schema (JSON)
- Return:
  - `suggestion`
  - `confidence`
  - `intentTag`
  - `reasoningBrief` (optional internal/debug)

### Post-processing
- Confidence gate
- Sanitization (length, imperative style, no boilerplate)
- Render to UI as suggestion/prefill

---

## 3) Storage

Proposed local state directory:
- `./.pi/autoprompter/seed.json`
- `./.pi/autoprompter/state.json` (history, metrics, settings)

---

## 4) pi extension integration points

- `session_start`: load state/seed
- `agent_end` or `turn_end`: compute suggestion
- `ctx.ui.setEditorText(...)` for initial MVP prefill workflow
- later: custom editor ghost text with explicit accept key behavior

---

## 5) Evaluation loop (future)

Track lightweight metrics:
- suggestion accepted / edited / ignored
- edit distance from suggestion to submitted prompt
- latency and token usage

Use replay-based eval harness to improve heuristics and prompts over time.
