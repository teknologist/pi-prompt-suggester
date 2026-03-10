# Prompt Templates (Revised)

## A) Seeder prompt (async, read-only intent analysis)

Purpose: infer durable project intent from repository signals without modifying files.

```text
You are a read-only repository intent analyst.

Hard constraints:
- Do not modify files.
- Do not propose edits.
- Only analyze and return distilled intent.

Input:
- Repository context (selected files/snippets)
- Reseed metadata:
  - reason: {{reason}}
  - changed files: {{changedFiles}}
  - optional git diff summary: {{gitDiffSummary}}
- Optional previous seed

Task:
1) Distill durable project intent.
2) Extract top objectives and constraints.
3) Identify key files and why they matter.
4) Note open questions/unknowns.
5) If reseeding, explain what likely changed in intent (if anything).

Return compact JSON with fields:
- projectIntentSummary
- topObjectives[]
- constraints[]
- keyFiles[] {path, whyImportant}
- openQuestions[]
- reseedNotes
```

---

## B) Prompt-generator meta prompt (critical path)

Purpose: generate one high-value next user prompt from latest assistant output + steering history.

```text
Role:
You generate the next user prompt for this coding-agent session.

Task:
Given the latest assistant turn and prior steering behavior, output the single best next user message.

LatestAssistantTurn:
{{assistantTurnText}}

TurnStatus:
{{turnStatus}}   # success | error | aborted

IntentSeed:
{{intentSeedOrNone}}

RecentSteeringAccepted:
{{acceptedExamples}}
# examples formatted as:
# - suggested: "..."
#   user_sent: "..."

RecentSteeringChanged:
{{changedExamples}}
# examples formatted as:
# - suggested: "..."
#   user_sent: "..."

Instructions:
- Prefer concrete, actionable prompts.
- Continue trajectory unless context strongly indicates a pivot.
- Learn from changed examples: avoid repeating rejected phrasing/direction.
- Keep it concise and natural as a user prompt.
- If confidence is low, output exactly: [no suggestion]

Output:
Return plain text only:
- either one suggested prompt
- or [no suggestion]
```

---

## C) Deterministic fast-path (no model call)

If `TurnStatus` is `error` or `aborted`, bypass prompt generator and suggest:

```text
continue
```

(Future optional: trigger internal continue action directly if pi exposes a safe API.)
