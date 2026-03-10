import type { SeedArtifact, ReseedTrigger } from "../domain/seed.js";

export interface SeederPromptInput {
	reseedTrigger: ReseedTrigger;
	repositoryContext: string;
	previousSeed: SeedArtifact | null;
}

export function renderSeederPrompt(_input: SeederPromptInput): string {
	throw new Error("Not implemented: renderSeederPrompt");
}
