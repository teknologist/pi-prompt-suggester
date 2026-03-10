import type { AutoprompterConfig } from "../../config/types.js";
import type { SeedArtifact } from "../../domain/seed.js";
import type { TurnContext } from "../../domain/suggestion.js";
import type { SteeringSlice } from "../../domain/steering.js";

export interface SuggestionPromptContext {
	latestAssistantTurn: string;
	turnStatus: TurnContext["status"];
	intentSeed: SeedArtifact | null;
	recentAccepted: SteeringSlice["recentAccepted"];
	recentChanged: SteeringSlice["recentChanged"];
}

export class PromptContextBuilder {
	public constructor(private readonly config: AutoprompterConfig) {
		void this.config;
	}

	public build(turn: TurnContext, seed: SeedArtifact | null, steering: SteeringSlice): SuggestionPromptContext {
		void turn;
		void seed;
		void steering;
		throw new Error("Not implemented: PromptContextBuilder.build");
	}
}
