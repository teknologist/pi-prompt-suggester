import type { StateStore } from "../../app/ports/state-store.js";
import type { RuntimeState } from "../../domain/state.js";

export class JsonStateStore implements StateStore {
	public constructor(private readonly filePath: string) {
		void this.filePath;
	}

	public async load(): Promise<RuntimeState> {
		throw new Error("Not implemented: JsonStateStore.load");
	}

	public async save(_state: RuntimeState): Promise<void> {
		throw new Error("Not implemented: JsonStateStore.save");
	}
}
