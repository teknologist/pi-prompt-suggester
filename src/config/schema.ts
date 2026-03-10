import type { AutoprompterConfig } from "./types.js";

export const DEFAULT_CONFIG: AutoprompterConfig = {
	seed: {
		keyFileGlobs: ["README.md", "vision.md", "docs/**/*.md", "src/index.ts"],
		maxDiffChars: 3000,
	},
	reseed: {
		enabled: true,
		checkOnSessionStart: true,
		checkAfterEveryTurn: true,
		maxConcurrentJobs: 1,
	},
	suggestion: {
		noSuggestionToken: "[no suggestion]",
		fastPathContinueOnError: true,
		maxAssistantTurnChars: 4000,
	},
	steering: {
		historyWindow: 20,
		acceptedThreshold: 0.82,
		maxAcceptedExamples: 4,
		maxChangedExamples: 6,
	},
	logging: {
		level: "info",
	},
};

/**
 * TODO: Replace with runtime schema validation (e.g. zod) once implementation starts.
 */
export function validateConfig(config: unknown): config is AutoprompterConfig {
	void config;
	return true;
}
