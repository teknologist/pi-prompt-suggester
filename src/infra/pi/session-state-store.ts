import type { ExtensionAPI, SessionEntry } from "@mariozechner/pi-coding-agent";
import type { StateStore } from "../../app/ports/state-store.js";
import { CURRENT_RUNTIME_STATE_VERSION, INITIAL_RUNTIME_STATE, type RuntimeState } from "../../domain/state.js";

const STATE_CUSTOM_TYPE = "suggester-state";

interface BranchReadableSessionManager {
	getBranch(): SessionEntry[];
}

function extractState(entries: SessionEntry[]): RuntimeState {
	let latest: RuntimeState | undefined;
	for (const entry of entries) {
		if (entry.type === "custom" && entry.customType === STATE_CUSTOM_TYPE) {
			latest = entry.data as RuntimeState;
		}
	}
	if (!latest) return INITIAL_RUNTIME_STATE;
	const usage = latest.suggestionUsage ?? INITIAL_RUNTIME_STATE.suggestionUsage;
	const rejectionHints = Array.isArray(latest.rejectionHints)
		? latest.rejectionHints
				.map((entry) => ({
					id: String(entry.id ?? "").trim(),
					hint: String(entry.hint ?? "").trim(),
					includeRejectedSuggestionText: Boolean(entry.includeRejectedSuggestionText),
					rejectedSuggestionText:
						typeof entry.rejectedSuggestionText === "string" && entry.rejectedSuggestionText.trim().length > 0
							? entry.rejectedSuggestionText
							: undefined,
					remainingUses: Number(entry.remainingUses ?? 0),
					createdAt: String(entry.createdAt ?? "").trim() || new Date(0).toISOString(),
				}))
				.filter((entry) => entry.id.length > 0 && entry.hint.length > 0 && entry.remainingUses > 0)
		: [];
	return {
		stateVersion: CURRENT_RUNTIME_STATE_VERSION,
		lastSuggestion: latest.lastSuggestion,
		steeringHistory: Array.isArray(latest.steeringHistory) ? latest.steeringHistory : [],
		suggestionUsage: {
			calls: Number(usage.calls ?? 0),
			inputTokens: Number(usage.inputTokens ?? 0),
			outputTokens: Number(usage.outputTokens ?? 0),
			cacheReadTokens: Number(usage.cacheReadTokens ?? 0),
			cacheWriteTokens: Number(usage.cacheWriteTokens ?? 0),
			totalTokens: Number(usage.totalTokens ?? 0),
			costTotal: Number(usage.costTotal ?? 0),
			last: usage.last,
		},
		rejectionHints,
	};
}

export class SessionStateStore implements StateStore {
	public constructor(
		private readonly pi: ExtensionAPI,
		private readonly getSessionManager: () => BranchReadableSessionManager | undefined,
	) {}

	public async load(): Promise<RuntimeState> {
		const sessionManager = this.getSessionManager();
		if (!sessionManager) return INITIAL_RUNTIME_STATE;
		return extractState(sessionManager.getBranch());
	}

	public async save(state: RuntimeState): Promise<void> {
		this.pi.appendEntry<RuntimeState>(STATE_CUSTOM_TYPE, {
			stateVersion: CURRENT_RUNTIME_STATE_VERSION,
			lastSuggestion: state.lastSuggestion,
			steeringHistory: state.steeringHistory,
			suggestionUsage: state.suggestionUsage,
			rejectionHints: state.rejectionHints,
		});
	}
}

export { STATE_CUSTOM_TYPE };
