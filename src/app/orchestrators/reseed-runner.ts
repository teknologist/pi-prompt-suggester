import type { ReseedTrigger } from "../../domain/seed.js";
import type { AutoprompterConfig } from "../../config/types.js";
import type { Logger } from "../ports/logger.js";
import type { SeedStore } from "../ports/seed-store.js";
import type { ModelClient } from "../ports/model-client.js";
import type { TaskQueue } from "../ports/task-queue.js";

export interface ReseedRunnerDeps {
	config: AutoprompterConfig;
	seedStore: SeedStore;
	modelClient: ModelClient;
	taskQueue: TaskQueue;
	logger: Logger;
}

export class ReseedRunner {
	public constructor(private readonly deps: ReseedRunnerDeps) {
		void this.deps;
	}

	public async trigger(_trigger: ReseedTrigger): Promise<void> {
		throw new Error("Not implemented: ReseedRunner.trigger");
	}
}
