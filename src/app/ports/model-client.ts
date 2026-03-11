import type { SeedArtifact, SeedDraft, ReseedTrigger } from "../../domain/seed.js";
import type { SuggestionPromptContext } from "../services/prompt-context-builder.js";

export interface ModelClient {
	generateSeed(input: {
		reseedTrigger: ReseedTrigger;
		previousSeed: SeedArtifact | null;
	}): Promise<SeedDraft>;

	generateSuggestion(context: SuggestionPromptContext): Promise<string>;
}
