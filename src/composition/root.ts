import type { AutoprompterConfig } from "../config/types.js";
import { FileConfigLoader } from "../config/loader.js";
import { ConsoleLogger } from "../infra/logging/console-logger.js";
import { InMemoryTaskQueue } from "../infra/queue/in-memory-task-queue.js";
import { GitClient } from "../infra/vcs/git-client.js";
import { Sha256FileHash } from "../infra/hashing/sha256-file-hash.js";
import { JsonSeedStore } from "../infra/storage/json-seed-store.js";
import { JsonStateStore } from "../infra/storage/json-state-store.js";
import { PiModelClient } from "../infra/model/pi-model-client.js";
import { SystemClock } from "../infra/clock/system-clock.js";
import { StalenessChecker } from "../app/services/staleness-checker.js";
import { PromptContextBuilder } from "../app/services/prompt-context-builder.js";
import { SuggestionEngine } from "../app/services/suggestion-engine.js";
import { SteeringClassifier } from "../app/services/steering-classifier.js";
import { ReseedRunner } from "../app/orchestrators/reseed-runner.js";
import { SessionStartOrchestrator } from "../app/orchestrators/session-start.js";
import { TurnEndOrchestrator } from "../app/orchestrators/turn-end.js";
import { UserSubmitOrchestrator } from "../app/orchestrators/user-submit.js";

export interface AppComposition {
	config: AutoprompterConfig;
	orchestrators: {
		sessionStart: SessionStartOrchestrator;
		turnEnd: TurnEndOrchestrator;
		userSubmit: UserSubmitOrchestrator;
		reseedRunner: ReseedRunner;
	};
}

/**
 * TODO:
 * - inject real storage paths from extension context
 * - inject concrete suggestion sink from pi UI context
 */
export async function createAppComposition(): Promise<AppComposition> {
	const config = await new FileConfigLoader().load();
	const logger = new ConsoleLogger();
	const taskQueue = new InMemoryTaskQueue();
	const vcs = new GitClient();
	const fileHash = new Sha256FileHash();
	const seedStore = new JsonSeedStore(".pi/autoprompter/seed.json");
	const stateStore = new JsonStateStore(".pi/autoprompter/state.json");
	const modelClient = new PiModelClient();
	const clock = new SystemClock();

	const stalenessChecker = new StalenessChecker({
		config,
		fileHash,
		vcs,
	});

	const promptContextBuilder = new PromptContextBuilder(config);
	const suggestionEngine = new SuggestionEngine({
		config,
		modelClient,
		promptContextBuilder,
	});
	const steeringClassifier = new SteeringClassifier(config);

	const reseedRunner = new ReseedRunner({
		config,
		seedStore,
		modelClient,
		taskQueue,
		logger,
	});

	const sessionStart = new SessionStartOrchestrator({
		seedStore,
		stateStore,
		stalenessChecker,
		reseedRunner,
		logger,
	});

	const turnEnd = new TurnEndOrchestrator({
		seedStore,
		stateStore,
		stalenessChecker,
		reseedRunner,
		suggestionEngine,
		suggestionSink: {
			async showSuggestion(_text: string) {
				throw new Error("Not implemented: suggestion sink wiring");
			},
		},
		logger,
	});

	const userSubmit = new UserSubmitOrchestrator({
		stateStore,
		steeringClassifier,
		clock,
		logger,
	});

	return {
		config,
		orchestrators: {
			sessionStart,
			turnEnd,
			userSubmit,
			reseedRunner,
		},
	};
}
