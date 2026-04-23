# Plan: interactive rebase `main` onto `upstream/main`

## Goal

Rebase `~/Dev/pi-prompt-suggester` local fork commits onto latest `upstream/main`, keep upstream as the new base, replay only the local deltas that still matter, and drop/split anything now superseded upstream.

## Current divergence

- branch: `main`
- local/origin head: `3771dd0e129a2e720a33f9752de2dde4aa78db8a`
- upstream head: `aa942e37ee2286c5632a42a4a030ca46d514325f`
- delta: local is `4 ahead / 18 behind`

Local-only commits, oldest → newest:

1. `7ff43cc` — `Fix model selector overflow with scrollable searchable UI`
2. `f668dd4` — `Fix: Handle thinking blocks in model response`
3. `69f9898` — `fix(pi): align pi deps and prevent ghost editor suggestion crash`
4. `3771dd0` — `fix(model): support model auth headers in PiModelClient`

## Preconditions

- Worktree must be clean.
- Run from `~/Dev/pi-prompt-suggester`.
- Do **not** implement new behavior during the rebase; only reconcile upstream + existing local deltas.

## One-shot command sequence

```zsh
cd ~/Dev/pi-prompt-suggester
git fetch origin upstream --prune
git status --short --branch
git branch backup/pre-rebase-main-2026-04-23
git tag backup/pre-rebase-main-2026-04-23
git rebase -i upstream/main
```

Use this exact rebase todo, replacing the default list:

```text
drop 7ff43cc Fix model selector overflow with scrollable searchable UI
edit 69f9898 fix(pi): align pi deps and prevent ghost editor suggestion crash
pick 3771dd0 fix(model): support model auth headers in PiModelClient
fixup f668dd4 Fix: Handle thinking blocks in model response
```

## Why this todo is correct

- `7ff43cc` overlaps upstream `ae255bb` and diverges structurally (`model-selector-component.ts` vs upstream `model-selector.ts` path family). Replaying it verbatim will likely create churn with little value.
- `69f9898` touches ghost editor + package manifests and should be **edited/split** against upstream ghost-editor lifecycle fixes, especially `cb8938c`.
- `3771dd0` is the best anchor commit for the local model-client delta.
- `f668dd4` is a small follow-up on the same file and should be folded into the reconciled model-client commit, not kept as a separate replayed commit.

## Commit-by-commit conflict expectations and resolution plan

### 1) `drop 7ff43cc`

#### Expectation

- No conflict during rebase because it is dropped.

#### Why dropped

This commit overlaps upstream `ae255bb`:

- upstream touched:
  - `src/infra/pi/commands/ab-testing.ts`
  - `src/infra/pi/commands/model-selector.ts`
  - `src/infra/pi/commands/model-thinking.ts`
  - `src/infra/pi/commands/settings-ui.ts`
- local touched:
  - `src/infra/pi/commands/ab-testing.ts`
  - `src/infra/pi/commands/model-selector-component.ts`
  - `src/infra/pi/commands/model-thinking.ts`
  - `src/infra/pi/commands/settings-ui.ts`

The file topology diverged. Replaying this commit during rebase is likely to reintroduce a parallel implementation instead of a clean upstream-based one.

#### Post-rebase follow-up

If upstream picker behavior is still insufficient after the rebase, do a fresh compare in a separate follow-up commit. Do **not** resurrect `7ff43cc` during the rebase.

---

### 2) `edit 69f9898`

#### Files touched by local commit

- `package.json`
- `package-lock.json`
- `src/infra/pi/ghost-suggestion-editor.ts`
- `test/infra/pi/ghost-suggestion-editor.test.js`

#### Relevant upstream overlap

- `cb8938c` — `fix(ui): reinstall ghost editor when context changes`
- `529a659` — `fix(ui): uninstall ghost editor after switching modes`
- plus newer upstream `src/index.ts` / ghost-editor lifecycle changes already in `upstream/main`

#### Expected conflict level

- `package.json`: **high**
- `package-lock.json`: **high**
- `src/infra/pi/ghost-suggestion-editor.ts`: **medium**
- `test/infra/pi/ghost-suggestion-editor.test.js`: **low/medium**

#### Exact resolution rules

1. **`package.json`**
   - Keep upstream package versioning/release state.
   - Do **not** downgrade or restore old `0.63.1` pinning blindly.
   - Re-apply only the minimal compatibility changes that are still justified after reading upstream current manifest.
   - Preserve any required explicit `@mariozechner/pi-tui` dependency/peer entry **only if** upstream current manifest still needs it for build/runtime correctness.

2. **`package-lock.json`**
   - Resolve in favor of the manifest you keep.
   - Expect to regenerate lockfile later if needed rather than manually preserving old lock entries.

