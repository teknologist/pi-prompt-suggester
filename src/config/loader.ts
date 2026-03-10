import type { AutoprompterConfig } from "./types.js";
import { DEFAULT_CONFIG } from "./schema.js";

export interface ConfigLoader {
	load(): Promise<AutoprompterConfig>;
}

/**
 * Scaffold loader.
 *
 * TODO:
 * - layer defaults + project config + user config + env overrides
 * - validate and surface actionable errors
 */
export class FileConfigLoader implements ConfigLoader {
	public async load(): Promise<AutoprompterConfig> {
		return DEFAULT_CONFIG;
	}
}
