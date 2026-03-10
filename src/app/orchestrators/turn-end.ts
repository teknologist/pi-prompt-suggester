import type { TurnContext } from "../../domain/suggestion.js";
import type { Logger } from "../ports/logger.js";
import type { SeedStore } from "../ports/seed-store.js";
import type { StateStore } from "../ports/state-store.js";
import type { SuggestionEngine } from "../services/suggestion-engine.js";
import type { StalenessChecker } from "../services/staleness-checker.js";
import type { ReseedRunner } from "./reseed-runner.js";

export interface SuggestionSink {
	showSuggestion(text: string): Promise<void>;
}

export interface TurnEndOrchestratorDeps {
	seedStore: SeedStore;
	stateStore: StateStore;
	stalenessChecker: StalenessChecker;
	reseedRunner: ReseedRunner;
	suggestionEngine: SuggestionEngine;
	suggestionSink: SuggestionSink;
	logger: Logger;
}

export class TurnEndOrchestrator {
	public constructor(private readonly deps: TurnEndOrchestratorDeps) {
		void this.deps;
	}

	public async handle(_turn: TurnContext): Promise<void> {
		throw new Error("Not implemented: TurnEndOrchestrator.handle");
	}
}
