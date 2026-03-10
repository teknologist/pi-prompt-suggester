import type { AutoprompterConfig } from "../../config/types.js";
import type { FileHash } from "../ports/file-hash.js";
import type { VcsClient } from "../ports/vcs-client.js";
import type { SeedArtifact, StalenessCheckResult } from "../../domain/seed.js";

export interface StalenessCheckerDeps {
	config: AutoprompterConfig;
	fileHash: FileHash;
	vcs: VcsClient;
}

export class StalenessChecker {
	public constructor(private readonly deps: StalenessCheckerDeps) {
		void this.deps;
	}

	public async check(seed: SeedArtifact | null): Promise<StalenessCheckResult> {
		void seed;
		throw new Error("Not implemented: StalenessChecker.check");
	}
}
