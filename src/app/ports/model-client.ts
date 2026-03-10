import type { SeedArtifact, ReseedTrigger } from "../../domain/seed.js";
import type { TurnContext } from "../../domain/suggestion.js";
import type { SteeringSlice } from "../../domain/steering.js";

export interface ModelClient {
	generateSeed(input: {
		reseedTrigger: ReseedTrigger;
		repositoryContext: string;
		previousSeed: SeedArtifact | null;
	}): Promise<SeedArtifact>;

	generateSuggestion(input: {
		turn: TurnContext;
		seed: SeedArtifact | null;
		steering: SteeringSlice;
	}): Promise<string>;
}