3. **`src/infra/pi/ghost-suggestion-editor.ts`**
   - Start from upstream current content.
   - Only keep local hunks from `69f9898` that still prevent a real ghost editor regression after upstream lifecycle fixes are present.
   - If the local code no longer addresses a live bug on top of upstream, drop the code hunk.

4. **`test/infra/pi/ghost-suggestion-editor.test.js`**
   - Keep the regression test if it still describes useful behavior.
   - Rewrite assertions if upstream behavior shifted but the user-facing guarantee is still wanted.

#### Required stop actions when rebase pauses here

```zsh
git status
git diff
```

After resolving files, amend the stopped commit so it contains only the surviving local delta:

```zsh
git add package.json package-lock.json src/infra/pi/ghost-suggestion-editor.ts test/infra/pi/ghost-suggestion-editor.test.js
git commit --amend --no-edit
git rebase --continue
```

If, after inspection, none of the `69f9898` code changes are still needed, keep only the meaningful test/manifest delta. If nothing survives, skip the commit entirely:

```zsh
git reset --hard
git rebase --skip
```

---

### 3) `pick 3771dd0`

#### Files touched by local commit

- `src/infra/model/pi-model-client.ts`
- `test/infra/model/pi-model-client.test.js`

#### Relevant upstream overlap already in base

- `03c6692` — `fix(auth): support new model registry auth API`
- `712a169` — `fix(model): support claude-bridge session providers`
- `732288b` — `fix(model): allow empty suggester responses`

#### Expected conflict level

- `src/infra/model/pi-model-client.ts`: **high**
- `test/infra/model/pi-model-client.test.js`: **medium/high**

#### Exact resolution rules

Start from upstream `upstream/main` behavior and preserve these capabilities:

1. **Keep upstream behavior intact**
   - support new model registry auth API
   - support claude-bridge/session-provider paths
   - allow empty suggester responses without crashing

2. **Re-apply local behavior from `3771dd0`**
   - support legacy `getApiKey()` fallback if upstream no longer covers it
   - forward resolved headers/apiKey to the completion call path if upstream does not already do so in the same way
   - keep the injected completer/testing seam if still needed by tests

3. **Do not finish this step until tests describe both upstream and local guarantees**
   - current auth API
   - legacy auth API fallback
   - auth error path

#### Required stop actions if conflict occurs

```zsh
git status
git diff -- src/infra/model/pi-model-client.ts test/infra/model/pi-model-client.test.js
```

Resolve the file manually, then continue:

```zsh
git add src/infra/model/pi-model-client.ts test/infra/model/pi-model-client.test.js
git rebase --continue
```

---

### 4) `fixup f668dd4`

#### Files touched by local commit

- `src/infra/model/pi-model-client.ts`

#### Expected conflict level

- `src/infra/model/pi-model-client.ts`: **medium** if `3771dd0` was already reconciled well

#### Exact resolution rules

Fold this behavior into the reconciled model-client commit:

- when no text blocks are present, fall back to thinking content
- do **not** break upstream empty-response handling from `732288b`
- do **not** regress auth/provider logic resolved in previous step

This commit should disappear into the previous model-client commit because it is a narrow follow-up on the same file.

If the fixup does not apply cleanly, manually port the behavior and continue:

```zsh
git status
git diff -- src/infra/model/pi-model-client.ts
git add src/infra/model/pi-model-client.ts
git rebase --continue
```

## Expected final history shape

After successful rebase, `main` should sit on top of `upstream/main` with at most:

1. one reduced/reconciled ghost-editor compatibility commit (from `69f9898`, if anything survives)
2. one reconciled model-client commit containing both `3771dd0` and `f668dd4` behavior

`7ff43cc` should not be present in rebased history.

## Post-rebase verification

Run these in order:

```zsh
cd ~/Dev/pi-prompt-suggester
npm run typecheck
npm test
```

Then run focused manual inspection on the two high-risk areas:

```zsh
git diff upstream/main..HEAD -- src/infra/pi/ghost-suggestion-editor.ts src/index.ts src/infra/pi/ghost-editor-installation.ts src/infra/model/pi-model-client.ts test/infra/model/pi-model-client.test.js test/infra/pi/ghost-suggestion-editor.test.js
```

## Success criteria

- branch rebased cleanly onto `upstream/main`
- no local model-selector fork commit replayed
- upstream ghost-editor lifecycle fixes remain the base behavior
- local useful model-client compatibility remains present
- tests pass
- remaining delta is small, intentional, and reviewable

## Out of scope

- No fresh `pi-multicodex` work
- No new feature work
- No picker/UI redesign beyond what survives naturally from upstream base
