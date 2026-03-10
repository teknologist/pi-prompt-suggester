export type TurnStatus = "success" | "error" | "aborted";

export interface TurnContext {
	turnId: string;
	assistantText: string;
	status: TurnStatus;
	occurredAt: string;
}

export interface PromptSuggestion {
	kind: "suggestion";
	text: string;
}

export interface NoSuggestion {
	kind: "no_suggestion";
	text: "[no suggestion]";
}

export type SuggestionResult = PromptSuggestion | NoSuggestion;
