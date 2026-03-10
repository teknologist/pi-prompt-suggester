import type { TaskQueue } from "../../app/ports/task-queue.js";

/**
 * TODO: implement single-process queue with running/pending semantics.
 */
export class InMemoryTaskQueue implements TaskQueue {
	public async enqueue(_name: string, _task: () => Promise<void>): Promise<void> {
		throw new Error("Not implemented: InMemoryTaskQueue.enqueue");
	}

	public isRunning(_name: string): boolean {
		throw new Error("Not implemented: InMemoryTaskQueue.isRunning");
	}
}
