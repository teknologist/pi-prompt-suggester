import type { RuntimeState } from "../../domain/state.js";

export interface StateStore {
	load(): Promise<RuntimeState>;
	save(state: RuntimeState): Promise<void>;
}
