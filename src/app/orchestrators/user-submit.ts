import type { Logger } from "../ports/logger.js";
import type { Clock } from "../ports/clock.js";
import type { StateStore } from "../ports/state-store.js";
import type { SteeringClassifier } from "../services/steering-classifier.js";

export interface UserSubmitContext {
	turnId: string;
	userPrompt: string;
}

export interface UserSubmitOrchestratorDeps {
	stateStore: StateStore;
	steeringClassifier: SteeringClassifier;
	clock: Clock;
	logger: Logger;
}

export class UserSubmitOrchestrator {
	public constructor(private readonly deps: UserSubmitOrchestratorDeps) {
		void this.deps;
	}

	public async handle(_ctx: UserSubmitContext): Promise<void> {
		throw new Error("Not implemented: UserSubmitOrchestrator.handle");
	}
}
