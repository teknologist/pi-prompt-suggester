import type { Logger } from "../ports/logger.js";
import type { SeedStore } from "../ports/seed-store.js";
import type { StateStore } from "../ports/state-store.js";
import type { StalenessChecker } from "../services/staleness-checker.js";
import type { ReseedRunner } from "./reseed-runner.js";

export interface SessionStartOrchestratorDeps {
	seedStore: SeedStore;
	stateStore: StateStore;
	stalenessChecker: StalenessChecker;
	reseedRunner: ReseedRunner;
	logger: Logger;
}

export class SessionStartOrchestrator {
	public constructor(private readonly deps: SessionStartOrchestratorDeps) {
		void this.deps;
	}

	public async handle(): Promise<void> {
		throw new Error("Not implemented: SessionStartOrchestrator.handle");
	}
}
