import type { SeedStore } from "../../app/ports/seed-store.js";
import type { SeedArtifact } from "../../domain/seed.js";

export class JsonSeedStore implements SeedStore {
	public constructor(private readonly filePath: string) {
		void this.filePath;
	}

	public async load(): Promise<SeedArtifact | null> {
		throw new Error("Not implemented: JsonSeedStore.load");
	}

	public async save(_seed: SeedArtifact): Promise<void> {
		throw new Error("Not implemented: JsonSeedStore.save");
	}
}
