# Roadmap

## Phase 0: Foundation
- [x] Repo scaffold
- [x] Vision and architecture docs
- [ ] Define `seed.json` schema
- [ ] Define `state.json` schema (suggestion + steering + reseed state)

## Phase 1: Async Seeding MVP
- [ ] Background seeding runner (non-blocking)
- [ ] Repo signal discovery for seeding
- [ ] Persist seed with key-file hashes + source commit
- [ ] Staleness check on `session_start`
- [ ] `/autoprompter reseed` command (async)

## Phase 2: Turn-time Suggestion MVP
- [ ] Hook `agent_end` turn processing
- [ ] Deterministic fast-path: error/aborted -> `continue`
- [ ] Prompt-generator meta prompt runner (plain text output)
- [ ] Handle `[no suggestion]`
- [ ] Prefill editor via `ctx.ui.setEditorText`

## Phase 3: Continuous Reseeding + Steering
- [ ] Run staleness checker after every agent turn
- [ ] Trigger async reseed with reason + changed files (+ optional git diff summary)
- [ ] Capture suggestion vs actual user prompt
- [ ] Classify `accepted_exact | accepted_edited | changed_course`
- [ ] Feed recent accepted/changed examples into prompt generation

## Phase 4: Tuning Loop
- [ ] Local replay harness
- [ ] Inspect rejected-example patterns
- [ ] Tune context windows and thresholds
- [ ] Iterate prompt wording and context formatting

## Phase 5: UX Quality
- [ ] Ghost suggestion rendering in custom editor
- [ ] Tab accept behavior
- [ ] Minimal visual indicators and controls
