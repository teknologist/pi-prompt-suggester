# Roadmap

## Phase 0: Foundation
- [x] Repo scaffold
- [x] Vision and architecture docs
- [ ] Define `seed.json` schema
- [ ] Define runtime suggestion schema

## Phase 1: Seeding MVP
- [ ] Repo file discovery/ranking
- [ ] Meta-meta prompt runner
- [ ] Persist seed with file hashes
- [ ] `/autoprompter reseed` command

## Phase 2: Suggestion MVP
- [ ] Capture turn-end context pack
- [ ] Meta prompt runner
- [ ] Confidence gate + fallback
- [ ] Prefill editor via `ctx.ui.setEditorText`

## Phase 3: UX Quality
- [ ] Ghost suggestion rendering in custom editor
- [ ] Tab accept behavior
- [ ] Minimal visual indicators and controls

## Phase 4: Evaluation & Tuning
- [ ] Acceptance/edit/ignore telemetry (local only)
- [ ] Replay eval harness
- [ ] Prompt tuning + heuristic iteration
