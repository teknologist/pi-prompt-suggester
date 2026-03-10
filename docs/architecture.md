# Architecture (Revised)

## Overview

`pi-autoprompter` has three runtime parts:

1. **Suggestion pipeline** (every agent turn)
2. **Async seed manager** (background, non-blocking)
3. **Steering tracker** (accepted vs changed history)

The system intentionally avoids complex heuristic ladders. The prompt-generator model gets rich context and decides.

---

## 1) Async seed manager

### Requirements
- Never block session startup.
- Run seeding/reseeding in background.
- Check seed staleness on session start and after every agent turn.

### Flow
1. Load existing seed if present.
2. Run staleness check (`keyFiles` hash + optional git diff from `sourceCommit`).
3. If stale/missing, enqueue async reseed with payload:
   - `reason`
   - `changedFiles[]`
   - optional `gitDiffSummary`
4. Persist new `seed.json` when ready.

### Read-only policy
- Prefer isolated seeding worker with restricted tools.
- If strict RO sandbox is unavailable, enforce practical guardrails:
  - read-only instruction in prompt
  - pre/post `git status --porcelain` checks
  - reject run if any files changed

---

## 2) Suggestion pipeline

### Trigger
- `agent_end` (or equivalent turn-end hook)

### Inputs
- latest assistant turn text (raw)
- turn status (`success | error | aborted`)
- intent seed (if available)
- steering history (recent accepted/changed examples)

### Deterministic fast-path
- If turn status is `error` or `aborted`, suggest `continue` directly.

### Model path
- Build meta prompt with fixed sections:
  1) role/task
  2) latest assistant output
  3) turn status
  4) seed summary
  5) accepted examples
  6) changed examples
  7) instructions
- Model returns plain text:
  - one suggestion, or
  - `[no suggestion]`

### UI
- Prefill editor (`ctx.ui.setEditorText(...)`) for MVP.

---

## 3) Steering tracker

For each shown suggestion, capture next user message and store:
- `suggestedPrompt`
- `actualUserPrompt`
- `classification` (`accepted_exact | accepted_edited | changed_course`)
- `similarity`

This history is fed back into subsequent prompt generation as concrete examples.

---

## 4) Storage

- `./.pi/autoprompter/seed.json`
- `./.pi/autoprompter/state.json`

`state.json` includes:
- `lastSuggestion`
- reseed job state (`running`, `pending`, `lastCheckAt`)
- bounded `steeringHistory[]`

---

## 5) Integration points

- `session_start`: load state; trigger async staleness check/reseed if needed
- `agent_end`: stale check + suggestion generation
- user submit hook (or nearest equivalent): steering classification/persistence
- `/autoprompter reseed`: manual async reseed trigger
