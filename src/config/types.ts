export interface SeedConfig {
	keyFileGlobs: string[];
	maxDiffChars: number;
}

export interface ReseedConfig {
	enabled: boolean;
	checkOnSessionStart: boolean;
	checkAfterEveryTurn: boolean;
	maxConcurrentJobs: number;
}

export interface SuggestionConfig {
	noSuggestionToken: string;
	fastPathContinueOnError: boolean;
	maxAssistantTurnChars: number;
}

export interface SteeringConfig {
	historyWindow: number;
	acceptedThreshold: number;
	maxAcceptedExamples: number;
	maxChangedExamples: number;
}

export interface LoggingConfig {
	level: "debug" | "info" | "warn" | "error";
}

export interface AutoprompterConfig {
	seed: SeedConfig;
	reseed: ReseedConfig;
	suggestion: SuggestionConfig;
	steering: SteeringConfig;
	logging: LoggingConfig;
}
