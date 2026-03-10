# Vision: pi-autoprompter

## One-line vision

Build the best possible next-prompt suggestion system for pi, so the user can keep momentum with minimal typing and maximal intent alignment.

## Problem

Current prompt suggestion/autocomplete behavior in coding agents is often shallow:
- It relies mostly on the immediately previous assistant output
- It does not robustly model long-running user intent
- It can suggest generic, low-value follow-ups

For advanced workflows, users steer sessions with evolving goals, architectural constraints, and repo-specific intent that basic autocomplete misses.

## Product thesis

The right next prompt is best predicted by combining:
1. **Short-horizon context** (last turns, current execution state)
2. **Long-horizon intent prior** (seeded understanding of what this repo/user is trying to achieve)

Therefore, we use a **two-stage system**:
- A **meta-meta seeding pass** that infers durable project/user intent from the repository
- A **per-turn suggestion pass** that predicts the immediate next user prompt

## Design principles

1. **Intent over surface text**
   - Optimize for what the user actually wants, not just lexical continuation.

2. **High-signal, low-token runtime**
   - Heavy analysis happens during seeding.
   - Turn-time inference consumes compact distilled artifacts.

3. **Deterministic + inspectable**
   - Store seeds and trigger reasons.
   - Make suggestion rationale auditable.

4. **Safe by default**
   - Suggest; never auto-send prompts.
   - Confidence gate low-quality guesses.

5. **Incremental intelligence**
   - Start with practical heuristics and evolve via evals.

## User experience goals

- After each assistant turn, show a lightweight ghost suggestion in the editor area.
- User accepts suggestion quickly (e.g., Tab), edits if needed, submits.
- Suggestions feel context-aware, repo-aware, and trajectory-aware.
- Suggestions are concise, actionable, and phrased in the user's likely style.

## Functional goals

### 1) Intent seeding

Given a repository, discover and summarize:
- probable project intent
- top constraints/architectural principles
- important docs/files and why they matter
- open strategic questions

Output stored as `seed.json` with source file hashes and confidence.

### 2) Seed invalidation/reseding

Re-seed when:
- tracked high-signal files change (hash mismatch)
- user explicitly requests reseed
- staleness threshold is exceeded

### 3) Per-turn prompt suggestion

Input:
- latest assistant response summary
- recent user prompts/history window
- current state signals (errors, touched files, unresolved tasks)
- intent seed

Output:
- single best next prompt suggestion
- confidence score
- optional alternates (future)

### 4) pi integration

- Extension hooks into turn lifecycle
- Prefills or ghosts suggestion in editor
- Keyboard accept/edit workflow

## Non-goals (initial)

- Fully autonomous conversation steering
- Project management or task planning replacement
- Perfect user intent reconstruction in all repos

## Success criteria (v1)

- Users accept or lightly edit suggestions frequently
- Suggestions reduce friction and increase session throughput
- Token overhead remains bounded and predictable
- Seed remains stable and useful across many turns

## Open questions

- Best UI implementation for ghost text vs prefill in pi TUI
- Optimal history window size vs cost
- Confidence calibration and fallback behavior
- Best default models for seeding vs turn-time suggestion

## Naming

Working name: **pi-autoprompter**
Alternative: `autoprompter`
