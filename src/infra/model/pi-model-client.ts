import type { ModelClient } from "../../app/ports/model-client.js";
import type { SeedArtifact } from "../../domain/seed.js";

/**
 * TODO: hook into pi model/runtime APIs.
 */
export class PiModelClient implements ModelClient {
	public async generateSeed(_input: {
		reseedTrigger: import("../../domain/seed.js").ReseedTrigger;
		repositoryContext: string;
		previousSeed: SeedArtifact | null;
	}): Promise<SeedArtifact> {
		throw new Error("Not implemented: PiModelClient.generateSeed");
	}

	public async generateSuggestion(_input: {
		turn: import("../../domain/suggestion.js").TurnContext;
		seed: SeedArtifact | null;
		steering: import("../../domain/steering.js").SteeringSlice;
	}): Promise<string> {
		throw new Error("Not implemented: PiModelClient.generateSuggestion");
	}
}
