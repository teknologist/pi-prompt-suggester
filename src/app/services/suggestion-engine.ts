import type { AutoprompterConfig } from "../../config/types.js";
import type { SeedArtifact } from "../../domain/seed.js";
import type { SuggestionResult, TurnContext } from "../../domain/suggestion.js";
import type { SteeringSlice } from "../../domain/steering.js";
import type { ModelClient } from "../ports/model-client.js";
import type { PromptContextBuilder } from "./prompt-context-builder.js";

export interface SuggestionEngineDeps {
	config: AutoprompterConfig;
	modelClient: ModelClient;
	promptContextBuilder: PromptContextBuilder;
}

export class SuggestionEngine {
	public constructor(private readonly deps: SuggestionEngineDeps) {
		void this.deps;
	}

	public async suggest(
		turn: TurnContext,
		seed: SeedArtifact | null,
		steering: SteeringSlice,
	): Promise<SuggestionResult> {
		void turn;
		void seed;
		void steering;
		throw new Error("Not implemented: SuggestionEngine.suggest");
	}
}
